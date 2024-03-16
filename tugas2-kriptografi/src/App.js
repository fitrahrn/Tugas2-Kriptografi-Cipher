import React, {useState, Component} from 'react';
import './App.css';
import { encryptECB,decryptECB } from './mode/ecb';
function App() {
  
  const [textType,setType] = useState("text"); //input type
  const [inputText,setInput] = useState(""); //input text
  const [cypherType,setCypher] = useState("ecb"); //set cypher type
  const [cypherKey,setKey] = useState(""); // cipher key
  const [resultText,setResult] = useState(""); //text after encrypted decrypt
  const [encryptTrue,setEncrypt] = useState(true);
  const [encode64,setBase64] = useState("");
  const [fileName, setFileName] = useState("");
  const [isBinaryFile, setIsBinaryFile] = useState(false);

  const getResult = async (event)=>{
    event.preventDefault();
    let result = '';
    if (encryptTrue){
      result = encrypt()
      setResult(result);
      setBase64(btoa(result));
    }
    else {
      result = decrypt();
      setResult(result);
      setBase64(btoa(result));
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
    
    let input=inputText;
    let key =cypherKey;
    if (input.length % 16 !== 0){
      pad_length = 16 - input.length % 16
      for(let i=0;i<pad_length;i++){
        input = input + '\x00'
      }
      
    }
    console.log(input)
    input = new Uint8Array(input.split("").map(x => x.charCodeAt()));
    let pad_key = 0;
    if(key.length <16){
      pad_key = 16-key.length;
      for(let i=0;i<pad_key;i++){
        key = key + '\x00'
      }
    }
    console.log(key)
    key = new Uint8Array(key.split("").map(x => x.charCodeAt()));
    console.log(input)
    console.log(key)
    return [input,key]
  }
  const encrypt = ()=>{
    let values = setInputandKey();
    let input = values[0]
    let key = values[1]
    switch (cypherType) {
      case "ecb":
        return new TextDecoder().decode(encryptECB(input,key));
      default:
        return inputText;
    }
  }
  const decrypt = ()=>{
    let values = setInputandKey();
    let input = values[0]
    let key = values[1]
    switch (cypherType) {
      case "ecb":
        return decryptECB(input,key);
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
      <div className="result">
      <label>Base 64 Result</label>
        <p value={encode64}>{encode64}</p>
        <button onClick={() => {
            const buffer = Uint8Array.from(encode64, c => c.charCodeAt(0));
            const file = new Blob([buffer], { type:"text/plain"});
            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = "result.txt";
            link.click();
        }}>Download As Text File</button>
        <button onClick={() => {
            const buffer = Uint8Array.from(encode64, c => c.charCodeAt(0));
            const file = new Blob([buffer], { type:"text/plain"});
            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = "result.dat";
            link.click();
        }}>Download As Binary File</button>
      </div>
    </div>
  );
}

export default App;
