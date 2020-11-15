import React from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import moment from 'moment'
import { deletePost, getPosts } from '../api'

const Delete_post = ( { singlePost, token, setPosts } ) => {

    const history = useHistory();

    const { title, _id, description, price, location, willDeliver, createdAt, updatedAt } = singlePost

    const handleDelete = async () => {

        const results = await deletePost( _id , token );
        if (results.success) {
            const newPosts = await getPosts({headers: {
               'Content-Type': 'application/json',
               'Authorization': `BEARER ${token}`
           }}
           );
           setPosts(newPosts);
           history.push('/');
       } else {
           setMsg('Message edit did not work, please try again or blame Kyle.')
       }
    }

    if (!singlePost) {
        return <Redirect to='/'/>
    }

    return (
        <div className='right-aside'>
            <div className='right-header'>
                <h2 className='right-title'>Delete Post?</h2>
            </div>
            <div className='right-body'>
                <div post_id={_id} className='mypost'>
                    <div className='post-header'>
                        <h1 className='post-title'>{title}</h1>
                        <div className='author'>{singlePost.author.username}</div>
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
                <div className='actions'>
                    <button onClick={handleDelete}>Confirm Deletion</button>
                    <button onClick= {()=> history.goBack()}>Cancel</button>
                </div>
            </div>   
        </div>
    )

}

export default Delete_post