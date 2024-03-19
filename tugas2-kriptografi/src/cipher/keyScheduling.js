const generateSubkeys = (key) => {
    const subkeys = [];
    for (let i = 0; i < 16; i++) {
        subkeys.push(new Uint8Array(16));
    }
    subkeys[0].set(key);
    // for (let i = 1; i < 11; i++) {
    //     subkeys[i].set(subkeys[i - 1]);
    //     rotate(subkeys[i]);
    //     subkeys[i] = subkeys[i].map((byte) => sbox[byte]);
    //     subkeys[i][0] ^= rcon[i - 1];
    // }
    return subkeys;
}

export {generateSubkeys};