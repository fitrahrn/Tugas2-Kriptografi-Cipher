import { encrypt,decrypt } from "../cipher/cipher";
import { xorBlocks } from "../tools/tools";

const encryptCBC =  (inputText,cypherKey,iv) =>{
    const blockSize = 128/8
    let result = '';
    let cur_xor = iv; 
    for (let i=0; i<inputText.length;i+=blockSize){
        let block =new Uint8Array(16);
        for (let j=i;j<i+blockSize;j++){
            block[j-i] = inputText[j];
        }
        block = xorBlocks(block,cur_xor);
        cur_xor = encrypt(block,cypherKey)
        result += cur_xor;
    }
    return result;


}
const decryptCBC =  (inputText,cypherKey,iv) =>{
    const blockSize = 128/8
    let result = '';
    let cur_xor = iv; 
    for (let i=0; i<inputText.length;i+=blockSize){
        let block =new Uint8Array(16) ;
        for (let j=i;j<i+blockSize;j++){
            block[j-i] = inputText[j];
        }
        let decrypt_block = decrypt(block,cypherKey);
        result += xorBlocks(decrypt_block,cur_xor);
        cur_xor = block
    }
    return result;


}

export {encryptCBC,decryptCBC};