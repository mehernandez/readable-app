import React, { Component } from 'react';
import { addComment, getPost} from './Api.js';
import { connect } from 'react-redux';
import { addComment as addCommentA, setPostComments} from './actions/Actions';

class NewPost extends Component {
 
 constructor(props) {
      super(props);
      this.state = {
        comment: {
          	body: "",
          	parentId: this.props.match.params.id
        }
      };
   
       // Get post information
      getPost(this.props.match.params.id).then((data)=>{
        if (data.error || Object.keys(data).length === 0){
        	this.props.history.push('/not/found/not');
        }
      });
      
      this.handleChangeBody = this.handleChangeBody.bind(this);
      this.save = this.save.bind(this);
    } 
  
  	handleChangeBody(e){
      this.setState({comment: {...this.state.comment, body: e.target.value}, focus: 1});
    }
  
  	save(e){
     addComment(this.state.comment).then(data => {
       				console.log(data)
                    this.props.addComment(data);
       				this.props.setPostComments(this.state.comment.parentId, 1);
       				this.props.history.goBack();
					}); 
      e.preventDefault()
    }
  
      render() {
        
        return (
            <div className="well" style={{ maxWidth: 400, margin: '0 auto 10px', textAlign: 'left' }}>
           <form onSubmit={this.save}>
           <h2> Body </h2>
           <textarea value={this.state.comment.body} onChange={this.handleChangeBody} autoFocus={this.state.focus === 1}/> 
          <br /><br />
           <input type="submit" value="Add comment" />
           <br />
           </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (item) => dispatch(addCommentA(item)),
    setPostComments: (id, comments) => dispatch(setPostComments(id, comments))
  }
}
  
export default connect(null, mapDispatchToProps)(NewPost);