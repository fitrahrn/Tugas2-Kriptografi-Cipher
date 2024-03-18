import { encrypt,decrypt } from "../cipher/cipher";


const encryptECB =  (inputText,cypherKey) =>{
    const blockSize = 128/8
    let result = '';
    for (let i=0; i<inputText.length;i+=blockSize){
        let block = inputText.slice(i,i+blockSize);
        result += encrypt(block,cypherKey);
    }
    return result;


}
const decryptECB =  (inputText,cypherKey) =>{
    const blockSize = 128/8
    let result = '';
    console.log(inputText)
    for (let i=0; i<inputText.length;i+=blockSize){
        let block = inputText.slice(i,i+blockSize);
        result += decrypt(block,cypherKey);
    }
    return result;


}

export {encryptECB,decryptECB};