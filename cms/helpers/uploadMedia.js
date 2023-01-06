const express = require("express")
const path = require("path")
const fs = require("fs")
const multer = require("multer")
const AWS = require('aws-sdk');
const app = express()
const formidable = require('formidable');

const ID = 'AKIA5VEDROWM5Z2GTCVA';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = 'codbrix-test';


const s3 = new AWS.S3({
    secretAccessKey: SECRET,
    accessKeyId: ID
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        req.filename = file.originalname.split('.')[0] + "-" + Date.now()+"." + file.originalname.split('.')[1]
        cb(null, req.filename)
    }
  })
       
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 5 * 1000 * 1000;
    
exports.upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png|gif/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 
  
// mypic is the name of file attribute
}).single("file"); 


exports.uploadToS3 = (req, res) => {

    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
          res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
          res.end(String(err));
          return;
        }
        console.log(files)
        fs.readFile(files.file.path, {encoding: 'utf-8'}, async function(err,data){
            if (!err) {
                var uploadParams = {Bucket: BUCKET_NAME, Key: '', Body: ''};
                var file = files.file;

                // Configure the file stream and obtain the upload parameters
                var fs = require('fs');
                var fileStream =  fs.createReadStream(file.path);
                    fileStream.on('error', function(err) {
                    console.log('File Error', err);
                });
                uploadParams.Body = fileStream;
                uploadParams.Key = `${Date.now()}` + path.extname(file.name);

                // call S3 to retrieve upload file to specified bucket
                s3.upload(uploadParams, function (err, _data) {
                    console.log(_data)
                    if (err) {
                        return res.send(err)
                    } 
                    return res.send({
                        success: 1,
                        message: "Image Uploaded Successfully!",
                        file: {
                            url: _data.Location
                        }
                    })
                });
            } else {
                console.log(err);
            }
        });
        
    });

    
}