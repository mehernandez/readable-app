// Backend url
const api = 'http://localhost:3001' || `${process.env.REACT_APP_BACKEND}`;

// Generate a unique token
//let token = localStorage.token
//if (!token)
//    token = localStorage.token = Math.random().toString(36).substr(-8)


// Headers for api calls
const headers = { headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'},
                 credentials: true };

// Generate a UUID
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

// Get all categories
export const getCategories = () =>
    fetch(`${api}/categories`, headers)
        .then(res =>
            res.json()).then(data => data.categories)

// Get all posts from category
export const getCategoryPosts = (category) =>
    fetch(`${api}/${category}/posts`, headers)
        .then(res => res.json()).then(data => data)

// Get all posts
export const getPosts = () =>
    fetch(`${api}/posts`, headers)
        .then(res => res.json()).then(data => data)

// Add a new post
export const addPost = (post) => {
    post.id = generateUUID();
    post.timestamp = Date.now();
  	post.author = 'You';

    return fetch(`${api}/posts`, {
      	...headers,
        method: 'POST',
        body: JSON.stringify(post)
    }).then(res => res.json()).then(data => data)
}

// Get post details
export const getPost = (id) =>
    fetch(`${api}/posts/${id}`, headers)
        .then(res => res.json()).then(data => data)

// Rate post
export const ratePost = (id, option) =>
    fetch(`${api}/posts/${id}`, {
        ...headers,
        method: 'POST',
        body: JSON.stringify({ option: option })
    }).then(res => res.json()).then(data => data)

// Edit post
export const editPost = (id, title, body) => 
    fetch(`${api}/posts/${id}`, {
      	...headers,
        method: 'PUT',
        body: JSON.stringify({ title: title, body: body })
    }).then(res => res.json()).then(data => data)


// Delete post
export const deletePost = (id) => 
    fetch(`${api}/posts/${id}`, {
      	...headers,
        method: 'DELETE',
        body: JSON.stringify({})
    }).then(res => res.ok).then(data => data)

// Get all comments from post
export const getComments = (id) =>
    fetch(`${api}/posts/${id}/comments`, headers)
        .then(res => res.json()).then(data => data)

// Add a new comment
export const addComment = (comm) => {
    comm.id = generateUUID()
    comm.timestamp = Date.now()
  	comm.author = 'You';
  	

    return fetch(`${api}/comments`, {
      	...headers,
        method: 'POST',
        body: JSON.stringify(comm)
    }).then(res => res.json()).then(data => data)
}

// Get comment details
export const getComment = (id) =>
    fetch(`${api}/comments/${id}`, headers)
        .then(res => res.json()).then(data => data.comment)

// Rate comment
export const rateComment = (id, option) =>
    fetch(`${api}/comments/${id}`, {
      	...headers,
        method: 'POST',
        body: JSON.stringify({option: option})
    }).then(res => res.json()).then(data => data)

// Edit comment
export const editComment = (id, body) =>
    fetch(`${api}/comments/${id}`, {
      	...headers,
        method: 'PUT',
        body: JSON.stringify({ timestamp: Date.now(), body: body })
    }).then(res => res.json()).then(data => data)

// Delete comment
export const deleteComment = (id) =>
    fetch(`${api}/comments/${id}`, {
      	...headers,
        method: 'DELETE',
        body: JSON.stringify({})
    }).then(res => res.json()).then(data => data)
