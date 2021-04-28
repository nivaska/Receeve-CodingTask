import crypto from "crypto";
import Config from "./config.json";

export const VerifyMailgunSignature = (
  timestamp: string,
  token: string,
  signature: string
): boolean => {
  const encodedToken = crypto
    .createHmac("sha256", Config.Mailgun.SigningKey)
    .update(timestamp.concat(token))
    .digest("hex");
  return encodedToken === signature;
};
