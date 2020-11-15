
const BASE = 'https://strangers-things.herokuapp.com/api/2007-UNF-RM-WEB-PT'


export async function getUserName( token ) {

  const data = { headers: {
    'Authorization' : `Bearer ${token}`,
    'Content-Type' : 'application/json'
  }
}

  try {
    const res = await fetch(`${BASE}/test/me`, data )
    const results = await res.json()
    return results.success ? results.data.user.username : 'Guest'
  } catch (error) {
    throw (error)

  }

}

export async function handleLogin( user, pwd ) {
    
    const data = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: user,
            password: pwd
          }
        })
      }
    
    try {
        const res = await fetch(`${BASE}/users/login`, data);

        const results = await res.json()
        return results
    } catch (error) {
        throw (error)
    }  

}

export async function handleRegister( user, pwd ) {

    const data = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: user,
            password: pwd
          }
        })
      }

    try {
        const res = await fetch(`${BASE}/users/register`, data)
        const results = await res.json()
        return results
    } catch (error) {
        throw (error)
      }
}

export async function getPosts(token) {

    const body = {headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      }
    }
   
  try {
    const res = await fetch(`${BASE}/posts`, body)
    const data = await res.json();
    return data.data.posts
  } catch (error) {
    throw (error)
    }
}

export async function createPost(object) {

  try {
    const response = await fetch(`${BASE}/posts`, object)
    const data = await response.json()
    return data
  } catch (error) {
    throw (error)
  }

}

export async function getUser(token) {

  const data = { headers: {
    'Authorization' : `Bearer ${token}`,
    'Content-Type' : 'application/json'
    }
  }

  try {
    const res = await fetch(`${BASE}/users/me`, data )
    const results = await res.json()
    return results
  } catch (error) {
    throw (error)

  }
}

export async function postMessage(id, msg, token) {

  const data = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      },
    body: JSON.stringify({
      message: {
        content: msg
        }
      })
  }

  try {
    const res = await fetch(`${BASE}/posts/${id}/messages`, data)
    const results = await res.json();
    return results
  } catch (error) {
    throw (error)
  }

}

export async function editPost(id, data) {

  try {
    const res = await fetch(`${BASE}/posts/${id}`, data)
    const results = await res.json();
    return results;
  } catch (error) {
    throw (error)
  }

}

export async function deletePost(id, token) {

  try {
    const res = await fetch(`${BASE}/posts/${id}`, {method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    const results = await res.json();
    return results;
  } catch (error) {
    throw (error)
  }

}