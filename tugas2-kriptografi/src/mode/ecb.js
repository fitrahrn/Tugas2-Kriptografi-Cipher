import { encrypt,decrypt } from "../cipher/cipher";


const encryptECB =  (inputText,cypherKey) =>{
    const blockSize = 128/8
    let result = '';
    for (let i=0; i<inputText.length;i+=blockSize){
        let block =new Uint8Array(16) ;
        for (let j=i;j<i+blockSize;j++){
            block[j-i] = inputText[j];
        }
        
        result += encrypt(block,cypherKey);
    }
    return result;


}
const decryptECB =  (inputText,cypherKey) =>{
    const blockSize = 128/8
    let result = '';
    for (let i=0; i<inputText.length;i+=blockSize){
        let block =new Uint8Array(16) ;
        for (let j=i;j<i+blockSize;j++){
            block[j-i] = inputText[j];
        }
        result += decrypt(block,cypherKey);
    }
    return result;


}

export {encryptECB,decryptECB};