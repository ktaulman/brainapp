import React from 'react';

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

    onSubmitSignIn=()=>{
      const{signInEmail,signInPassword}=this.state;
      const input ={email:signInEmail,password:signInPassword};
    
      fetch(process.env.REACT_APP_API_ADDRESS+"/signin",{
        method:"POST",
        body:JSON.stringify(input),
        headers:{"Content-Type":"application/json"}
      })
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
          console.log(user)
          
          if(typeof user==="object"){
            this.props.loadUser(user)
            this.props.onRouteChange('home')
          }
        })
        .catch(err=>{  
          console.log(err)
        //   function displayError(){
        //   const display=document.getElementById('sign-in');
        //   const result=document.createElement('p');result.innerHTML=`${err}`

        //   display.appendChild(result);
        //   result.setAttribute('id','result')
        //   const remove=()=>{
        //     display.removeChild(result);
        //   }
        //   setTimeout(()=>remove(),2000)
        // }

        // displayError();
        console.log(err);
        console.log('hit error')
      });
    }

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
              onClick={()=>this.onSubmitSignIn()}
              // { }    
              />
            </div>
            <div className="lh-copy mt3">
              <p 
                className="f6 pointer link dim black db"
                onClick={()=>this.props.onRouteChange('register')}
                >Register</p>
              
            </div>
          </div>
        </main>
    </article>
    )}
}

export default SignIn;