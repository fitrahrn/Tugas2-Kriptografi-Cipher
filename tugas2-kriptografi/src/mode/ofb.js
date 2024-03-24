import { blockFn } from "./cfb";
import {encryptBlock } from "../cipher/cipher";

const encryptOFB = (plaintext, iv, key, blockSize = 128, r = 8) => {
    let ciphertext = "";
    if (typeof plaintext === 'object') {
        let text = "";
        for (let i = 0; i < plaintext.length; i++) {
            text += String.fromCharCode(plaintext[i]);
        }
        plaintext = text;
    }

    let nChar = blockSize/8;
    iv = iv.substr(0, nChar).padEnd(nChar, String.fromCharCode(0));
    key = key.substr(0, nChar).padEnd(nChar, String.fromCharCode(0));

    for (let i = 0; i < plaintext.length; i += r/8) {
        let encryptRes = blockFn(iv, key, encryptBlock);
        let msb = encryptRes.substring(0, r/8);

        let c = "";
        for (let j = 0; j < r/8; j++) {
            c += String.fromCharCode(msb.charCodeAt(j) ^ plaintext.charCodeAt(i + j))
        }
        iv = iv.substring(r/8) + msb;
        ciphertext += c;
    }

    return ciphertext;
}

const decryptOFB = (ciphertext, iv, key, blockSize = 128, r = 8) => {
    return encryptOFB(ciphertext, iv, key, blockSize, r);
}

export {encryptOFB, decryptOFB};

