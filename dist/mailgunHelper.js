"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyMailgunSignature = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_json_1 = __importDefault(require("./config.json"));
const VerifyMailgunSignature = (timestamp, token, signature) => {
    const encodedToken = crypto_1.default
        .createHmac("sha256", config_json_1.default.Mailgun.SigningKey)
        .update(timestamp.concat(token))
        .digest("hex");
    return encodedToken === signature;
};
exports.VerifyMailgunSignature = VerifyMailgunSignature;
