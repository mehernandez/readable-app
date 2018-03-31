import React, { Component } from 'react';
import UpvoteLogo from './upvote.png';
import DownvoteLogo from './downvote.png';
import EditLogo from './edit.png';
import DeleteLogo from './delete.png';
import CancelLogo from './cancel.png';
import { rateComment, deleteComment, editComment} from './Api.js';
import { connect } from 'react-redux';
import { rateComment as rateCommentA, deleteComment as deleteCommentA, editComment as editCommentA, setPostComments} from './actions/Actions';

class Comment extends Component {

    constructor(props) {
      super(props);
      this.state = {
        edit: false
      };
      
      this.handleChangeBody = this.handleChangeBody.bind(this);
      this.save = this.save.bind(this);
    }
  
  	handleChangeBody(e){
      this.setState({comment: {...this.state.comment, body: e.target.value}, focus: 1});
    }
  
  	save(e){
     editComment(this.props.comment.id, this.state.comment.body).then(data => {
                    this.props.editComment(data); 
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
           <h2> Body </h2>
           <textarea value={this.state.comment.body} onChange={this.handleChangeBody} autoFocus={this.state.focus === 1}/> 
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
                <p>{this.props.comment.body}</p>
                <h5>{this.props.comment.author}</h5>
                <h6>{new Date(this.props.comment.timestamp).toLocaleString()}</h6>
				<h6>Score: {this.props.comment.voteScore}</h6>
				<div>
     	  			<img src={UpvoteLogo} alt="Upvote" width="30" height="30" onClick={() => rateComment(this.props.comment.id, 'upVote').then(data => this.props.rateComment(data))
        			}/>
					<img src={DownvoteLogo} alt="Downvote" width="30" height="30" onClick={() => rateComment(this.props.comment.id, 'downVote').then(data => this.props.rateComment(data))
                    }/>
					<img src={EditLogo} alt="Edit" width="30" height="30" onClick={() => this.setState({edit:true, comment: this.props.comment, focus: 1})}/>
					<img src={DeleteLogo} alt="Delete" width="30" height="30" onClick={() => deleteComment(this.props.comment.id).then(data => {this.props.deleteComment(this.props.comment.id); this.props.setPostComments(this.props.post, -1)})}/>

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
    rateComment: (item) => dispatch(rateCommentA(item.id, item.voteScore)),
    deleteComment: (id) => dispatch(deleteCommentA(id)),
    editComment: (item) => dispatch(editCommentA(item.id, item.body)),
    setPostComments: (id, comments) => dispatch(setPostComments(id, comments))
  }
}

export default connect(null, mapDispatchToProps)(Comment);