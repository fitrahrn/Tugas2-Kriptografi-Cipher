import { encrypt,decrypt } from "../cipher/cipher";


const encryptECB =  (inputText,cypherKey) =>{
    const blockSize = 128/8
    let result = new Uint8Array(0);
    console.log(inputText.length)
    for (let i=0; i<inputText.length;i+=blockSize){
        let block = inputText.slice(i,i+blockSize);
        result = result + encrypt(block,cypherKey);
    }
    return result;


}
const decryptECB =  (inputText,cypherKey) =>{
    const blockSize = 128/8
    let result = new Uint8Array(0);
    for (let i=0; i<inputText.length;i+=blockSize){
        let block = inputText.slice(i,i+blockSize);
        result = result + decrypt(block,cypherKey);
    }
    return result;


}

export {encryptECB,decryptECB};