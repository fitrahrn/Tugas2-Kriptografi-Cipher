const xorBlocks = (block1, block2) => {
    const result = new Uint8Array(16);
    for (let i = 0; i < 16; i++) {
        
        result[i] = block1[i] ^ block2[i];
        // console.log(block1[i])
        // console.log(block2[i])
        // console.log(result[i])
    }
    return result;
};

const byteToStr = (block) => {
    let result = '';
    for (let i = 0; i < block.length; i++) {
        result += String.fromCharCode(block[i]);
    }
    return result;
};

const arrToHexStr= (arr) => {
    let res = "";
    for (let i = 0; i < arr.length; i++) {
        if(arr[i]<16) {
            res += "0";
        }
        res += arr[i].toString(16);
    }
    return res;
};

const differentBit = (arr1, arr2) => {
    let res = 0;
    for (let i = 0; i < arr1.length; i++) {
        res += (arr1[i] ^ arr2[i]).toString(2).split("1").length - 1;
    }
    return res;
};

export {xorBlocks, byteToStr, arrToHexStr, differentBit };