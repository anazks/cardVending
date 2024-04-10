const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

async function fileUploadToS3(file) {
  return new Promise(async (resolve, reject) => {
    try {
      const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });
      const Key = Date.now() + `_${file.originalname}`;
      const Bucket = process.env.AWS_BUCKET_NAME;
      await s3Client.send(
        new PutObjectCommand({
          Bucket,
          Key,
          Body: file.buffer,
        })
      );
      const fileUrl = `https://${Bucket}.s3.amazonaws.com/${Key}`;
      //   console.log(fileUrl);
      resolve({ fileUrl });
    } catch (error) {
      console.log(error);
      resolve({ error });
    }
  });
}
// const fileUploadToS3 = (file) => {
//   return new Promise((resolve, reject) => {
//     const params = {
//       Bucket: bucketName,
//       Key: `${new Date().now()}_${file.originalname}`,
//       Body: file.buffer,
//       ContentType: file.mimetype,
//     };
//     awsS3.upload(params, (error, data) => {
//       // console.error(error);
//       if (error) {
//         resolve({ error });
//       }
//       // console.log(data);
//       resolve({ fileUrl: data.Location });
//     });
//   });
// };
module.exports = { fileUploadToS3 };
