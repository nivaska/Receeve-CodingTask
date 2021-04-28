"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishToSNS = void 0;
const config_json_1 = __importDefault(require("./config.json"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const sns = new aws_sdk_1.default.SNS();
const PublishToSNS = async (message, subject) => {
    try {
        const params = {
            Message: message,
            Subject: subject,
            TopicArn: config_json_1.default.AWS.SNS.TopicArn,
        };
        await sns.publish(params).promise();
    }
    catch (error) {
        console.log("An error occured when publishing the data to SNS");
        throw error;
    }
};
exports.PublishToSNS = PublishToSNS;
