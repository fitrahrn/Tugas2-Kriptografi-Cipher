import React, {useState, Component} from 'react';
import './App.css';
import { encryptECB,decryptECB } from './mode/ecb';
import { encryptCBC,decryptCBC } from './mode/cbc';
function App() {
  
  const [textType,setType] = useState("text"); //input type
  const [inputText,setInput] = useState(""); //input text
  const [cypherType,setCypher] = useState("ecb"); //set cypher type
  const [cypherKey,setKey] = useState(""); // cipher key
  const [resultText,setResult] = useState(""); //text after encrypted decrypt
  const [encryptTrue,setEncrypt] = useState(true);
  const [fileName, setFileName] = useState("");
  const [isBinaryFile, setIsBinaryFile] = useState(false);
  const [IVKey,setIV] = useState("");
  const getResult = async (event)=>{
    event.preventDefault();
    let result = '';
    if (encryptTrue){
      result = encrypt()
      setResult(result);
    }
    else {
      result = decrypt();
      setResult(result);
    }
    
  }
  const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      setInput(new Uint8Array(e.target.result));
    };
    reader.readAsArrayBuffer(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setIsBinaryFile(true);
    
  }
  const setInputandKey = ()=>{
    let pad_length=0;
    let iv = IVKey;
    let input=inputText;
    let key =cypherKey;
    
    if (input.length % 16 !== 0){
      pad_length = 16 - input.length % 16
      console.log(pad_length)
      if(!isBinaryFile){
        for(let i=0;i<pad_length;i++){
          input = input + '\x00'
        }       
      }
      else {
        let arrayPad = new Uint8Array(pad_length);
        for(let i=0;i<pad_length;i++){
          arrayPad[i] = 0;
        }
        var mergedArray = new Uint8Array(input.length + arrayPad.length);
        mergedArray.set(input);
        mergedArray.set(arrayPad, input.length);
        input = mergedArray;
      }
      console.log(input.length)
    }
    if(!isBinaryFile){
      input = new Uint8Array(input.split("").map(x => x.charCodeAt()));
    }
      
    let pad_key = 0;
    if(key.length <16){
      pad_key = 16-key.length;
      for(let i=0;i<pad_key;i++){
        key = key + '\x00'
      }
    }
    key = new Uint8Array(key.split("").map(x => x.charCodeAt()));
    let pad_iv = 0;
    if(iv.length<16){
      pad_iv = 16-iv.length;
      for(let i=0;i<pad_iv;i++){
        iv = iv + '\x00'
      }
    }
    iv = new Uint8Array(iv.split("").map(x => x.charCodeAt()));
    return [input,key,iv]
    
  }
  const encrypt = ()=>{
    
    let values = setInputandKey();
    let input = values[0]
    let key = values[1]
    let iv = values[2]
    switch (cypherType) {
      case "ecb":
        if(!isBinaryFile){
          return encryptECB(input,key);
        }
        else{
          let result  = (encryptECB(input,key));
          result += fileName;
          result += fileName.length.toString();
          return result;
          
        }
      case "cbc":
        if(!isBinaryFile){
          return encryptCBC(input,key,iv);
        }
        else{
          let result  = (encryptCBC(input,key,iv));
          result += fileName;
          result += fileName.length.toString();
          return result;
        }
      default:
        return inputText;
    }
  }
  const decrypt = ()=>{
    let values = setInputandKey();
    let input = values[0]
    let key = values[1]
    let iv=values[2]
    switch (cypherType) {
      case "ecb":
        if(!isBinaryFile){
          return decryptECB(input,key);
        }
        else{
          if (typeof input !== 'string') {
            var text = '';
            for (var i = 0; i < inputText.length; i++) {
                text += String.fromCharCode(inputText[i]);
            }
            console.log(text)
            input = text;
          }
          
          var lengthInStr = input.match(/\d+$/)[0];
          var length = parseInt(lengthInStr, 10);
          var fileName = input.slice(-lengthInStr.length - length, -lengthInStr.length);
          input = input.slice(0, -lengthInStr.length - length);
          console.log(input)
          input =  new Uint8Array(input.split("").map(x => x.charCodeAt()));
          setFileName(fileName)
          return decryptECB(input,key);
          
        }
    case "cbc":
      if(!isBinaryFile){
        return decryptCBC(input,key,iv);
      }
      else{
        if (typeof input !== 'string') {
          text = '';
          for (i = 0; i < inputText.length; i++) {
              text += String.fromCharCode(inputText[i]);
          }
          console.log(text)
          input = text;
        }
        
        lengthInStr = input.match(/\d+$/)[0];
        length = parseInt(lengthInStr, 10);
        fileName = input.slice(-lengthInStr.length - length, -lengthInStr.length);
        input = input.slice(0, -lengthInStr.length - length);
        input =  new Uint8Array(input.split("").map(x => x.charCodeAt()));
        setFileName(fileName)
        return decryptCBC(input,key,iv);
        
      }
      default:
        return inputText
    }
  }

  return (
    <div className="App">
      <form onSubmit={getResult}>
        <label>Input Type: </label>
        <select onChange={(event) =>setType(event.target.value)}>
          <option value="text">Text</option>
          <option value="file">File</option>
        </select>
        {
          textType ==="text" ? 
        <div>
        <label>Input Text: </label>
        <input type="text" value={inputText} onInput={(event)=>setInput(event.target.value)}/>
        </div> : 
        <div>
          <label>Input File: </label>
          <input type="file" id="uploadFile" name="uploadFile"  onChange={(e) => showFile(e)}/>
        </div>
        }
        
        <label>Cipher Mode Operation: </label>
        <select onChange={(event)=>setCypher(event.target.value)}>
          <option value="ecb">ECB</option>
          <option value="cbc">CBC</option>
          <option value="ofb">OFB</option>
          <option value="cfb">CFB</option>
          <option value="counter">Counter</option>
        </select>
        {
          cypherType!=='ecb'? <div>
            <label>Input IV: </label>
            <input type="text" name = 'IV' value={IVKey} onChange={(event)=>setIV(event.target.value)}/>
          </div>:
          <div></div>
        }
        <label>Input Key: </label>
        <input type="text" name = 'cypherKey' value={cypherKey} onChange={(event)=>setKey(event.target.value)}/>
        <button type="submit"onClick={()=>setEncrypt(true)}>Encrypt</button>
        <button type="submit" onClick={()=>setEncrypt(false)}>Decrypt</button>
      </form>
      <div className="result">
      <label>Result Text</label>
        <p value={resultText}>{resultText}</p>
        <button onClick={() => {
            const buffer = Uint8Array.from(resultText, c => c.charCodeAt(0));
            const file = new Blob([buffer], { type:"text/plain"});
            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = "result.txt";
            link.click();
        }}>Download As Text File</button>
        <button onClick={() => {
            const buffer = Uint8Array.from(resultText, c => c.charCodeAt(0));
            const file = new Blob([buffer], { type:"text/plain"});
            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = (isBinaryFile && !encryptTrue) ? fileName : "result.dat";
            link.click();
        }}>Download As Binary File</button>
      </div>
    </div>
  );
}

export default App;
