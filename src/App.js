import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import uuid4 from 'uuid4';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';







function App() {


const[text,setText]=useState("");
const [Mtext,setMtext] = useState(" Just upload a file and recieve a translation ! ");


// In case User wants input custom keys 
const [AKey,setAKey]= useState("");
const [ZKey,setZKey]= useState("");


const [audioFile,setFile]=useState("");
const [ufile,setUfile]=useState(null);
const [uploadURL ,setUploadURL]=useState("");
const [id,setId]=useState("");

const [customKeys , setCustomKeys]=useState(false);

var recieved=false;

var key1=" Your Assembly API Key ";
var key2=" Your Azure Translation Key ";

const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: AKey,
    "content-type": "application/json",
    "transfer-encoding": "chunked",
  },
})

var params={
  audio:uploadURL,
}

useEffect(() => {
  if (ufile) {
    assembly
      .post("/upload", ufile)
      .then((res) => setUploadURL(res.data.upload_url))
      .catch((err) => console.error(err))

      console.log(uploadURL)
  }
}, [ufile])

function translateWav() {

  assembly
  .post("/transcript", {
    audio_url: uploadURL,
  })
  .then((res) => {
    setId(res.data.id)
  })
  .catch((err) => console.error(err))


  setMtext("Audio transcription and translation in progress...." );

 // console.log(file)

}

function checkStatus(){

  assembly
  .get("/transcript/"+id)
  .then((res) => {
    setText(res.data.text)
    console.log(res)
  })
  .catch((err) => console.error(err))

  if(text!=""){
    translateText();
  }
  else{
    setMtext("Still processing....")
  }

}




  function handleChangeAudio(e) {

    const f = e.target.files[0];
    const blob = URL.createObjectURL(f);
    console.log(blob)
    setUfile(f)
    setFile(blob) 
    console.log( ufile )
    
    
};

function speakText(){
  const msg = new SpeechSynthesisUtterance()
  msg.lang = 'en-US'
  msg.text = text;
  window.speechSynthesis.speak(msg);

}

function A_APIChange(e){
  setAKey(e.target.value);
  key1=AKey;
  console.log("Key1: "+key1)
}

function Z_APIChange(e){
  setZKey(e.target.value)
  key2=ZKey;
  console.log("Key2: "+key2)
}

function handleAPIForm(){
  setCustomKeys(!customKeys);
}

function translateText(){
  

  
  let endpoint = " https://api.cognitive.microsofttranslator.com/";

  

  axios({
      baseURL: endpoint,
      url: '/translate',
      method: 'post',
      headers: {
          'Ocp-Apim-Subscription-Key': ZKey,
          'Ocp-Apim-Subscription-Region':"westeurope",
          'Content-type': 'application/json',
          'X-ClientTraceId': uuid4().toString()
      },
      params: {
          'api-version': '3.0',
          'from': 'en',
          'to': ['fr']
      },
      data: [{
          'text': text
      }],
      responseType: 'json'
  }).then(function(response){
      setText(response.data[0].translations[0].text)
      console.log(JSON.stringify(response.data[0].translations[0].text, null, 4));
  })

  setMtext("Transcript : ")

}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Audio Translation App</h1>
       

       
       { customKeys &&
      
      <div className='APIForm'>
      <span>
        
      <h5>AssemblyAI API Key / Azure API Key  </h5>

       <input type="text" name="APIinput" onChange={A_APIChange} value={AKey} />

       <input type="text" name="APIinput" onChange={Z_APIChange} value={ZKey} />
       </span>

       <Button onClick={handleAPIForm}>Use Default Keys</Button>


      </div>
        
       }

       {!customKeys &&

<Button onClick={handleAPIForm}>Use Custom Keys</Button>


       }


       <h5>Original Audio</h5>
       <audio controls src={audioFile}></audio>

        <br></br>

        <div className='FormWidth'>
        <FormControl fullWidth  variant="filled">
        <InputLabel id="demo-simple-select-label">Select Desired Language</InputLabel>
     <Select
       labelId="demo-simple-select-label"
       id="demo-simple-select"
       label="Language"
       >
     <MenuItem value="fr">French</MenuItem>
     <MenuItem value="sp">Spanish</MenuItem>
     <MenuItem value="jp">Japanese</MenuItem>
     </Select>
     </FormControl>
     </div>

      <span>
      <Button variant="contained" onClick={translateWav}> Translate </Button>
      <Button variant="contained" onClick={checkStatus }>Check Status</Button>
      <Button variant="contained" onClick={speakText}   >Play Translated Audio</Button>
      <input type="file" id='image' accept='audio/*' onChange={handleChangeAudio}></input>
      </span>
      <span>
      <h3>{Mtext}</h3>
      <h3>{text}</h3>
      </span>
       
      </header>
    </div>
  );
}

export default App;
