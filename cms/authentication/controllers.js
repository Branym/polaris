const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Account = require('./model');
const handler = require('../scripts/handler');
const Validator = require('validatorjs');
const jwt = require('jsonwebtoken');
const { sendTemplateEmail } = require('../helpers/sendgrid');

//Sign Up User
exports.signUp = async (req, res) => {

    //Hash Password
    const salt = await bcrypt.genSalt(10)
    var hashPassword = ""

    if (req.body.password) hashPassword = await bcrypt.hash(req.body.password, salt)
    else return handler.error(res, 400, { name: "Password", message: "Password is must." }, "Password is required")

    const newAccount = new Account({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        role: "user",
        password: hashPassword
    })

    newAccount.save()
        .then(account => {
            jwt.sign({_id: account._id, email: account.email, role: account.role, verified: account.verified}, process.env.AUTH_SECRET, (err , token) => {
                console.log(err);
                handler.success(res, 200, {account, token}, "Signed Up Successfully.", {})
            });
        })
        .catch(err => handler.error(res, 400, err.errors, err.code === 11000 ? "Email already exist" : err.message))

}



//Sign In With Email
exports.signIn = async (req, res) => {

    let validation = new Validator(req.body, {
        email: 'required|email',
        password: 'required'
    })

    if (validation.fails()) return handler.error(res, 400, validation.errors, "Please enter valid details.")

    //Check if email is correct
    const account = await Account.findOne({ email: req.body.email })
    if (!account) return handler.error(res, 400, { name: "Email", message: "Email not found" }, "Email Address doesn't exist. Please Sign Up.")

    //Check if it is old password
    const oldPassMatch = account.oldPassword ? await bcrypt.compare(req.body.password, account.oldPassword) : 0
    if (oldPassMatch) return handler.error(res, 400, { name: "Password", message: "Password was changed", date: account.passwordChangedOn}, "Your password was changed a while ago. If this was not you please reset your password.")

    //Check if password is correct
    const passMatch = await bcrypt.compare(req.body.password, account.password)
    if (!passMatch) return handler.error(res, 400, { name: "Password", message: "Password mismatched" }, "Password did not match.")

    if(validation.passes() && account && passMatch){
        //Now create a token for user and return it.
        jwt.sign({_id: account._id, email: account.email, role: account.role, verified: account.verified}, process.env.AUTH_SECRET, (err , token) => {
            console.log(err);
            handler.success(res, 200, {account, token}, "Logged In Successfully.", {})
        });
    }

}


//Send Code
exports.sendCode = async (req, res) => {

    const account = await Account.findOne({ email: req.body.email })
    if (!account) return handler.error(res, 400, { name: "Email", message: "Email not found" }, "Email Address doesn't exist. Please Sign Up.")

    jwt.sign({_id: account._id, email: account.email}, process.env.AUTH_SECRET, (err , token) => {
        
        sendTemplateEmail(req.body.email, {
            web_url: process.env.WEBSITE + '/reset-password?token=' + token
        }, 'd-f210dbc81c2244df855bbd724978b632')
        handler.success(res, 200, {account}, "We have sent a mail to your inbox.", {})
    });

}

//Verify Code and Reset Password
exports.resetPassword = async (req, res) => {

    jwt.verify(req.body.token, process.env.AUTH_SECRET, async (err , decoded) => {
        
        if(err) return handler.error(res, 400, { name: "Token", message: "Token is invalid" }, "Some Error Occured. Please try again.")

          //Hash Password
            const salt = await bcrypt.genSalt(10)
            var hashPassword = ""

            if (req.body.password) hashPassword = await bcrypt.hash(req.body.password, salt)
            else return handler.error(res, 400, { name: "Password", message: "Password is must." }, "Password is required")

            Account.updateOne({email: decoded.email}, {$set: {
                password: hashPassword
            }}).then(result => {
                handler.success(res, 200, {}, "Password Reset Success.", {})
            })
        
    });

}

//Verify Code and Verify Email

//Update Email
exports.updateEmail = async (req, res) => {

    let validation = new Validator(req.body, {
        email: 'required|email',
    })

    if (validation.fails()) return handler.error(res, 400, validation.errors, "Please enter valid email address.")

    //Check if email exist
    const emailExist = await Account.findOne({ email: req.body.email })
    if(emailExist) return handler.error(res, 400, { name: "Email", message: "Email already exists" }, "Email Address already exist. Please enter another email.")

    Account.updateOne({ _id: req.account._id }, {
        $set: {
            email: req.body.email,
            verified: false
        }
    }).then(result => {

        handler.success(res, 200, result, "Email updated successfully. Please logout and login again.", {})

    }).catch(err => {

        handler.error(res, 400, err.errors, err.message)

    })

}

//Update Role and Permissions
exports.updateRole = async (req, res) => {

    let validation = new Validator(req.body, {
        role: 'required'
    })

    if (validation.fails()) return handler.error(res, 400, validation.errors, "Please enter valid details.")

    if(req.account.role !== 'admin') return handler.error(res, 401, {}, "You are unauthorized for this operation.")

    Account.updateOne({ _id: req.account._id }, {
        $set: {
            role: req.body.role
        }
    }).then(result => {

        handler.success(res, 200, result, "Updated role successfully.", {})

    }).catch(err => {

        handler.error(res, 400, err.errors, err.message)

    })

}

//Change Password
exports.updatePassword = async (req, res) => {

    let validation = new Validator(req.body, {
        newPassword: 'required',
        oldPassword: 'required'
    })

    if (validation.fails()) return handler.error(res, 400, validation.errors, "Please enter valid details.")

    //Check if old password is correct
    const passMatch = await bcrypt.compare(req.body.oldPassword, req.account.password)
    if (!passMatch) return handler.error(res, 400, { name: "Password", message: "Password mismatched" }, "Old Password did not match.")

    if(validation.passes() && passMatch){

        //Hass Password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.newPassword, salt)

        Account.updateOne({ _id: req.account._id }, {
            $set: {
                password: hashPassword,
                oldPassword: req.account.password,
                passwordChangedOn: Date.now()
            }
        }).then(result => {
    
            handler.success(res, 200, result, "Updated password successfully.", {})
    
        }).catch(err => {
    
            handler.error(res, 400, err.errors, err.message)
    
        })
    }

}

//Delete User
exports.deleteAccount = (req, res) => {

    Account.deleteOne({_id: req.account._id}).then(result => {

        handler.success(res, 200, result, "Deleted account successfully.", {})

    }).catch(err => {
        handler.error(res, 400, err.errors, err.message)  
    })

}
