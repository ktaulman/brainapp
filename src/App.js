import React from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Logo from './Components/Logo/Logo';
import 'tachyons';

class App extends React.Component{
  render(){
    return (
    <div className="App">
       <Navigation />
       <Logo />
       <ImageLinkForm />
      {/* /* //{<ImageLinkForm />
      <FaceRecogntion />} */ }
    </div>
  )
}
}

export default App;
