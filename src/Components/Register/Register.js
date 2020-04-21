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

  displayError(elementId,errMessage){
    const display=document.getElementById(elementId);
    const result=document.createElement('p');result.innerHTML=`${errMessage}`

    display.appendChild(result);
    result.setAttribute('id','result')
    const remove=()=>{
      display.removeChild(result);
    }
    setTimeout(()=>remove(),2000)
  }


  onRegisterSubmit(e){
    //prevent mouse click
    e.preventDefault()
    //access properties and set vars
    const {registerName,registerEmail,registerPassword}=this.state
    
    //Body for the POST REQUEST
    let reqBody={
          name:registerName,email:registerEmail,password:registerPassword
        }
      //POST to API 
      fetch(process.env.REACT_APP_API_ADDRESS+'/register',{
        method:"POST",
        body:JSON.stringify(reqBody),
        headers:{"Content-Type":"application/json"}
      })
      .then(res=>{
        //error handle
        if(res.status===400){
          console.log('res.status=',res.status)
          return res.json().then(err=>{
            console.log(err)
            this.displayError('register-parentNode',err)
          })
        }
        console.log(res)
      })
      // .then(user=>{
      //   console.log(user)
      //   if(user){
      //     console.log('user=',user?true:false)
      //   }
      // })
      //   .then(user=>{
         
      //     if(typeof user==='object'){
      //       this.props.loadUser(user);
      //       this.props.onRouteChange('home')
      //     }
      
      // })
      //   .catch(err=>console.log('this is the err',err))
    
  }

  render(){
   
    return(
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
       <main className="pa4 black-80" id='register-parentNode'>
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">

            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                    {"Name"}
                </label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"  autoComplete='current-password'
                  onChange={(e)=>this.onNameChange(e)}
                />
              </div>

              <legend className="f4 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"  autoComplete='current-password'
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
            <div id='registerResult'></div>
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