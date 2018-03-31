import { combineReducers } from 'redux';
import * as actions from '../actions/types.js';

// Initial state for the store
const initialState = [];

// Categories reducer function
function categories(state = initialState, action) {

    switch (action.type) {
        case actions.SET_CATEGORIES:
            return action.categories;
       /* case actions.SET_SELECTED_CATEGORY:
            return {
              ...state,
              categories: action.category
            };*/
        default:
            return state;
    }
}

// Posts reducer function
function posts(state = initialState, action) {
    switch (action.type) {
        case actions.SET_POSTS:{
            return action.posts;
        }
        case actions.SET_CATEGORY_POSTS:{
            return action.posts;
        }
      	case actions.ADD_POST:{
        	const arrCopy = state.slice();
          	action.post.comments = 0;
        	arrCopy.push(action.post);
            return arrCopy;
        }
        case actions.EDIT_POST:{
        	const arrCopy = state.map((item)=>{            
            	if(item.id === action.id){
                  item.title = action.title;
                  item.body = action.body;
                }
              return item;
            });
            return arrCopy;
        }
        case actions.DELETE_POST:{
        	const arrCopy = state.filter((item)=>{
            	if(item.id === action.id){
                  return false;
                }
              	return true;
            });
            return arrCopy;
        }
        case actions.RATE_POST:{
           	const arrCopy = state.map((item)=>{            
            	if(item.id === action.id){
                  return {...item, voteScore: action.rate};
                }
              return item;
            });
            return arrCopy;
        }
        case actions.SET_POST_COMMENTS:{
           	const arrCopy = state.map((item)=>{  
              console.log(action.comments)
            	if(item.id === action.id){
                  return {...item, comments: item.comments + action.comments};
                }
              return item;
            });
            return arrCopy;
        }     
        default:{
            return state
        }
    }
}

// Comments reducer function
function comments(state = initialState, action) {
    switch (action.type) {
        case actions.SET_COMMENTS:{
            return action.comments;
        }
      	case actions.ADD_COMMENT:{
        	const arrCopy = state.slice();
        	arrCopy.push(action.comment);
            return arrCopy;
        }
        case actions.EDIT_COMMENT:{
        	const arrCopy = state.map((item)=>{            
            	if(item.id === action.id){
                  item.body = action.body;
                }
              return item;
            });
            return arrCopy;
        }
        case actions.DELETE_COMMENT:{
        	const arrCopy = state.filter((item)=>{
            	if(item.id === action.id){
                  return false;
                }
              	return true;
            });
            return arrCopy;
        }
        case actions.RATE_COMMENT:{
        	const arrCopy = state.map((item)=>{            
            	if(item.id === action.id){
                  return {...item, voteScore: action.rate};
                }
              return item;
            });
            return arrCopy;
        }
        default:{
            return state;
        }
    }
}


export default combineReducers({
    categories,
    posts,
  	comments
})