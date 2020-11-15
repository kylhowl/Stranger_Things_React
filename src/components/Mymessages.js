import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'

const Mymessages = ( { myMessages, userName } ) => {

    const [ sent , setSent ] = useState([]);
    const [ recieved , setRecieved ] = useState([]);

    useEffect(()=>{
      if (myMessages.length) {
        let sentMsg = [];
        let recMsg = [];
        myMessages.map(( msg )=> (msg.fromUser.username === userName) ? sentMsg.push(msg) : recMsg.push(msg));
        sentMsg.sort((msg)=> msg.post.title);
        recMsg.sort((msg)=> msg.post.title);
        setSent(sentMsg);
        setRecieved(recMsg);
      } 
    }, [])
    


// redirect handles page refresh that causes a loss of state and error.
if (!myMessages.length || !myMessages) {return <Redirect to='/'/>}

return (
    <div className='right-aside'>
        <div className='right-header'>
            <div className='right-title'><h1>My Messages</h1></div>
        </div>
        <div className='right-body'>
            <div className='myMessages'>
                <h3>Recieved Messages</h3>    
            { myMessages.length
            ? 
             recieved.map(({_id , post : {title}, fromUser : {username}, content }) => {
                return (
                    
                    <div className='message' key={_id}>
                        <div className='message-title'>Post: {title}</div>                        
                        <div className='message-body'>
                            <p>Message: {content}</p>
                            <p>From: {username}</p>                        
                        </div>
                    </div>
                )
            })
            
            :
         <p>You have no messages at this time.</p> }
            <h3>Sent Messages</h3>
            { sent.map(({_id , post : {title}, fromUser : {username}, content }) => {
                return (
                    
                    <div className='message' key={_id}>
                        <div className='message-title'>Post: {title}</div>                        
                        <div className='message-body'>
                            <p>Message: {content}</p>
                            <p>From: {username}</p>                        
                        </div>
                    </div>
                )
                }) 
            }
            </div> 
        </div>
        
    </div>
    )
}

export default Mymessages