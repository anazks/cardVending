const aws = require("aws-sdk");
require("dotenv").config();
// Configure AWS SDK
const awsS3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  ACL: "public-read",
});

const bucketName = process.env.AWS_BUCKET_NAME;
const fileUploadToS3 = (file) => {
  return new Promise((resolve, reject) => {
    const currentDate = new Date();
    const uniqueFileName = `${currentDate.getTime()}_${Math.floor(
      Math.random() * 1000
    )}`;
    const params = {
      Bucket: bucketName,
      Key: `${uniqueFileName}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    awsS3.upload(params, (error, data) => {
      // console.error(error);
      if (error) {
        resolve({ error });
      }
      // console.log(data);
      resolve({ fileUrl: data.Location });
    });
  });
};

module.exports = { fileUploadToS3 };
