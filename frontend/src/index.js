import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Posts from './Posts.js';
import PostDetail from './PostDetail.js'
import Header from './Header.js';
import NewPost from './NewPost.js';
import Comments from './Comments.js';
import NewComment from './NewComment.js';
import NoMatch from './NoMatch.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import reducer from './reducers/Reducers'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'


const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store} >
        <Router>
            <div className="App">
                <Route path="/" component={Header} />
                <Route path="/" exact component={App} />
  				<Route path="/" exact component={Posts} />
                <Route path="/:category" exact component={App} />
  				<Route path="/:category" exact component={Posts} />
  				<Route path="/new/new/post" exact component={NewPost} />
  				<Route path="/:category/:id/new/comment" exact component={NewComment} />
  				<Route path="/:category/:id" exact component={PostDetail} />
  				<Route path="/:category/:id" exact component={Comments} />
  				<Route path="/not/found/not" exact component={NoMatch} />
            </div>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
