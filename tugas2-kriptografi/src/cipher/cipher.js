import { generateSubkeys } from "./keyScheduling";
import { feistelEncrypt, feistelDecrypt } from "./feistel";

const encryptBlock = (input, key) => {
    let subkeys = generateSubkeys(key);
    let result = feistelEncrypt(input, subkeys);
    return result;
};

const decryptBlock = (input, key) => {
    let subkeys = generateSubkeys(key);
    let result = feistelDecrypt(input, subkeys);
    return result;
};

const encrypt =  (inputText,cypherKey) =>{
    let result = '';
    for (let i=0;i<16;i++){
        result = result + String.fromCharCode((inputText[i] ^ cypherKey[i])+70);
    }
    return result;

}
const decrypt =  (inputText,cypherKey) =>{
    let result = '';
    for (let i=0;i<16;i++){
        result = result + String.fromCharCode((inputText[i]-70) ^ cypherKey[i]);
    }
    return result;


}

export {encrypt,decrypt};