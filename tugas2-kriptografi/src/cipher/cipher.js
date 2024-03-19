import { generateSubkeys } from "./keyScheduling";

const encryptBlock = (input, key) => {
    var subkeys = generateSubkeys(key);
    const result = new Uint8Array(16);
    for (let i = 0; i < 16; i++) {
        result[i] = input[i] ^ key[i];
    }
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