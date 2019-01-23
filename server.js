
//Install express server
const express = require('express');
const path = require('path');
const aws = require('aws-sdk');

const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
    console.warn(process.env.S3_BUCKET)
  }

aws.config.region = 'eu-west-3';
const S3_BUCKET = process.env.S3_BUCKET;


// Serve only the static files form the dist directory
app.use(express.static('./dist/smc-show-case'));


app.get('/sign-s3', (req, res) => {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60
    };
  
    s3.getSignedUrl('getObject', s3Params, (err, data) => {
      if(err){
        console.warn(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
  });

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname,'/dist/smc-show-case/index.html'));
});





// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);