import CryptoJS from 'crypto-js';
import { JsonAuthentication } from './json_authentication'

export class TokenGenerator {

    public getBearerToken(url: string, method: string, consumerKey: string, consumerSecret: string) {

        let jsonAuth : JsonAuthentication = { 
            consumer_key: consumerKey,
            nonce: Math.random.toString(),
            timestamp: Math.floor((new Date).getTime() / 1000),
            version: '1.0',
            signature: ''
        }

        let input = consumerSecret + consumerKey + 
                        jsonAuth.nonce + jsonAuth.timestamp + jsonAuth.version + method.toUpperCase() + url.toUpperCase()

        jsonAuth.signature = this.getSha256Hash(consumerSecret, input)

        let token = CryptoJS.enc.Utf8.parse(JSON.stringify(jsonAuth));

        return CryptoJS.enc.Base64.stringify(token);
    }

    private getSha256Hash(key: string, input: string) {
        return CryptoJS.HmacSHA256(input, key).toString(CryptoJS.enc.Base64);
    }
}