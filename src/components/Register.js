import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import { handleRegister } from '../api';

const Register = ({ setLoggedIn, setToken, user, setUser, pwd, setPwd, setUserName }) => {

    const history = useHistory();

    const [ pwdConfirm, setPwdConfirm ] = useState('')
    const [ bgColor, setbgColor ] = useState({})
    const [ checkPwd, setCheckPwd ] = useState(true)
    const [ errorMsg, setErrorMsg ] = useState('')
    
    useEffect(() => {
        setbgColor(pwd === pwdConfirm ? {backgroundColor : 'rgba(2,170,2,.3)'} : {backgroundColor : 'rgba(255, 0, 0, .3)'})
        setCheckPwd( ( pwd == pwdConfirm && pwd.length > 7 && user.length > 5 ) ? false : true )
    }, [pwd, pwdConfirm, user])

    const handleCancel = (event) => {
        event.preventDefault();
        document.getElementById('registerForm').reset();
        history.push('/home');
        console.log("Registration cancelled")
    }

    const registerFunction = async (event) => {

        event.preventDefault();
        let response =  await handleRegister(user,pwd);
        // console.log(response);
        response.error ? setErrorMsg(response.error.message ) : setErrorMsg('');
        if (response.success) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token );
            setUserName(user), setUser(''), setPwd(''), setErrorMsg(''), setLoggedIn(true);
            document.getElementById('registerForm').reset();
            history.push('/new_user')
        } 

    }

    

    return (
    <aside className='right-aside'>
        <div className='right-heading'><h2>Register New User</h2></div>
            <div className='right-body'>
                <form id='registerForm' onSubmit={registerFunction} method="Post">
                    <label>
                        Username: <br/>
                        <input type="text" className="username" name="username" placeholder="6 - 20 characters" maxLength={20} onChange={(e)=>{
                            setUser(e.target.value);    
                        }}required={true} autoComplete={'off'}/>
                        </label>
                        <br/>
                    <label> Password:<br/>
                        <input type="password" className="pwd" placeholder='min 8, max 20 characters' name="pwd" maxLength={20} onChange={(e)=>{
                            setPwd(e.target.value);
                        }}required={true} />
                        </label>
                        <br/>
                        <label> Confirm Password:<br/>
                        <input type="password" className="pwd" name="pwd" style={bgColor} onChange={(e)=>{
                            setPwdConfirm(e.target.value);
                        }}required={true} />
                        </label>
                        <br/>
                    <input type="submit" value="Register" className="formSubmit" disabled={checkPwd} />
                    <button className="formCancel" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        <div className='registerMsg'>{errorMsg}</div>
    </aside>
    )

}

export default Register