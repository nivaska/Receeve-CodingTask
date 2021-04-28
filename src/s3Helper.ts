import Config from "./config.json";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: Config.AWS.S3.AccessKeyId,
  secretAccessKey: Config.AWS.S3.SecretAccessKey,
});

export const UploadS3Data = async (
  fileName: string,
  fileData: string,
  fileType: string
) => {
  try {
    const params = {
      Bucket: Config.AWS.S3.BucketName,
      Key: fileName,
      Body: fileData,
      ContentType: fileType,
    };

    await s3.putObject(params).promise();
  } catch (error) {
    console.log("An error occured when uploading the data to S3");
    throw(error)
  }
};
