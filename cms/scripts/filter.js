
const fs = require('fs');



const filterData = (operation_type, collection_name, user_type, stage_name) => new Promise((resolve, reject) => {

    let rawdata = fs.readFileSync('../static/roles.json');
    let _permissions = JSON.parse(rawdata);
    let permissions = _permissions[user_type][collection_name];

    console.log(permissions);
    var errors = []

    if(operation_type && !permissions[operation_type]?.includes(stage_name)){
        errors.push({
            error: `You cannot ${operation_type.split(':')[0]} items in ${collection_name}.`,
            message: `You are unautorized for this operation.`,
            rule_violation: "Invalid Permission",
            stage: stage_name
        })

        return reject(errors)
    }

    if(errors.length) resolve(errors)
    else resolve()

})

const filterStages = (operation_type, collection_name, user_type, stages) => new Promise((resolve, reject) => {

    let rawdata = fs.readFileSync('../static/roles.json');
    let _permissions = JSON.parse(rawdata);
    let permissions = _permissions[user_type][collection_name];

    console.log(permissions);
    var errors = []

    if(stages.length){
        stages.map(stage_name => {
            if(operation_type && !permissions[operation_type]?.includes(stage_name)){
                errors.push({
                    error: `You cannot ${operation_type.split(':')[0]} items in ${collection_name}.`,
                    message: `You are unautorized for this operation.`,
                    rule_violation: "Invalid Permission",
                    stage: stage_name
                })
            }
        })
    }

    if(errors.length) resolve(errors)
    else resolve()

})

module.exports = filterData
module.exports = filterStages

filterData("create", "blogs", "general", "draft").then((err) => {
    console.log(err);
})