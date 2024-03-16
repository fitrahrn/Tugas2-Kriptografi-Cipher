const encrypt =  (inputText,cypherKey) =>{
    let result = new Uint8Array(16);
    for (let i=0;i<16;i++){
        result[i] = inputText[i] ^ cypherKey[i];
    }
    return result;

}
const decrypt =  (inputText,cypherKey) =>{
    let result = new Uint8Array(16);
    for (let i=0;i<16;i++){
        result[i] = inputText[i] ^ cypherKey[i];
    }
    return result;


}

export {encrypt,decrypt};