import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useHistory, Redirect } from 'react-router-dom'

import Button from './Button'



const Myposts = ( { myPosts, setSinglePost } ) => {

const [ activePosts, setActivePosts ] = useState([]);
const [ inactivePosts, setInactivePosts ] = useState([])



const history = useHistory();

useEffect(()=>{
    if (myPosts.length) {
    const active = []
    myPosts.map((post)=> {if (post.active) { active.push(post) } } );
    setActivePosts(active);
    const inActive = []
    myPosts.map((post)=> {if (!post.active) { inActive.push(post) } } );
    setInactivePosts(inActive);
    }
},[])

    // redirect handles page refresh that causes a loss of state and error.
    if (!myPosts.length || !myPosts) { return <Redirect to='/'/>}

    return (
        <div className='right-aside'>
            <div className='right-header'>
                <h2 className='right-title'>My Posts</h2>
            </div>
                <div className='right-body'>
                    {myPosts.length 
                    ? <><div id='active-posts'><h3>Active Posts</h3> {activePosts.length ?
                    (activePosts.map((post) => {
                        let { title, _id, description, price, willDeliver, createdAt, updatedAt, location} = post
                        return (
                            <div key={_id} className='mypost'>
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
                    <div className='post-actions'>
                        <div className='post-dates'>
                            <p>Created: {moment(createdAt).format('ddd, MMM Do YYYY, h:mm:ss a')}</p>
                            <p>Updated: {moment(updatedAt).format('ddd, MMM Do YYYY, h:mm:ss a')}</p>
                        </div>
                        <div className='post-buttons'>
                            <span>
                            <Button text='Edit' clickHandler={() => {
                            setSinglePost(post);
                            history.push(`/editpost?${_id}`)
                            }}/>
                            <Button text='Delete'/>
                            </span>
                        </div>
                    </div>
                </div> 
                
                        )
                    }))
                 : <p>You have no active posts at this time. Click Create Post to make a post.</p> } </div>
                <div id='inactive-posts'> <h3>Inactive Posts</h3>
                {inactivePosts.map((post) => {
                    let { title, _id, description, price, willDeliver, createdAt, updatedAt, location} = post
                    return (
                        <div key={_id} className='mypost'>
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
                <div className='post-actions'>
                    <div className='post-dates'>
                        <p>Created: {moment(createdAt).format('ddd, MMM Do YYYY, h:mm:ss a')}</p>
                        <p>Updated: {moment(updatedAt).format('ddd, MMM Do YYYY, h:mm:ss a')}</p>
                    </div>
                    
                </div>
            </div>
            
                    )
                })}
            </div></>
                    :
                    <p>You have no posts at this time. Click Create Post to make a post.</p>  }
                </div>
            
        </div>
    )

}

export default Myposts