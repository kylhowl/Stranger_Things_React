import React, { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'

import { editPost, getPosts } from '../api'

const Post_edit = ({ singlePost, token, setPosts}) => {

    const history = useHistory();

    const [ title, setTitle ] = useState(singlePost.title)
    const [ description, setDescription ] = useState(singlePost.description)
    const [ price , setPrice ] = useState(singlePost.price)
    const [ postLocation, setLocation ] = useState(singlePost.location)
    const [ willDeliver , setWillDeliver ] = useState(singlePost.willDeliver)
    const [ msg , setMsg ] = useState('')

    const handleEdit = async (e) => {
        e.preventDefault();
        let authString = 'Bearer ' + token
       
        const postObject = {
            method: "PATCH",
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

        const res = await editPost(singlePost._id, postObject)
        
        if (res.success) {
             const newPosts = await getPosts({headers: {
                'Content-Type': 'application/json',
                'Authorization': authString
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
                <h2 className='right-title'>Edit Your Post</h2>
            </div>
            <div className='right-body'>
            <form id='createForm' onSubmit={handleEdit}>
                        <label>
                            <div className='info-header'>Title:</div>
                            <input type='text' onChange={ (e)=>{
                                setTitle(e.target.value)
                                }} value={title} required={true} maxLength={75} placeholder='required' size={50}/>
                                <br/>
                           <span className='remainder'>{'(' + (75 - title.length) +') characters remaining'}</span>
                        </label>
                        <br/>
                        <label>
                            <div className='info-header'>Description:</div>
                            <textarea rows="5" cols="50" placeholder='required' value={description} required={true} maxLength={425} onChange={ (e) => setDescription(e.target.value)}/>
                            <br/>
                            <span className='remainder'>{'('+ (425-description.length) + ') characters remaining' }</span>
                        </label>
                        <br/>
                        <label>
                            <div className='info-header'>Price:</div>
                            <input type='text' required={true} maxLength={20} value={price} placeholder='required' onChange={ (e)=> setPrice(e.target.value)}/>
                        </label>
                        <br/>
                        <label>
                        <div className='info-header'>Location:</div>
                           <input type='text' placeholder='optional, [On Request] is default' value={postLocation} size={50} onChange={ (e)=> setLocation(e.target.value)}/> 
                        </label>
                        <br/>
                        <label>
                            <div className='info-header'>Will Deliver:</div>
                            <select onChange={ (e)=> setWillDeliver(e.target.value) } value={willDeliver} >
                                <option value={false}>False</option>
                                <option value={true}>True</option>
                            </select>
                        </label>
                        <div className='formActions'>
                            <span>
                                <input type='submit' text='Submit Changes'/><button type='button' onClick={()=> history.goBack()}>Cancel</button>
                            </span>
                        </div>
                    </form>
                    <div className='Error-message'>
                        {msg}
                    </div>
            </div>   
        </div>
    )

}

export default Post_edit