const aws = require('aws-sdk');
const s3 = new aws.S3();

const generatePreSignalUrl = (numDocuments, customerId,document)=>{
    return new Promise((resolve, reject)=>{
        try {
            const promiseUrl=[];
            for(let i=0; i<numDocuments; i++){
                const uniqueKey = `${customerId}-${Date.now()}-${document[i]}`;
                const params = {
                    Bucket: 'makemyvisa-private-assets', 
                    Key: uniqueKey,
                    Expires: 3600, 
                    ContentType: 'application/octet-stream' 
                  };
                  const urlPromise = new Promise((resolveurl, rejecturl) =>{
                    s3.getSignedUrl('putObject', params,(err, res) =>{
                      if(err){
                        rejecturl(err)
                      }else{
                        resolveurl(res);
                      }
                    });
                  });
                  promiseUrl.push(urlPromise);
            }
            const urls =  Promise.all(promiseUrl);
            resolve(urls);
        } catch (error) {
            reject(error);
        }
    })

}
module.exports = generatePreSignalUrl;