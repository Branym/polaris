const handler = require('../../scripts/handler');
const Document = require('./model');
const Product = require('../ecommerce/models/product');
const { Types } = require("mongoose");
const path = require('path');
const fs = require('fs');
const axios = require('axios')
//joining path of directory 
const directoryPath = path.join(__dirname, '../../uploads');



const createDocument = async (req, res) => {

    const document = new Document({
        _id: new Types.ObjectId,
        data: req.body,
        collection_name: req.params.collection_name,
    })

    document.save()
        .then(result => handler.success(res, 201, result, "Document created successfuly.", {}))
        .catch(err => handler.error(res, 400, err, err.code === 11000 ? "Document name must be unique" : err.message))

}


const updateDocument = async (req, res) => {

    var query = {};
    var body = {};

    Object.entries(req.query).map(row => {
        query[`data.${row[0]}`] = row[1];
    })
    Object.entries(req.body).map(row => {
        body[`data.${row[0]}`] = row[1];
    })

    console.log(query, body)

    Document.updateMany({ collection_name: req.params.collection_name, ...query }, { $set: body })
        .then(result => handler.success(res, 200, result, "Article updated successfuly.", {}))
        .catch(err => handler.error(res, 400, err, err.code === 11000 ? "Article name must be unique" : err.message))

}

const getDocuments = async (req, res) => {


    var query = {};
    var fields = {};

    Object.entries(req.query).map(row => {
        if (row[0] !== 'page' && row[1] != '') {
            query[`data.${row[0]}`] = row[1];
        }
    })
    Object.entries(req.operation.render.fields).map(row => {
        if (row[1] !== 0) {
            fields[`data.${row[0]}`] = row[1];
        }
    })

    Document.find({ collection_name: req.params.collection_name, ...query }, fields, { sort: { "createdAt": -1 } }).limit(req.operation?.render?.limit).skip(req.operation?.render?.limit * (Number(req.query.page) - 1))
        .then(async result => {
            var response = {
                total: await Document.find({ collection_name: req.params.collection_name, ...query }).countDocuments(),
            }
            response[req.params.collection_name] = result;
            return handler.success(res, 200, response, "Found " + response.total + " results", {})
        }
        )
        .catch(err => handler.error(res, 400, err, err.message))

}

const aggregateDocuments = async (req, res) => {

    Document.aggregate(req.pipeline)
        .then(async result => {
            response = result;
            return handler.success(res, 200, response, "", {})
        }
        )
        .catch(err => handler.error(res, 400, err, err.message))

}

const getDocument = async (req, res) => {


    var query = {};
    var fields = {};

    Object.entries(req.query).map(row => {
        query[`data.${row[0]}`] = row[1];
    })
    Object.entries(req.operation.render.fields).map(row => {
        if (row[1] !== 0) {
            fields[`data.${row[0]}`] = row[1];
        }
    })

    Document.findOne({ collection_name: req.params.collection_name, ...query }, fields)
        .then(async result => {
            return handler.success(res, result ? 200 : 404, result, (result ? "" : "Not ") + "Found.", {})
        }
        )
        .catch(err => handler.error(res, 400, err, err.message))

}

const deleteDocument = async (req, res) => {


    var query = {};

    Object.entries(req.query).map(row => {
        query[`data.${row[0]}`] = row[1];
    })

    Document.deleteMany({ collection_name: req.params.collection_name, ...query })
        .then(async result => {
            return handler.success(res, 200, result, "Deleted Successfully.", {})
        }
        )
        .catch(err => handler.error(res, 400, err, err.message))

}

const sendMail = async (req, res) => {

    const {api_key} = req.email

    // var payload = JSON.stringify({
    //     "from": {
    //         "email": from
    //     },
    //     "personalizations": [
    //         {
    //             "to": [
    //                 {
    //                     "email": to
    //                 }
    //             ]
    //         }
    //     ],
    //     subject: subject,
    //     content: [
    //         {
    //         type: 'text/html',
    //         value: content
    //         }
    //     ]
    // });



    var config = {
        method: 'post',
        url: 'https://api.sendgrid.com/v3/mail/send',
        headers: {
            'Authorization': 'Bearer ' + api_key,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(req.body)
    };


    axios(config)
        .then(function (response) {
            console.log("Email Send")
            res.send("Email Sent.")
        })
        .catch(function (error) {
            throw error

            // console.log(error);
        });
}

const uploadMedia = async (req, res) => {

}



exports.operations = (req, res) => {

    switch (req.operation.type) {
        case "CREATE":
            createDocument(req, res);
            break;
        case "UPDATE":
            updateDocument(req, res);
            break;
        case "READ":
            getDocuments(req, res);
            break;
        case "QUERY":
            aggregateDocuments(req, res);
            break;
        case "MAIL":
            sendMail(req, res);
            break;
        case "READ_ONE":
            getDocument(req, res);
            break;
        case "DELETE":
            deleteDocument(req, res);
            break;
    }

}


