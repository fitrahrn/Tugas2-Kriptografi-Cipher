import React, {useState, Component} from 'react';
import './App.css';
import { ecb } from './mode/ecb';
function App() {
  
  const [textType,setType] = useState("text"); //input type
  const [inputText,setInput] = useState(""); //input text
  const [cypherType,setCypher] = useState("vigenereStandard"); //set cypher type
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
      if (cypherType === 'extendedVigenere' || cypherType === 'superEnkripsi') {
        setInput(new Uint8Array(e.target.result));
      } else {
        setInput(e.target.result)
      }
      //console.log(text)
      //alert(text)
    };
    if (cypherType === 'extendedVigenere' || cypherType === 'superEnkripsi') {
      reader.readAsArrayBuffer(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setIsBinaryFile(true);
    } else {
      reader.readAsText(e.target.files[0])
    }
  }
  const encrypt = ()=>{
    console.log(cypherType);
    //to do check if slope or m not an even number or can be divided by 13
    switch (cypherType) {
      case "ecb":
        return ecb(inputText,cypherKey);
      default:
        return inputText;
    }
  }
  const decrypt = ()=>{
    switch (cypherType) {
      case "ecb":
        return ecb(inputText,cypherKey);
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
