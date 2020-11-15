import React, { useState} from 'react'
import { useHistory } from 'react-router-dom'

import { postMessage, getUser } from '../api'

const Message_form = ({ singlePost, token, setMyPosts, setMyMessages }) => {

    const [ message , setMessage ] = useState('')
    const [ msg, setMsg ] = useState('')

    const history = useHistory();

    const handleMsg = async (event) => {
        event.preventDefault();
        const response = await postMessage( singlePost._id , message , token);
        if (response.success) {
            const response = await getUser(token);
            setMyPosts(response.data.posts);
            setMyMessages(response.data.messages);
            history.push('/home')
        } else {
            setMsg('Message edit did not work, please try again or blame Kyle')
        }


    }

    return (
        <div className='right-aside'>
            <div className='right-header'>
                <h2 className='right-title'>Send Message</h2>
            </div>
            <br/>
            <div className='right-body'>
                <form >
                    <div> {singlePost.title}</div>
                    <br/>
                    <label>
                        <div className='info-header'>Message:</div>
                        <textarea rows="9" cols="50" placeholder='What do you want to say?' required={true} maxLength={450} onChange={ (e) => setMessage(e.target.value)} style={{'resize':'none'}}/>
                        <br/>
                        <span className='remainder'>{'('+ (450-message.length) + ') characters remaining' }</span>
                    </label>
                    <br/>
                    <input type='submit' onClick={handleMsg}/>
                    <input type='reset' />
                </form>
                <br />
                <button onClick={()=> history.goBack()}>Cancel</button>
            </div> 
            <div className='error-message'>
                {msg}
            </div>  
        </div>
    )

}

export default Message_form;