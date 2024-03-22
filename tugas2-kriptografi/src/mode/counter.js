import { encryptFn } from "./cfb";

const encryptCounter = (plaintext, key) => {
    let counter = String.fromCharCode(0);
    let nChar = plaintext.length;
    key = key.substr(0, nChar).padEnd(nChar, String.fromCharCode(0));

    let ciphertext = "";
    for (let i = 0; i < nChar; i++) {
        let encryptRes = encryptFn(counter, key, nChar);
        ciphertext += String.fromCharCode(encryptRes.charCodeAt(0) ^ plaintext.charCodeAt(i));
        counter = String.fromCharCode(counter.charCodeAt(0) + 1);
    }
    return ciphertext;
}

const decryptCounter = (ciphertext, key) => {
    return encryptCounter(ciphertext, key);
}

export {encryptCounter, decryptCounter};