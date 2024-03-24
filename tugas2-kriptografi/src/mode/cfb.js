import {encryptBlock } from "../cipher/cipher";

const blockFn = (iv, k, fn) => {
    iv = new Uint8Array(iv.split("").map(x => x.charCodeAt(0)));
    k = new Uint8Array(k.split("").map(x => x.charCodeAt(0)));
    return fn(iv, k).map(x => String.fromCharCode(x)).join("");
}

const encryptCFB = (plaintext, iv, key, blockSize = 128, r = 8) => {
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
        iv = iv.substring(r/8) + c;
        ciphertext += c;
    }

    return ciphertext;

}

const decryptCFB = (ciphertext, iv, key, blockSize = 128, r = 8) => {
    let plaintext = "";
    if (typeof ciphertext === 'object') {
        let text = "";
        for (let i = 0; i < ciphertext.length; i++) {
            text += String.fromCharCode(ciphertext[i]);
        }
        ciphertext = text;
    }

    let nChar = blockSize/8;
    iv = iv.substr(0, nChar).padEnd(nChar, String.fromCharCode(0));
    key = key.substr(0, nChar).padEnd(nChar, String.fromCharCode(0));

    for (let i = 0; i < ciphertext.length; i += r/8) {
        let encryptRes = blockFn(iv, key, encryptBlock);
        let msb = encryptRes.substring(0, r/8);

        let p = "";
        for (let j = 0; j < r/8; j++) {
            p += String.fromCharCode(msb.charCodeAt(j) ^ ciphertext.charCodeAt(i + j))
        }
        iv = iv.substring(r/8) + ciphertext.substring(i, i + r/8);
        plaintext += p;
    }

    return plaintext;
}

export {encryptCFB, decryptCFB, blockFn};