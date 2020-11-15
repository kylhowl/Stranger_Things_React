import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
    Link
  } from 'react-router-dom';

import { Greeting, Login, Register, Posts, Loading, Create, Nav, User, Welcome, Mymessages, Myposts, Newuser, Message_form, Post_edit, Delete_post } from './components'
import { getPosts, getUserName, getUser } from './api'



const App = () => {

    const [ userName, setUserName ] = useState('Stranger');
    const [ loggedIn , setLoggedIn ] = useState(false);
    const [ token , setToken ] = useState(localStorage.getItem('token'));
    const [ pwd , setPwd] = useState('');
    const [ user, setUser ] = useState('');
    const [ posts , setPosts ] = useState([]);
    const [ myPosts, setMyPosts ] = useState([]);
    const [ myMessages, setMyMessages ] = useState([]);
    const [ message, setMessage ] = useState('');
    const [ singlePost , setSinglePost ] = useState('');
    const [ filterPost, setFilterPost ] = useState([]);
    
  
    useEffect( async ()=>{
      if (token) {
        setLoggedIn(true);
        setUserName(await getUserName(token))
        const res = await getUser(token);
        setMyPosts(res.success ? res.data.posts : []);
        setMyMessages(res.success ? res.data.messages : [])
        const postData = await getPosts(token);
        setPosts(postData);
      } else {
        const postDatum = await getPosts(token);
        setPosts(postDatum);
        setMyPosts([]); setMyMessages([]);
      };            
    },[ token ])


    return (
    <Router>
    
    <Greeting userName={userName} loggedIn={loggedIn} posts={posts} setFilterPost={setFilterPost} />
    <section className='app-body'>
    { posts.length ? ( filterPost.length ? <Posts posts={filterPost} userName={userName} setMessage={setMessage} loggedIn={loggedIn} setSinglePost={setSinglePost}/> : <Posts posts={posts} userName={userName} setMessage={setMessage} loggedIn={loggedIn} setSinglePost={setSinglePost}/> ): <Loading option='post-board'/> }
    <Switch>
    
    <Route path='/login'>
      <Login setUserName={setUserName} setToken={setToken} setLoggedIn={setLoggedIn} user={user} setUser={setUser} pwd={pwd} setPwd={setPwd}/>
    </Route>
    <Route path='/register'>
      <Register setUserName={setUserName} user={user} setToken={setToken} setLoggedIn={setLoggedIn} setUser={setUser} pwd={pwd} setPwd={setPwd}/>
    </Route>
    <Route path='/create'>
      <Create setPosts={setPosts} token={token} posts={posts}/>
    </Route>
    <Route path='/mymessages'>
      <Mymessages myMessages={myMessages} userName={userName}/>
    </Route>
    <Route path='/myposts'>
      <Myposts myPosts={myPosts} setSinglePost={setSinglePost}/>
    </Route>
    <Route path='/new_user'>
      <Newuser />
    </Route>
    <Route path='/editpost'>
      <Post_edit singlePost={singlePost} token={token} setPosts={setPosts}/>
    </Route>
    <Route path='/message'>
      <Message_form singlePost={singlePost} token={token} setMyMessages={setMyMessages} setMyPosts={setMyPosts}/>
    </Route>
    <Route path='/deletepost'>
      <Delete_post singlePost={singlePost} token={token} setPosts={setPosts}/>
    </Route>
    <Route exact path='/'>
      { loggedIn ?  <User userName={userName} myMessages={myMessages.length} myPosts={myPosts.length} option={myMessages}/> : <Welcome message={message}/>}
    </Route>
    <Route path='*'>
      <Redirect to='/'/>
    </Route>
    </Switch>    
    </section>
    {/* <Search /> */}
      { loggedIn ? <Nav setLoggedIn={setLoggedIn} setUserName={setUserName} setToken={setToken}/> : (<footer><div className="app-title">
        <h2 >Stranger's Things</h2>
      </div></footer>) }
    </Router>
    
    )
}


ReactDOM.render(<App />, document.getElementById('root'));