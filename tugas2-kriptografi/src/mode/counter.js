import { blockFn } from "./cfb";
import {encryptBlock } from "../cipher/cipher";

const encryptCounter = (plaintext, key, blockSize = 64) => {
    let counter = String.fromCharCode(0);
    if (typeof plaintext === 'object') {
        let text = "";
        for (let i = 0; i < plaintext.length; i++) {
            text += String.fromCharCode(plaintext[i]);
        }
        plaintext = text;
    }

    let nChar = blockSize / 8;
    key = key.substr(0, nChar).padEnd(nChar, String.fromCharCode(0));

    let ciphertext = "";
    for (let i = 0; i < plaintext.length; i++) {
        let encryptRes = blockFn(counter, key, encryptBlock);
        ciphertext += String.fromCharCode(encryptRes.charCodeAt(0) ^ plaintext.charCodeAt(i));
        counter = String.fromCharCode(counter.charCodeAt(0) + 1);
    }
    return ciphertext;
}

const decryptCounter = (ciphertext, key) => {
    return encryptCounter(ciphertext, key);
}

export {encryptCounter, decryptCounter};