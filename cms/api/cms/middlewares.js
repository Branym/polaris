const handler = require('../../scripts/handler');
const validate = require("../../scripts/validator")
const fs = require('fs');
const Handlebars = require('handlebars');
const Document  = require('./model');

exports.attachOperation = async (req, res, next) => {
    try {
        let rawdata = fs.readFileSync(__dirname + '/../../operations/' + req.params.collection_name + '.json');
        let operations = JSON.parse(rawdata);
        let operation = operations.filter(item => item.name === req.params.operation_name)
        if(!operation.length) return handler.error(res, 404, {
            error: `${req.params.operation_name} does not exist.`,
            message: `Does not exist.`,
            rule_violation: "Operation Name",
        } , "Operation Not Found"); 
        
        req.operation = operation[0]
        next()
    }
    catch(e){
        return handler.error(res, 404, {
            error: `Any collection named ${req.params.collection_name} does not exist.`,
            message: `Does not exist.`,
            rule_violation: "Collection Name",
        } , "Collection Not Found"); 
    }

}


exports.checkUnique = async (req, res, next) => {

    var _or = [];
    var keys = [];
    if(req?.operation?.data_validations){
        req.operation.data_validations.forEach((item) => {
            if(item.unique === true){
                const _query = JSON.parse(`{"data.${item.name}": "${req.body[item.name]}"}`)
                _or.push(_query)
                keys.push(item.name)
            }
        })
    
    }
    if(_or.length > 0){
        var query = {
            "collection_name": req.params.collection_name,
            $or: _or 
        };
    
        var errors = [];
        const documents = await Document.find(query);
        if(documents.length > 0){
            keys.map(key => {
                if(documents.filter(doc => doc.data[key] === req.body[key]).length > 0) errors.push({
                    error: `${key}'s value must be unique.`,
                    message: `Already Exists.`,
                    rule_violation: "Duplicate Values",
                })
            })
            return handler.error(res, 400, errors , `These fields must have unique value: ${keys}`)
        } 
    }
    next()
}


exports.validateData = async (req, res, next) => {

    let validated_data = {}
    try{
        if(req?.operation?.data_validations){
            validated_data = await validate(req.operation.data_validations, req.body);
            req.body = validated_data;
        }
        next()
    }
    catch(e){
        return handler.error(res, 400, e, "Please send valid data in the body.");  
    }
}

exports.validateQuery = async (req, res, next) => {

    let validated_query = {}

    try{
        if(req?.operation?.query_validations){
            validated_query = await validate(req.operation.query_validations, req.query);
            req.query = validated_query;
        }
        next()
    }
    catch(e){
        return handler.error(res, 400, e, "Please send valid query.");  
    }
}

exports.checkRole = async (req, res, next) => {

    if(req?.operation?.user?.must_logged_in === true && !req?.operation?.user?.can_operate?.includes(req.account.role)){
        return handler.error(res, 401, {}, "You are not authorized.");  
    }
    else next();

}

exports.addTotal = async (req, res, next) => {
    const total = await Document.find({collection_name: req.params.collection_name}).countDocuments();
    req.total = total;
    next();
}

exports.addVariablesToData = async (req, res, next) => {

    var variables = {
        data: req.body,
        query: req.query,
        user: req?.operation?.user?.must_logged_in === false ? {} : {
            id: req?.account?._id,
            role: req?.account?.role,
            email: req?.account?.email
        },
        total: req.total,
        date: req.date
    }

    var body = JSON.stringify(req.body);
    var template = Handlebars.compile(body);

    var query = JSON.stringify(req.query);
    var template_query = Handlebars.compile(query);

    if(req.operation.type === "QUERY"){
        var pipeline = JSON.stringify(req.operation.pipeline);
        var template_pipeline = Handlebars.compile(pipeline);
        var compiled_pipeline = template_pipeline(variables)
        req.pipeline = JSON.parse(compiled_pipeline);
    }

    if(req.operation.type === "MAIL"){
        var mail = JSON.stringify(req.operation.mail);
        var template_mail = Handlebars.compile(mail);
        var compiled_mail = template_mail(variables)
        req.email = JSON.parse(compiled_mail);
    }


    Handlebars.registerHelper('hyphenize', function (aString) {
        return aString.toLowerCase().replace(/ /g, '-');
    })

    var compiled_body = template(variables)
    var compiled_query = template_query(variables)
    
    req.body = JSON.parse(compiled_body);
    req.query = JSON.parse(compiled_query);
    next()


}