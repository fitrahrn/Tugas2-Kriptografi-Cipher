const encryptFn = (iv, k, nChar, l = 1) => {
    let result = "";
    for (let i = 0; i < nChar; i++) {
        result += String.fromCharCode(((iv.charCodeAt(i) ^ k.charCodeAt(i)) << l) & (2 ** nChar - 1));
    }
    return result;
}

const encryptCFB = (plaintext, iv, key, blockSize = 64, r = 8) => {
    let ciphertext = "";

    let nChar = blockSize/8;
    iv = iv.substr(0, nChar).padEnd(nChar, String.fromCharCode(0));
    key = key.substr(0, nChar).padEnd(nChar, String.fromCharCode(0));

    for (let i = 0; i < plaintext.length; i += r/8) {
        let encryptRes = encryptFn(iv, key, nChar);
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

const decryptCFB = (ciphertext, iv, key, blockSize = 64, r = 8) => {
    let plaintext = "";

    let nChar = blockSize/8;
    iv = iv.substr(0, nChar).padEnd(nChar, String.fromCharCode(0));
    key = key.substr(0, nChar).padEnd(nChar, String.fromCharCode(0));

    for (let i = 0; i < ciphertext.length; i += r/8) {
        let encryptRes = encryptFn(iv, key, nChar);
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

export {encryptCFB, decryptCFB, encryptFn};