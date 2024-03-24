import { blockFn } from "./cfb";
import {encryptBlock } from "../cipher/cipher";
import { byteToStr } from "../tools/tools";

const encryptCounter = (plaintext, key, blockSize = 128) => {
    if (typeof plaintext === 'object') {
        let text = "";
        for (let i = 0; i < plaintext.length; i++) {
            text += String.fromCharCode(plaintext[i]);
        }
        plaintext = text;
    }
    
    let nChar = blockSize / 8;
    key = key.substr(0, nChar).padEnd(nChar, String.fromCharCode(0));
    let counter = [];
    for(let i = 0; i < nChar; i++) {
        counter.push(0);
    }

    let ciphertext = "";
    for (let i = 0; i < plaintext.length; i+=nChar) {
        let encryptRes = blockFn(byteToStr(counter), key, encryptBlock);
        for(let j = 0; j < nChar && i+j<plaintext.length; j++) {
            ciphertext += String.fromCharCode(encryptRes.charCodeAt(j) ^ plaintext.charCodeAt(i+j));
        }
        counter = nextCounter(counter);
    }
    return ciphertext;
}

const nextCounter = (arr) => {
    let res = arr.slice();
    for(let i = res.length - 1; i>=0 ; i--) {
        if(res[i]<255) {
            res[i]++;
            break;
        } else {
            res[i] = 0;
        }
    }
    return res;
}

const decryptCounter = (ciphertext, key) => {
    return encryptCounter(ciphertext, key);
}

export {encryptCounter, decryptCounter};