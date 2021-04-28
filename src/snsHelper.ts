import Config from "./config.json";
import AWS from "aws-sdk";

const sns = new AWS.SNS();

export const PublishToSNS = async (message: string, subject: string) => {
  try {
    const params = {
      Message: message,
      Subject: subject,
      TopicArn: Config.AWS.SNS.TopicArn,
    };
    await sns.publish(params).promise();
  } catch (error) {
    console.log("An error occured when publishing the data to SNS");
    throw error;
  }
};
