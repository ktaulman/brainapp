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
const initialUserState ={
    email:'',
    name:'',
    id:'',
    entries:0,
    joined:''
}
const initialImageState='';


class App extends React.Component{
  constructor(){
    super();
    this.state={
        input:'',
        imageUrl:'',
        box:{},
        route:'signin',
        isSignedIn:false,
        user:{
              email:'',
              name:'',
              id:'',
              entries:0,
              joined:''
              }
    }
  }
  //LifeCycles 
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

  onPictureSubmit=()=>{ 
    this.setState({imageUrl:this.state.input})
      fetch(process.env.REACT_APP_API_ADDRESS+'/imageurl',{
        method:'POST',
        headers:{'CONTENT-TYPE':'application/json'},
        body:JSON.stringify({
          input:this.state.input
        })
      })
      .then(res=>res.json())
      .then(response=>{
          if(response){
            fetch(process.env.REACT_APP_API_ADDRESS+'/image',{
              method:"PUT",
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
                id:this.state.user.id
              })
            })
            .then(res=>res.json())
            .then(count=>{ 
              this.setState(Object.assign(this.state.user,{entries:count}))
            })

            .catch(err=>console.log("Error at PUT Fetch",err))
          }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err=>console.log(err))
  }
  onRouteChange=(route)=>{
   if( route==="signout"){
     console.log('signing out')
     this.setState({isSignedIn:!this.state.isSignedIn})
      this.setState({user:initialUserState})
      this.setState({imageURL:initialImageState})
   }
   else if(route==="home"){
      this.setState({isSignedIn:true})
   }
    this.setState({route:route});
  }
  loadUser(data){
    this.setState({
        user:{
          name:data.name,
          id:data.id,
          email:data.email,
          entries:data.entries,
          joined:data.joined,
        }
      })
  }
  onSignIn=()=>{
    
  }
 
  //
  render(){
    const {isSignedIn,imageUrl,route,box}=this.state;
    console.log("rendered",this.state.user,this.state.imageURL);
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
        <Rank name={this.state.user.name} 
        entries={this.state.user.entries}  
        />
        <ImageLinkForm 
          onInputChange={this.onInputChange}
          onPictureSubmit={this.onPictureSubmit}  
        />
        <FaceRecognition 
          imageUrl={imageUrl}
          box={box}  
        />
      </div>
      :
      (
        route==='signin'?
        <SignIn 
          onRouteChange={this.onRouteChange}
          loadUser={(user)=>this.loadUser(user)}
        />
        :
        <Register 
        loadUser={(user)=>this.loadUser(user)}
        onRouteChange={this.onRouteChange}/>
      )
     }
    </div>
  )
}
}

export default App;
