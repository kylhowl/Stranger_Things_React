import React from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import Button from './Button'

const Posts = ( { posts, userName, setMessage, loggedIn, setSinglePost } ) => {

const history = useHistory()

return (

<div className="post-board">
    {posts.map((post)=> {

        let { title, _id, description, price, willDeliver, createdAt, updatedAt, location, messages } = post

        return (
            <div key={_id} post_id={_id} className='post'>
                <div className='post-header'>
                    <h1 className='post-title'>{title}</h1>
                    <div className='author'>{post.author.username}</div>
                </div>
                <div className='post-body'>
                    <div className='post-info'>Description: {description}</div>
                    <div className='post-info'>Price: {price}</div>
                    <div className='post-info'>Location: {location}</div>
                    <div className='post-info'>Will Deliver? {willDeliver ? "Yes" : "No" }</div>
                </div>
                { messages.length 
                ? 
                <div className='post-messages'>Messages: {messages.map(({_id, content, fromUser :{ username }})=>{
                    return (
                        <div key={_id} className='post-message'>
                            <div>{username} says: {content}</div>
                        </div>
                        )
                })} </div> 
                : ''}
                <div className='post-actions'>
                    <div className='post-dates'>
                        <p>Created: {moment(createdAt).format('ddd, MMM Do YYYY, h:mm:ss a')}</p>
                        <p>Updated: {moment(updatedAt).format('ddd, MMM Do YYYY, h:mm:ss a')}</p>
                    </div>
                    <div className='post-buttons'>
                        <span>
                        
                        { userName === post.author.username
                         ? 
                         <><Button text='Edit' clickHandler={() => {
                            setSinglePost(post);
                            history.push(`/editpost?${_id}`)
                        }}/><Button text='Delete' clickHandler={() =>{
                            setSinglePost(post);
                            history.push(`/deletepost?${_id}`)
                        }}/></> 
                         :
                         <Button text='Post Message' clickHandler={ () => {
                            if (loggedIn) {
                                setSinglePost(post)
                                history.push(`/message?${_id}`)
                            }  else {setMessage('Please login or register to post messages!')}
                         }}/>}
                        </span>
                    </div>
                </div>
            </div>
        )
    })}
</div>

)

}

// <div className='post-info'></div>

export default Posts