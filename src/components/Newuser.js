import React from 'react'

const Newuser = (props) => {

    return (
        <div className='right-aside'>
            <div className='right-header'>
                <h2 className='right-title'>Welcome to Stranger's Things</h2>
                <div className='right-body'>
                    <div>
                        <div id='newuser'>
                            <br/>
                            <p>Let's get you started.  You can create a new post so everyone can see what you are willing to sell or give away.</p>
                            <br/>
                            <p>Messaging is simple, just find a post/item you like and click message to bring up the message form.  Once your 
                            item is sold or given away you can delete your post or edit if things change.  Use the links at the bottom to navigate 
                            the site.</p>
                            <br/>
                            <p> Don't forget to logout as the site will leave you logged in.</p>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Newuser