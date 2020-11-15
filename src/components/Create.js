import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { createPost, getPosts } from '../api'

const Create = ({ token, setPosts, posts }) => {

    const history = useHistory();

    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ price , setPrice ] = useState('')
    const [ postLocation, setLocation ] = useState('[On Request]')
    const [ willDeliver , setWillDeliver ] = useState(false)

    const handleCancel = (e) => {
        e.preventDefault();
        document.getElementById('createForm').reset();
        history.push('/home');
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        let authString = 'Bearer ' + token
       
        const postObject = {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authString
            },
            body: JSON.stringify({
                post: {
                    title: title,
                    description: description,
                    price: price,
                    willDeliver: willDeliver,
                    location : postLocation
                }
            })
        }
        

        let response = await createPost(postObject);
        
        // upon successful creation the new post is added to the existing posts updating state. A call is made to update posts from API and state is updated.
        if (response.success) {
            const postCopy = [...posts]
            postCopy.push(response.data.post)
            setPosts(postCopy);
            const newPosts = await getPosts();
            setPosts(newPosts);
            history.push('/home')
        }

    }

    return (
        <aside className='right-aside'>
            <div className='right-header'>
                <h2>Create Post</h2>
                <h3>Tell us a little information.</h3>
            </div>
                <div className='right-body'>
                    <form id='createForm' onSubmit={handleCreate}>
                        <label>
                            <div className='info-header'>Title:</div>
                            <input type='text' onChange={ (e)=>{
                                setTitle(e.target.value)
                                }} required={true} maxLength={75} placeholder='required' size={50}/>
                                <br/>
                           <span className='remainder'>{'(' + (75 - title.length) +') characters remaining'}</span>
                        </label>
                        <br/>
                        <label>
                            <div className='info-header'>Description:</div>
                            <textarea rows="5" cols="50" placeholder='required' required={true} maxLength={425} onChange={ (e) => setDescription(e.target.value)}/>
                            <br/>
                            <span className='remainder'>{'('+ (425-description.length) + ') characters remaining' }</span>
                        </label>
                        <br/>
                        <label>
                            <div className='info-header'>Price:</div>
                            <input type='text' required={true} maxLength={20} placeholder='required' onChange={ (e)=> setPrice(e.target.value)}/>
                        </label>
                        <br/>
                        <label>
                        <div className='info-header'>Location:</div>
                           <input type='text' placeholder='optional, [On Request] is default' size={50} onChange={ (e)=> setLocation(e.target.value)}/> 
                        </label>
                        <br/>
                        <label>
                            <div className='info-header'>Will Deliver:</div>
                            <select onChange={ (e)=> setWillDeliver(e.target.value) } >
                                <option value={false}>False</option>
                                <option value={true}>True</option>
                            </select>
                        </label>
                        <div className='formActions'>
                            <span>
                                <input type='submit'/><button type='button' onClick={handleCancel}>Cancel</button><input type='reset' />
                            </span>
                        </div>
                    </form>
            </div>
        </aside>
    )

}

export default Create