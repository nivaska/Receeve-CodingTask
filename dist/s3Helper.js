"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadS3Data = void 0;
const config_json_1 = __importDefault(require("./config.json"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: config_json_1.default.AWS.S3.AccessKeyId,
    secretAccessKey: config_json_1.default.AWS.S3.SecretAccessKey,
});
const UploadS3Data = async (fileName, fileData, fileType) => {
    try {
        const params = {
            Bucket: config_json_1.default.AWS.S3.BucketName,
            Key: fileName,
            Body: fileData,
            ContentType: fileType,
        };
        await s3.putObject(params).promise();
    }
    catch (error) {
        console.log("An error occured when uploading the data to S3");
        throw (error);
    }
};
exports.UploadS3Data = UploadS3Data;
