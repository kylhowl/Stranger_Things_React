import React from 'react';
import { NavLink, Link } from 'react-router-dom'


const Nav = ( { setUserName, setLoggedIn, setToken } ) => {

    const logoutFunc = () => {
        
        setUserName('Guest');
        setLoggedIn(false);
        localStorage.removeItem('token');
        setToken('')
        
    }

    return (

        <footer>
            <NavLink to='/create'  style={{textDecoration: 'none'}} activeStyle={{fontWeight: 'bold', color: 'red', textDecoration: 'none', fontSize: '1.25em', textShadow: "2px 2px blue"}}>Create Post</NavLink>
            <NavLink to='/myposts' style={{textDecoration: 'none'}} activeStyle={{fontWeight: 'bold', color: 'red', textDecoration: 'none', fontSize: '1.25em', textShadow: "2px 2px blue"}}> My Posts</NavLink>
            <NavLink to='/mymessages' style={{textDecoration: 'none'}} activeStyle={{fontWeight: 'bold', color: 'red', textDecoration: 'none', fontSize: '1.25em', textShadow: "2px 2px blue"}}>My Messages</NavLink>
            <Link to='/' style={{textDecoration: 'none'}} >Home</Link>
            <Link style={{textDecoration: 'none'}} onClick={logoutFunc} to='/'>Logout</Link>
        </footer>

    )
}

export default Nav