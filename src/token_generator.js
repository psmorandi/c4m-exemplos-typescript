"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenGenerator = void 0;
var crypto_js_1 = __importDefault(require("crypto-js"));
var TokenGenerator = /** @class */ (function () {
    function TokenGenerator() {
    }
    TokenGenerator.prototype.getBearerToken = function (url, method, consumerKey, consumerSecret) {
        var jsonAuth = {
            consumer_key: consumerKey,
            nonce: Math.random.toString(),
            timestamp: Math.floor((new Date).getTime() / 1000),
            version: '1.0',
            signature: ''
        };
        var input = consumerSecret + consumerKey +
            jsonAuth.nonce + jsonAuth.timestamp + jsonAuth.version + method.toUpperCase() + url.toUpperCase();
        jsonAuth.signature = this.getSha256Hash(consumerSecret, input);
        var token = crypto_js_1.default.enc.Utf8.parse(JSON.stringify(jsonAuth));
        return crypto_js_1.default.enc.Base64.stringify(token);
    };
    TokenGenerator.prototype.getSha256Hash = function (key, input) {
        return crypto_js_1.default.HmacSHA256(input, key).toString(crypto_js_1.default.enc.Base64);
    };
    return TokenGenerator;
}());
exports.TokenGenerator = TokenGenerator;
