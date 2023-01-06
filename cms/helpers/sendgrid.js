const axios = require('axios')

exports.sendTemplateEmail = (to, data, template_id) => {

    var payload = JSON.stringify({
    "from": {
        "email": "Polaris medifabrics <noreply@polarismedifabrics.com>"
    },
    "personalizations": [
        {
        "to": [
            {
            "email": to
            }
        ],
        "dynamic_template_data": data
        }
    ],
    "template_id": template_id
    });

    var config = {
    method: 'post',
    url: 'https://api.sendgrid.com/v3/mail/send',
    headers: { 
        'Authorization': 'Bearer ' + process.env.SENDGRID_API_KEY, 
        'Content-Type': 'application/json'
    },
    data : payload
    };

    axios(config)
    .then(function (response) {
        console.log("Email Send")
    })
    .catch(function (error) {
    console.log(error);
    });
}

