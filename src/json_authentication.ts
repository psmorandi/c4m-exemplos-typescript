export interface JsonAuthentication {
    consumer_key: string;
    nonce: string;
    signature: string;
    timestamp: number;
    version: string;
}