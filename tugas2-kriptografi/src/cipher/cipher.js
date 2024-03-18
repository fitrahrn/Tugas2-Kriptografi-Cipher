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