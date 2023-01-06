const validate = (fields, data) => new Promise((resolve, reject) => {

    var errors = {}

    fields.forEach(field => {

        const value = data[field.name]

        if(!value && field.required){

            errors[field.name] = {
                error: `"${field.name}" is required`,
                message: `${field.name} is missing.`,
                rule_violation: "Required",
                field: field.name
            }

        }
        else if(field.constant){
            data[field.name] = field.value
        }
        else if(value){
            
            //General Rules

            //options
            if(field.rules && field.rules.options && Array.isArray(field.rules.options)){
                    
                if(!field.rules.options.includes(value)) errors[field.name] =  {
                    error: `"${field.name}" must be in value specified in options.`,
                    message: `${field.name} doest not match any option.`,
                    rule_violation: "Enumeration",
                    field: field.name  
                }

            }


            //Match Type

            //text
            if(field.type === 'text'){
                
                if(typeof value !== "string") errors[field.name] = {
                    error: `"${field.name}" is not in text format`,
                    message: `${field.name} must be text format.`,
                    rule_violation: "Data Type",
                    field: field.name  
                }
                else{
                    
                    var regex;

                    if(field?.rules?.pattern){ 
                        regex = new RegExp(field.rules.pattern[0]) 
                    }
                    
                    //Match rules
                    if(field?.rules && field?.rules?.pattern && !regex.test(value)) errors[field.name] = {
                        error: `${field.name} must be valid.`,
                        message: field.rules.pattern[1],
                        rule_violation: "Pattern",
                        field: field.name
                    }

                    //min_length
                    if(field.rules && field.rules.min_length && value.length < field.rules.min_length) errors[field.name] = {
                        error: `"${field.name}" must be greater then ${field.rules.min_length}`,
                        message: `Minimum letters of ${field.name} must be greater then ${field.rules.min_length}.`,
                        rule_violation: "Minimum Length of String",
                        field: field.name  
                    }

                    //max_length
                    if(field.rules && field.rules.max_length && value.length > field.rules.max_length) errors[field.name] = {
                        error: `"${field.name}" must be less then ${field.rules.max_length}`,
                        message: `Maximum letters of ${field.name} must be less then ${field.rules.max_length}.`,
                        rule_violation: "Maximum Length of String",
                        field: field.name  
                    }

                    

                }

            }

            //email
            else if(field.type === 'email'){

                const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                const isEmail = emailRegex.test(value)

                if(!isEmail) errors[field.name] = {
                    error: `"${field.name}" is not in email format`,
                    message: `${field.name} must be an email.`,
                    rule_violation: "Data Type",
                    field: field.name  
                }

            }

            //boolean
            else if(field.type === 'boolean'){

                if(typeof value !== 'boolean') errors[field.name] = {
                    error: `"${field.name}" is not in boolean format`,
                    message: `${field.name} must be an boolean.`,
                    rule_violation: "Data Type",
                    field: field.name  
                }

            }

            //regex
            else if(field.type === 'search'){


                if(value){

                    if(typeof value !== "string") errors[field.name] = {
                        error: `"${field.name}" is not in text format`,
                        message: `${field.name} must be text format.`,
                        rule_violation: "Data Type",
                        field: field.name  
                    }
                    else{
                        data[field.name] = {
                            $regex: value
                        }

                        if(field?.rules?.options){
                            data[field.name]['$options'] = field?.rules?.options
                        }

                    }

                }

            }

            //html
            else if(field.type === 'html'){

                if(!(typeof value === "string")) errors[field.name] = {
                    error: `"${field.name}" is not in html format`,
                    message: `${field.name} must be in html format.`,
                    rule_violation: "Data Type",
                    field: field.name  
                }

            }


            //url
            else if(field.type === 'url'){

                const urlRegexValue = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$'
                const urlRegex = new RegExp(urlRegexValue, 'i');
                const isURL = value.match(urlRegex)

                if(!isURL) errors[field.name] = {
                    error: `"${field.name}" is not in url format`,
                    message: `${field.name} must be a url.`,
                    rule_violation: "Data Type",
                    field: field.name  
                }

            }

            //text
            else if(field.type === 'number'){
                
                if(typeof Number(value) !== "number") errors[field.name] = {
                    error: `"${field.name}" is not in number format`,
                    message: `${field.name} must be a number.`,
                    rule_violation: "Data Type",
                    field: field.name  
                }
                else{
                    
                    //Match rules

                    //min_length
                    if(field.rules && field.rules.min && value < field.rules.min) errors[field.name] = {
                        error: `"${field.name}" must be greater then ${field.rules.min}`,
                        message: `${field.name} must be greater then ${field.rules.min}.`,
                        rule_violation: "Minimum Value of Number",
                        field: field.name  
                    }

                    //max_length
                    if(field.rules && field.rules.max && value > field.rules.max) errors[field.name] = {
                        error: `"${field.name}" must be less then ${field.rules.max}`,
                        message: `${field.name} must be less then ${field.rules.max}.`,
                        rule_violation: "Maximum Value of Number",
                        field: field.name  
                    }

                    //length
                    if(field.rules && field.rules.length && value === field.rules.length) errors[field.name] = {
                        error: `"${field.name}" must be equal to ${field.rules.max}`,
                        message: `${field.name} must be equal to ${field.rules.max}.`,
                        rule_violation: "Maximum Value of Number",
                        field: field.name  
                    }

                }

            }

            //date
            else if(field.type === 'date'){

                const date = new Date(`${value}`)
                if(isNaN(date.getTime())) errors[field.name] = {
                    error: `"${field.name}" must be in Date Format`,
                    message: `${field.name} must be a date.`,
                    rule_violation: "Data Type",
                    field: field.name  
                }
                else{

                    if(field.rules && field.rules.after && date < field.rules.after) errors[field.name] = {
                        error: `"${field.name}" must be in the range specified`,
                        message: `${field.name} must be after ${new Date(field.rules.after)}`,
                        rule_violation: "Date Range Violation",
                        field: field.name  
                    }

                    else if(field.rules && field.rules.before && date > field.rules.before) errors[field.name] = {
                        error: `"${field.name}" must be in the range specified`,
                        message: `${field.name} must be before ${new Date(field.rules.before)}`,
                        rule_violation: "Date Range Violation",
                        field: field.name  
                    }

                }
            }

            else if(field.type === 'list'){

                if(!Array.isArray(value)) errors[field.name] = {
                    error: `"${field.name}" must be in List Format`,
                    message: `${field.name} must be a list.`,
                    rule_violation: "Data Type",
                    field: field.name  
                }

            }


        }

    });

    
    if(Object.entries(errors).length == 0) {
        resolve(data)
    }
    else {
        reject(errors) 
    }
})

module.exports = validate

const fake_fields = [
    {
        name: "name",
        required: true,
        type: "text",
        rules: {
            min_length: 3,
            max_length: 20,
            options: ["Yuvraj", "Nayab", "Shivali" ]
        }
    },
    {
        name: "email",
        required: true,
        type: "email"
    },
    {
        name: "dob",
        required: true,
        type: "date"
    },
    {
        name: "mobile",
        required: false,
        type: "number",
        rules: {
            min: 1000000000,
            max: 9999999999
        }
    },
]

const fake_data = {
    name: "Yuvraj",
    email: "yuvraj@gmail.co",
    mobile: 9828860154123,
    dob: "Oct 20 2014"
}

const fn = async () => {
    
    const _x = await validate(fake_fields, fake_data);
    console.log(_x)
}

// fn();