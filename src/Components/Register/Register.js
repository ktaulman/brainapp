import React from 'react';

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state={
      registerName:'',
      registerEmail:'',
      registerPassword:'',
    }
  }
  onNameChange(e){
   
    this.setState({registerName:e.target.value})
  }

  onEmailChange(e){
  
    this.setState({registerEmail:e.target.value});
  }

  onPasswordChange(e){

    this.setState({registerPassword:e.target.value});
  }

  onRegisterSubmit(e){
    e.preventDefault();
    const {registerName,registerEmail,registerPassword}=this.state
    //Pop up if field is missing in the file. 
     if(registerName.length===0||registerEmail.length===0||registerPassword.length===0){
        if(document.getElementById('popup')) return;
        const returnPopUp=()=>{
          let registerField=document.getElementById("registerField")
          let popup=document.createElement('h2')
          popup.innerHTML="A field is missing"
          popup.setAttribute('id','popup')
          registerField.appendChild(popup)
        }
        const removePopUp=()=>{
          let registerField=document.getElementById("registerField");
          let popup=document.getElementById("popup")
          registerField.removeChild(popup)
        }
        returnPopUp();
        setTimeout(removePopUp,1500)
    }
    //fetch the API Request 
    else{
      let input={name:registerName,email:registerEmail,password:registerPassword}
      fetch('http://localhost:3000/register',{
        
        method:"POST",
        body:JSON.stringify(input),
        headers:{"Content-Type":"application/json"}
      })
        .then(res=>res.json())
        .then(user=>{
          if(user){
            this.props.loadUser(user);
            this.props.onRouteChange('home')
          }else{
            console.log(user)
          }
      })
        .catch(err=>console.log(err))
    }
  }

  render(){
   
    return(
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
       <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">

            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                    {"Name"}
                </label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"
                  onChange={(e)=>this.onNameChange(e)}
                />
              </div>

              <legend className="f4 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"
                  onChange={(e)=>this.onEmailChange(e)}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"
                  onChange={(e)=>this.onPasswordChange(e)}
                />
              </div>
             
            </fieldset>
            <div className="" id="registerField">
              <input 
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" 
              value="Register"
              onClick={(e)=>this.onRegisterSubmit(e)}   
              />
            </div>
           
          </form>
        </main>
    </article>
    )}
}

export default Register;