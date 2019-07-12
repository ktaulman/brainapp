import React from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from "./Components/Rank/Rank"
import Logo from './Components/Logo/Logo';
import Particles from 'react-particles-js';
import 'tachyons';

const particlesOptions={
  particles: {
    number:{
      value:90,
      density:{
        enable:true,
        value_area:800,
      }
    }
}
}

class App extends React.Component{
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
      
       <ImageLinkForm />
      
    </div>
  )
}
}

export default App;
