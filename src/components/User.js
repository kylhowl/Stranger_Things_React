import React from 'react'
import { Link } from 'react-router-dom'



const User = ( { userName, myMessages, myPosts } ) => {
    
    const logoutFunc = () => {
        
        setUserName('Guest');
        setLoggedIn(false);
        localStorage.removeItem('token');
        setToken('')
        
    }

return (
    <div className='right-aside user'>
        <div className='right-header'>
                <h2 className='right-title'></h2>
                <br/>
                <h2>Hi {userName}</h2>
        </div>
        <br/>
        <div className='right-body'>
            <Link to='/mymessages' style={{textDecoration: 'none'}}>You have {myMessages} messages.</Link>
            <br/>
            <Link to='/myposts' style={{textDecoration: 'none'}}>You have {myPosts} post(s).</Link>
            <br/>
            <Link to='/create' style={{textDecoration: 'none'}} >Create Post</Link> 
            <br/>
            <Link style={{textDecoration: 'none'}} onClick={logoutFunc} to='/'>Logout</Link>
        </div>
    </div>
    )
}

export default User