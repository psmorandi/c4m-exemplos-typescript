import { TokenGenerator } from "./token_generator";

console.log('Exemplo de geração de token de autenticação.');

let url = 'https://api.cloud4mobile.com.br/devices?status=1';
let method = 'GET';
let consumerKey = '<insira_aqui>';
let consumerSecret = '<insira_aqui>';

let token = new TokenGenerator().getBearerToken(url, method, consumerKey, consumerSecret);

console.log('HTTP header a ser utilizado: ');
console.log('Authentication: Bearer ' + token);
