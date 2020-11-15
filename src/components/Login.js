import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { handleLogin } from '../api'

const Login = ( { setUserName, setToken, setLoggedIn, user, setUser, pwd, setPwd } ) => {

    const history = useHistory();
    const [ errorMsg, setErrorMsg ] = useState('')

    const handleCancel =  (event) => {
        event.preventDefault();
        document.getElementById('loginForm').reset();
        history.push('/');
        
    }

    const loginFunction = async (event) => {
        event.preventDefault();
        let response =  await handleLogin(user,pwd);
        response.error ? setErrorMsg(response.error.message + "!") : setErrorMsg('');
        if (response.success) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token );
            setUserName(user); setUser(''); setPwd(''); setErrorMsg(''); setLoggedIn(true);
            document.getElementById('loginForm').reset();
            history.push('/')   
        } 
    }

    return (
          
    <aside className='right-aside'>
        <div className='right-header'><h2>Login</h2></div>
        <br/>
            <div className='right-body'>
                <form id='loginForm' onSubmit={loginFunction} method="Post">
                    <label>
                        Username: <br/>
                        <input type="text" className="username" name="username" onChange={(e)=>{
                            setUser(e.target.value);    
                        }} required={true} autoComplete={'off'}/>
                        </label>
                        <br/>
                    <label> Password:<br/>
                        <input type="password" className="pwd" name="pwd" onChange={(e)=>{
                            setPwd(e.target.value);
                        }} required={true} />
                        </label>
                        <br/>
                    <input type="submit" value="Login" id="formSubmit" />
                    <button id="formCancel" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
            <br />
        <div className="loginMsg" style={{color : 'red'}}>{errorMsg}</div>
    </aside> 
    )
    

}

export default Login