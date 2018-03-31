import * as types from './types.js';


// Action creators

// Set all available categories
export function setCategories(categories) {
    return {
        type: types.SET_CATEGORIES,
      	categories
    }
}

// Set selected category
export function setSelectedCategory(category) {
    return {
        type: types.SET_SELECTED_CATEGORY,
      	category
    }
}

// Set all posts from the selected category
export function setCategoryPosts(category, posts) {
    return {
        type: types.SET_CATEGORY_POSTS,
      	category,
      	posts
    }
}

// Set all posts
export function setPosts(posts) {
    return {
        type: types.SET_POSTS,
      	posts
    }
}

// Add post
export function addPost(post) {
    return {
        type: types.ADD_POST,
      	post
    }
}

// Edit post
export function editPost(id, title, body) {
    return {
        type: types.EDIT_POST,
      	id,
      	title,
      	body
    }
}

// Delete post
export function deletePost(id) {
    return {
        type: types.DELETE_POST,
      	id
    }
}

// Rate post
export function ratePost(id, rate) {
    return {
        type: types.RATE_POST,
      	id,
      	rate
    }
}

// Set comments
export function setComments(comments) {
    return {
        type: types.SET_COMMENTS,
      	comments
    }
}

// Add comment
export function addComment(comment) {
    return {
        type: types.ADD_COMMENT,
      	comment
    }
}

// Edit comment
export function editComment(id, body) {
    return {
        type: types.EDIT_COMMENT,
      	id,
      	body
    }
}

// Delete comment
export function deleteComment(id) {
    return {
        type: types.DELETE_COMMENT,
      	id
    }
}

// Rate comment
export function rateComment(id, rate) {
    return {
        type: types.RATE_COMMENT,
      	id,
      	rate
    }
}

// Set post number of comments
export function setPostComments(id, comments) {
    return {
        type: types.SET_POST_COMMENTS,
      	id,
      	comments
    }
}

