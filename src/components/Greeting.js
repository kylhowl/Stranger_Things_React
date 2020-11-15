import React from 'react';
import Search from './Search'

const Greeting = ( { userName, posts, setFilterPost, filterPost } ) => {
  
    return (
    <div className='app-header'>
      <div className="app-title">
        <h1 >Stranger's Things</h1>
      </div>
      <div className='header-foot'>
        <div className='title-actions'>
          <Search posts={posts} filterPost={filterPost} setFilterPost={setFilterPost} />
        </div>
        <div className='welcome-span'>
          <span>Welcome {userName}</span>
        </div>
      </div> 
    </div>   
    )

}

export default Greeting