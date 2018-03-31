import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UpvoteLogo from './upvote.png';
import DownvoteLogo from './downvote.png';
import EditLogo from './edit.png';
import DeleteLogo from './delete.png';
import CancelLogo from './cancel.png';
import { ratePost, deletePost, editPost} from './Api.js';
import { connect } from 'react-redux';
import * as actions from './actions/Actions';

class Post extends Component {

    constructor(props) {
      super(props);
      this.state = {
        edit: false
      };
      
      this.handleChangeTitle = this.handleChangeTitle.bind(this);
      this.handleChangeBody = this.handleChangeBody.bind(this);
      this.save = this.save.bind(this);
    }
  
     handleChangeTitle(e){
       this.setState({post: {...this.state.post, title: e.target.value}, focus: 0});
     }
  
  	handleChangeBody(e){
      this.setState({post: {...this.state.post, body: e.target.value}, focus: 1});
    }
  
  	save(e){
     editPost(this.props.post.id, this.state.post.title, this.state.post.body).then(data => {
                    this.props.editPost(data); 
                    this.setState({edit:false});
					}); 
      e.preventDefault()
    }

    render() {
      
       // Function to render depending of if we are editing
      var RenderContent = ()=>{
        if (this.state.edit){
         return (
            <div className="well" style={{ maxWidth: 400, margin: '0 auto 10px', textAlign: 'left' }}>
           <form onSubmit={this.save}>
           <h2> Title </h2>
           <textarea value={this.state.post.title} onChange={this.handleChangeTitle} autoFocus={this.state.focus === 0}/>
        <br /><br />
           <h2> Body </h2>
           <textarea value={this.state.post.body} onChange={this.handleChangeBody} autoFocus={this.state.focus === 1}/> 
<br /><br />
           <input type="submit" value="Save" />
           <br />
           </form>
				<div>
                    <img src={CancelLogo} alt="Cancel" width="50" height="50" onClick={() => this.setState({edit:false})
        			}/>

				</div>
            </div>
        );
        }else{
          return (
            <div className="well" style={{ maxWidth: 400, margin: '0 auto 10px', textAlign: 'left' }}>
                <Link to={"/"+this.props.post.category+"/" + this.props.post.id}><h1>{this.props.post.title }</h1></Link>
                <p>{this.props.post.body}</p>
                <h5>{this.props.post.author}</h5>
                <h6>{new Date(this.props.post.timestamp).toLocaleString()}</h6>
				<h6>Score: {this.props.post.voteScore}</h6>
				<h6>Comments: {this.props.post.comments}</h6>
				<div>
     	  			<img src={UpvoteLogo} alt="Upvote" width="50" height="50" onClick={() => ratePost(this.props.post.id, 'upVote').then(data => this.props.ratePost(data))
        			}/>
					<img src={DownvoteLogo} alt="Downvote" width="50" height="50" onClick={() => ratePost(this.props.post.id, 'downVote').then(data => this.props.ratePost(data))
                    }/>
					<img src={EditLogo} alt="Edit" width="50" height="50" onClick={() => this.setState({edit:true, post: this.props.post, focus: 0})}/>
					<img src={DeleteLogo} alt="Delete" width="50" height="50" onClick={() => deletePost(this.props.post.id).then(data => this.props.deletePost(this.props.post.id))}/>

				</div>
            </div>
        );
        }
      };
      
        return (
            <RenderContent />
        );
    }
}

function mapDispatchToProps(dispatch) {
  return {
    ratePost: (item) => dispatch(actions.ratePost(item.id, item.voteScore)),
    deletePost: (id) => dispatch(actions.deletePost(id)),
    editPost: (item) => dispatch(actions.editPost(item.id, item.title, item.body))
  }
}

export default connect(null, mapDispatchToProps)(Post);