"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mailgunHelper_1 = require("./mailgunHelper");
const s3Helper_1 = require("./s3Helper");
const snsHelper_1 = require("./snsHelper");
exports.handler = async (event, context, callback) => {
    const { timestamp, token, signature } = event.signature;
    // Ensure the request origin is from Mailgun by verifying the signature
    const verifyResult = mailgunHelper_1.VerifyMailgunSignature(timestamp, token, signature);
    if (verifyResult) {
        // when mailgun singature verification succeeds
        try {
            // saving the copy of the webhook as a file on S3
            await s3Helper_1.UploadS3Data(`${event.signature.timestamp}.json`, JSON.stringify(event), "application/json");
            // publsihing the webhook data to SNS
            const snsData = {
                Provider: "Mailgun",
                timestamp,
                type: event["event-data"].event,
            };
            await snsHelper_1.PublishToSNS(JSON.stringify(snsData), event.signature.timestamp);
        }
        catch (_a) {
            callback(new Error("Error occured when processing the webhook"));
        }
    }
    else {
        // when mailgun singature verification fails
        callback(new Error("Mailgun verification failed"));
    }
};
