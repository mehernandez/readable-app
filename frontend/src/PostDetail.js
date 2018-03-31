import React, { Component } from 'react';
import UpvoteLogo from './upvote.png';
import DownvoteLogo from './downvote.png';
import EditLogo from './edit.png';
import DeleteLogo from './delete.png';
import CancelLogo from './cancel.png';
import { ratePost, deletePost, editPost, getPost, getComments} from './Api.js';
import { connect } from 'react-redux';
import { ratePost as ratePostA, deletePost as deletePostA, editPost as editPostA, setComments as setCommentsA} from './actions/Actions';

class PostDetail extends Component {

    constructor(props) {
      super(props);
      this.state = {
        edit: false,
        post:{
        	id: "",
          	title: "",
          	body: "",
          	author: "",
          	date: Date(),
          	voteScore: 0,
          	comments: 0
        }
      };
            
      this.handleChangeTitle = this.handleChangeTitle.bind(this);
      this.handleChangeBody = this.handleChangeBody.bind(this);
      this.save = this.save.bind(this);
    }
  
    componentDidMount() {
      // Get post information
      getPost(this.props.match.params.id).then((data)=>{
        if (data.error || Object.keys(data).length === 0){
        	this.props.history.push('/not/found/not');
        }else{
         getComments(this.props.match.params.id).then((data2)=>{
           data.comments = data2.length;
           this.setState({
             post: data
           });
           this.props.setComments(data2);
         });
      }
      });
    }
  
     handleChangeTitle(e){
       this.setState({postE: {...this.state.postE, title: e.target.value}, focus: 0});
     }
  
  	handleChangeBody(e){
      this.setState({postE: {...this.state.postE, body: e.target.value}, focus: 1});
    }
  
  	save(e){
     editPost(this.state.post.id, this.state.postE.title, this.state.postE.body).then(data => {
                    this.props.editPost(data); 
                    this.setState({edit: false, post: {...this.state.post, title: data.title, body: data.body}});
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
           <textarea value={this.state.postE.title} onChange={this.handleChangeTitle} autoFocus={this.state.focus === 0}/>
        <br /><br />
           <h2> Body </h2>
           <textarea value={this.state.postE.body} onChange={this.handleChangeBody} autoFocus={this.state.focus === 1}/> 
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
                <h1>{this.state.post.title }</h1>
                <p>{this.state.post.body}</p>
                <h5>{this.state.post.author}</h5>
                <h6>{new Date(this.state.post.timestamp).toLocaleString()}</h6>
				<h6>Score: {this.state.post.voteScore}</h6>
				<h6>Comments: {this.props.comments}</h6>
				<div>
     	  			<img src={UpvoteLogo} alt="Upvote" width="50" height="50" onClick={() => ratePost(this.state.post.id, 'upVote').then(data => {this.props.ratePost(data); this.setState({post:{...this.state.post, voteScore: data.voteScore}})})
        			}/>
					<img src={DownvoteLogo} alt="Downvote" width="50" height="50" onClick={() => ratePost(this.state.post.id, 'downVote').then(data => {this.props.ratePost(data); this.setState({post:{...this.state.post, voteScore: data.voteScore}})})
                    }/>
					<img src={EditLogo} alt="Edit" width="50" height="50" onClick={() => this.setState({edit:true, postE: this.state.post, focus: 0})}/>
					<img src={DeleteLogo} alt="Delete" width="50" height="50" onClick={() => deletePost(this.state.post.id).then(data => {this.props.deletePost(this.state.post.id); this.props.history.goBack();})}/>

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
          
function mapStateToProps(state) {
	return {comments: state.comments.length};
};

function mapDispatchToProps(dispatch) {
  return {
    ratePost: (item) => dispatch(ratePostA(item.id, item.voteScore)),
    deletePost: (id) => dispatch(deletePostA(id)),
    editPost: (item) => dispatch(editPostA(item.id, item.title, item.body)),
    setComments: (items) => dispatch(setCommentsA(items))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);