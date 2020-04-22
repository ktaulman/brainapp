import React from 'react';
import axios from 'axios';

class SignIn extends React.Component{
    constructor(props){
      super(props);
      this.state={
        signInEmail:'',
        signInPassword:'',
      }
    }
    
    onEmailChange(e){
      this.setState({signInEmail:e.target.value});
    }

    onPasswordChange(e){
      this.setState({signInPassword:e.target.value});
    }
 
    displayError(parentElementId,errMessage){
        const display=document.getElementById(parentElementId);
        const result=document.createElement('p');result.innerHTML=`${errMessage}`

        display.appendChild(result);
        result.setAttribute('id','result')
        const remove=()=>{
          display.removeChild(result);
        }
        setTimeout(()=>remove(),2000)
      }

    onSubmitSignIn=(userEmail,userPassword)=>{
      //filter empty email and password
      if(!userEmail||!userPassword){
        return this.displayError('sign-in','missing fields')
      }

     //Enter req payload body
      const reqBody ={
          email:userEmail,
          password:userPassword
      };
    
      //make API request, POST
      // fetch(process.env.REACT_APP_API_ADDRESS+"/signin",{
      //   method:"POST",
      //   body:JSON.stringify(reqBody),
      //   headers:{
      //     "Content-Type":"application/json",
      //     'Accept':'application/json',
      
      // }
      // })
      axios.post(process.env.REACT_APP_API_ADDRESS='/signin')
        .then(res=>{
          //error handling
          if(res.status===400){
            return res.json().then(err=>{
            this.displayError('sign-in',err)
            })
          }
          //then parse the json
            return res.json();
        })
        .then(user=>{
          if(typeof user==="object"){
            console.log(user)
            this.props.loadUser(user)
            this.props.onRouteChange('home')
          }
        })
        .catch(err=>{  
          this.displayError('sign-in','unable to make request')
        });
    }
    //CONSTANTS
    handleGuestSignIn(){
      this.props.loadUser({
        name: "guest", 
        email: "guest@email.com", 
        joined: Date.now(), 
        id: 100100100, 
        entries: "0"
      })
      this.props.onRouteChange('home')
    }
    
    //RENDERING
    render(){
    return(
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
       <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                 autoComplete='current-password'
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="email-address"  
                id="email-address"
                onChange={(e)=>this.onEmailChange(e)}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                autoComplete='current-password'
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password"  
                id="password"
                onChange={(e)=>this.onPasswordChange(e)}
                />
              </div>
             
             <div id='sign-in'></div>

            </fieldset>
            <div className="">
              <input 
              autoComplete
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" 
              value="Sign in"
              onClick={()=>this.onSubmitSignIn(
                this.state.signInEmail,this.state.signInPassword
                )}
              // { }    
              />
            </div>
            <div className="lh-copy mt3">
              <p 
                className="f6 pointer link dim black db"
                onClick={()=>this.props.onRouteChange('register')}
                >Register
              </p>  
            </div>

            <div className="lh-copy mt3">
              <p 
                className="f6 pointer link dim black db dark-red"
                onClick={()=>this.handleGuestSignIn()}
                >
                Guest Access
              </p>  
            </div>
          </div>
        </main>
    </article>
    )}
}

export default SignIn;