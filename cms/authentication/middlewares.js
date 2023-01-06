const handler = require('../scripts/handler');
const Account = require('./model')
const jwt = require('jsonwebtoken')


module.exports.isAuthenticated = (req, res, next) => {

        if(req.headers['x-token']){
            jwt.verify(req.headers['x-token'], process.env.AUTH_SECRET, async function(err, decoded) {
                if(err) return handler.error(res, 401, {
                    type: "Unauthorized", 
                    message: "Please Log In to Continue", 
                    name: "TOKEN_INVALID"
                }, "Please Log In to continue")
                const account = await Account.findOne({ _id: decoded._id })
                if (!account) return handler.error(res, 401, {
                    type: "Unauthorized", 
                    message: "Please Log In to Continue", 
                    name: "TOKEN_INVALID"
                }, "Please Log In to continue")
                else{
                    req.account = account;
                    req.user = account;
                    next()
                } 
            });
        } 
        else handler.error(res, 401, {
            type: "Unauthorized", 
            message: "Please Log In to Continue", 
            name: "TOKEN_NOT_FOUND"
        }, "Please Log In to continue")

}

module.exports.isAuthorized = (role) => (req, res, next) => {

    if(req.headers['x-token']){
        jwt.verify(req.headers['x-token'], process.env.AUTH_SECRET, async function(err, decoded) {
            if(err) return handler.error(res, 401, {
                type: "Unauthorized", 
                message: "Please Log In to Continue", 
                name: "TOKEN_INVALID"
            }, "Please Log In to continue")
            const account = await Account.findOne({ _id: decoded._id })
            if (!account) return handler.error(res, 401, {
                type: "Unauthorized", 
                message: "Please Log In to Continue", 
                name: "TOKEN_INVALID"
            }, "Please Log In to continue")
            else{
                if(account.role === role){
                    req.account = account;
                    req.user = account;
                    next()
                }
                else{
                    handler.error(res, 401, {
                        type: "Unauthorized", 
                        message: "Please Log In to Continue", 
                        name: "NOT_ALLOWED"
                    }, "You are not authorized for this operation.")
                }
            } 
        });
    } 
    else handler.error(res, 401, {
        type: "Unauthorized", 
        message: "Please Log In to Continue", 
        name: "TOKEN_NOT_FOUND"
    }, "Please Log In to continue")

}


module.exports.isAuthenticatedCMS = (req, res, next) => {

    if(req?.operation?.user?.must_logged_in){
        if(req.headers['x-token']){
            jwt.verify(req.headers['x-token'], process.env.AUTH_SECRET, async function(err, decoded) {
                if(err) return handler.error(res, 401, {
                    type: "Unauthorized", 
                    message: "Please Log In to Continue", 
                    name: "TOKEN_INVALID"
                }, "Please Log In to continue")
                const account = await Account.findOne({ _id: decoded._id })
                if (!account) return handler.error(res, 401, {
                    type: "Unauthorized", 
                    message: "Please Log In to Continue", 
                    name: "TOKEN_INVALID"
                }, "Please Log In to continue")
                else{
                    req.account = account;
                    req.user = account;
                    next()
                } 
            });
        } 
        else handler.error(res, 401, {
            type: "Unauthorized", 
            message: "Please Log In to Continue", 
            name: "TOKEN_NOT_FOUND"
        }, "Please Log In to continue")
    }
    else{
        next()
    }

}



//IsVerified
module.exports.isVerified = (req, res, next) => {

    if(req.account){
        if(req.account.verified) next()
        else handler.error(res, 400, {
            type: "Email Validation", 
            message: "Please verify your email to continue.", 
            name: "Authentication error"
        }, "Please Log In to continue")
    }
    else handler.error(res, 401, {
        type: "Unauthorized", 
        message: "Please Log In to continue", 
        name: "Authentication error"
    }, "Please Log In to continue")
    
}