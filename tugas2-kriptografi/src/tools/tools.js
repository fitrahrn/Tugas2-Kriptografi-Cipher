const xorBlocks = (block1, block2) => {
    const result = new Uint8Array(16);
    for (let i = 0; i < 16; i++) {
        result[i] = block1[i] ^ block2[i];
    }
    return result;
};

export {xorBlocks};