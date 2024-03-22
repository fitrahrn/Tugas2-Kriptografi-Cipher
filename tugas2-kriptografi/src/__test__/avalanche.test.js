import React from 'react'
import '@testing-library/jest-dom'
import { encryptBlock } from '../cipher/cipher';
import { differentBit } from '../tools/tools';

const rnd = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

test('Avalanche Test change bit in Key', () => {
    let mn = 128;
    let mx = 0;
    let sum = 0;
    for(let tc=0;tc<10000;tc++) {
        let input = [];
        for(let i=0;i<16;i++){
            input.push(rnd(0,255));
        }
        let key = [];
        for(let i=0;i<16;i++){
            key.push(rnd(0,255));
        }
        let keyAvalanche = key.slice(0,16);
        let idxChanged = rnd(0,15);
        let bitChanged = rnd(0,7);
        keyAvalanche[idxChanged] = keyAvalanche[idxChanged] ^ (1 << bitChanged);
        let result = encryptBlock(input, key);
        let resultAvalanche = encryptBlock(input, keyAvalanche);
        let diff = differentBit(result, resultAvalanche);
        mn = Math.min(mn, diff);
        mx = Math.max(mx, diff);
        sum += diff;
    }
    console.log(`Result of Avalanche Test with bit changed in key:`)
    console.log(`Minimum bit different: ${mn}`);
    console.log(`Maximum bit different: ${mx}`);
    console.log(`Average bit different: ${Math.round(sum/100)/100}`);
})

test('Avalanche Test change bit in Input', () => {
    let mn = 128;
    let mx = 0;
    let sum = 0;
    for(let tc=0;tc<10000;tc++) {
        let input = [];
        for(let i=0;i<16;i++){
            input.push(rnd(0,255));
        }
        let key = [];
        for(let i=0;i<16;i++){
            key.push(rnd(0,255));
        }
        let inputAvalanche = input.slice(0,16);
        let idxChanged = rnd(0,15);
        let bitChanged = rnd(0,7);
        inputAvalanche[idxChanged] = inputAvalanche[idxChanged] ^ (1 << bitChanged);
        let result = encryptBlock(input, key);
        let resultAvalanche = encryptBlock(inputAvalanche, key);
        let diff = differentBit(result, resultAvalanche);
        mn = Math.min(mn, diff);
        mx = Math.max(mx, diff);
        sum += diff;
    }
    console.log(`Result of Avalanche Test with bit changed in input:`)
    console.log(`Minimum bit different: ${mn}`);
    console.log(`Maximum bit different: ${mx}`);
    console.log(`Average bit different: ${Math.round(sum/100)/100}`);
})