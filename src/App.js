import React from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Rank from "./Components/Rank/Rank"
import Logo from './Components/Logo/Logo';
import Particles from 'react-particles-js';

import 'tachyons';

//API-KEYS 
const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey: '9a35c439201d4365a8f9583d9c6e9612'
 });

const particlesOptions={
  particles: {
    number:{
      value:90,
      density:{
        enable:true,
        value_area:820,
      }
    }
}
}

class App extends React.Component{
  constructor(){
    super();
    this.state={
        input:'',
        imageUrl:'https://amp.businessinsider.com/images/5b62bbee959f341e2e8b4738-640-427.jpg',
        box:{},
    }
  }

  calculateFaceLocation=(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputImage');
    const width=Number(image.width);
    const height=Number(image.height);
    console.log(image,width,height);
    console.log(clarifaiFace)
  }

  onInputChange=(e)=>{
    console.log(e)
    this.setState({input:e.target.value});
  }

  onButtonSubmit=()=>{ 
    this.setState({imageUrl:this.state.input})
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then(response=>this.calculateFaceLocation(response))
      .catch(err=>console.log(err))
  }
  //
  render(){
    return (
    <div className="App">
        <Particles 
          className="particles"
          params={particlesOptions} 

        />
        <div className="flex justify-between items-center">
          <Logo />
          <Navigation />
        </div>
        <Rank />
      
       <ImageLinkForm 
       onInputChange={this.onInputChange}
       onButtonSubmit={this.onButtonSubmit}  
       />
       <FaceRecognition imageUrl={this.state.imageUrl}/>
   
    </div>
  )
}
}

export default App;
