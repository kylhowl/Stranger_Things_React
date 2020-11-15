import React from 'react'
import { useHistory }  from 'react-router-dom';

const Welcome = ({message}) => {

const history = useHistory()

return (<>
    <section className='right-aside'>
        <div className='right-header'>
            <h2>Welcome to Stranger's Things!</h2>
        </div>
        <br/>
        <div className='right-body'>
            <p>If it's your first time here, please register.</p>
            <br/>
            <button className="register" onClick={ () => history.push('/register')}>Register</button>
            <br/>
            <p>Returning users, please login.</p>
            <br/>
            <button className='logButton' onClick={()=> history.push('/login')}>Login</button>
            <br/>
            <div className='info-message'>
                <p>{message}</p>
            </div>
        </div>
    </section>

</>)

}

export default Welcome