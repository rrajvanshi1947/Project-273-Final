
const express = require("express");
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
const router = express.Router();


/**************Code goes here*******************/
AWS.config.update({

    accessKeyId: "",
    secretAccessKey: ""
  });
  
  // configure AWS to work with promises
  AWS.config.setPromisesDependency(bluebird);
  
  // create S3 instance
  const s3 = new AWS.S3();
  
  // abstracts function to upload a file returning a promise
  const uploadFile = (buffer, name, type) => {
    const params = {
      ACL: "public-read",
      Body: buffer,
      Bucket: "resumeupload1",
      ContentType: type.mime,
      Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
  };
  
  // Define POST route
  router.post("/test-upload", (request, response) => {
    console.log("I am in upload");
    const form = new multiparty.Form();
    form.parse(request, async (error, fields, files) => {
      if (error) throw new Error(error);
      try {
        console.log("try "); 
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const fileName = `bucketFolder/${timestamp}-lg`;
        const data = await uploadFile(buffer, fileName, type);
        return response.status(200).send(data);
      } catch (error) {
        console.log(error);
        return response.status(400).send(error);
      }
    });
  });
  
  module.exports = router;