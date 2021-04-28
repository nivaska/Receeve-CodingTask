import { Context, Callback } from "aws-lambda";
import { VerifyMailgunSignature } from "./mailgunHelper";
import { UploadS3Data } from "./s3Helper";
import { PublishToSNS } from "./snsHelper";

exports.handler = async (event: any, context: Context, callback: Callback) => {
  const { timestamp, token, signature } = event.signature;
  // Ensure the request origin is from Mailgun by verifying the signature
  const verifyResult = VerifyMailgunSignature(timestamp, token, signature);

  if (verifyResult) {
    // when mailgun singature verification succeeds
    try {
      // saving the copy of the webhook as a file on S3
      await UploadS3Data(
        `${event.signature.timestamp}.json`,
        JSON.stringify(event),
        "application/json"
      );

      // publsihing the webhook data to SNS
      const snsData = {
        Provider: "Mailgun",
        timestamp,
        type: event["event-data"].event,
      };
      await PublishToSNS(JSON.stringify(snsData), event.signature.timestamp);
    } catch {
      callback(new Error("Error occured when processing the webhook"));
    }
  } else {
    // when mailgun singature verification fails
    callback(new Error("Mailgun verification failed"));
  }
};
