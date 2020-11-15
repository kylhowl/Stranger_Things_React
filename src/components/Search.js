import React, { useState } from 'react'



const Search = ( { posts, setFilterPost }) => {

    const [ search, setSearch] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let copy = []
        let query = search.split(" ") // creates array of search words from input
        
        for ( const post of posts) { // loop over posts
            const keys = ['location', 'title', 'price', 'description'] // searchable areas of post
            Loop1 : // label reference for break; starting point after matches are found.
            for ( let key of keys) { // loop over object keys
            
                for ( let q of query ) { // loop of array of search word(s)
                    if (!q) {break} // jumps out of loop for undefined fields 

                    let patt = new RegExp(q, 'i',)  // creates regex expression from q that is not case-sensitive

                    if (patt.test(post[key])) { // checks for matches returns (true or false)
                        // copy array
                        copy.push(post)         // add post to copy array
                        break Loop1;  // breaks the loop to eliminate duplicate posts being added
                    }
                }
            }
        }

        setFilterPost(copy);

    }

    return (
    <form className='search-form' >
        <label>Search
            <input type='search' placeholder='whatever, whenever' size={50} onChange={e=> setSearch(e.target.value)}/>
            <input type='submit' onClick={handleSubmit}/>
            <input type='reset' onClick={()=> setFilterPost([])}/>
        </label>
    </form>
    )

}

export default Search