const aws = require("aws-sdk");
const { response } = require("express");
const s3 = new aws.S3();

const generatePreSignalUrlDownload =async (customerId) => {
    try {
        const params = {
          Bucket: "makemyvisa-private-assets",
          Prefix: customerId,
        };
        const data = await s3.listObjects(params).promise();
        const documents = data.Contents;
    
        const preSignedUrls = await Promise.all(
          documents.map(async (doc) => {
            const downloadParams = {
              Bucket: "makemyvisa-private-assets",
              Key: doc.Key,
              Expires: 3600,
              ResponseContentDisposition: 'attachment;', 
              ResponseContentType: 'application/pdf'
            };
    
            return await new Promise((resolve, reject) => {
              s3.getSignedUrl("getObject", downloadParams, (err, response) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(response);
                }
              });
            });
          })
        );
        return preSignedUrls;

      } catch (error) {
        console.error(error.message);
        reject(new Error(error.message)); 
      }
};

module.exports = generatePreSignalUrlDownload;
