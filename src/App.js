import React from 'react';
import './App.css';
import SignIn from "./Components/SignIn/SignIn"
import Register from './Components/Register/Register'
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
        imageUrl:'',
        box:{},
        route:'signin',
        isSignedIn:false,
    }
  }

  calculateFaceLocation=(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputImage');
    const width=Number(image.width);
    const height=Number(image.height);
 
    return {
        leftCol: clarifaiFace.left_col * width,
        topRow:clarifaiFace.top_row * height,
        rightCol:width-(clarifaiFace.right_col*width),
        bottomRow:height-(clarifaiFace.bottom_row*height)
      }
  }
  //Functions
  displayFaceBox=(box)=>{
    this.setState({box:box});
  }

  onInputChange=(e)=>{
    console.log(e)
    this.setState({input:e.target.value});
  }

  onButtonSubmit=()=>{ 
    this.setState({imageUrl:this.state.input})
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then(response=>this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err=>console.log(err))
  }
  onRouteChange=(route)=>{
   if( route==="signout"){
      this.setState({isSignedIn:false})
   }
   else if(route==="home"){
      this.setState({isSignedIn:true})
   }
    this.setState({route:route});
  }
 
  //
  render(){
    const {isSignedIn,imageUrl,route,box}=this.state
    return ( 
    <div className="App">
        <Particles 
          className="particles"
          params={particlesOptions} 
        />
     
      <Navigation 
        onRouteChange={this.onRouteChange}
        isSignedIn={isSignedIn}
      /> 
     {route==="home"? 
     <div>
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}  
        />
        <FaceRecognition 
          imageUrl={imageUrl}
          box={box}  
        />
      </div>
      :
      (
        route==='signin'?
        <SignIn onRouteChange={this.onRouteChange}/>
        :
        <Register onRouteChange={this.onRouteChange}/>
      )
     }
    </div>
  )
}
}

export default App;
