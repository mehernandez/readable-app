import React, { Component } from 'react';
import { addPost} from './Api.js';
import { connect } from 'react-redux';
import { addPost as addPostA} from './actions/Actions';

class NewPost extends Component {
 
 constructor(props) {
      super(props);
      this.state = {
        post: {
        	title: "",
          	body: "",
          	category: props.categories[0].name
        }
      };
      
      this.handleChangeTitle = this.handleChangeTitle.bind(this);
      this.handleChangeBody = this.handleChangeBody.bind(this);
   	  this.handleChangeCategory = this.handleChangeCategory.bind(this);
      this.save = this.save.bind(this);
    } 
  
  
     handleChangeTitle(e){
       this.setState({post: {...this.state.post, title: e.target.value}, focus: 0});
     }
  
  	handleChangeBody(e){
      this.setState({post: {...this.state.post, body: e.target.value}, focus: 1});
    }
  
    handleChangeCategory(e){
      this.setState({post: {...this.state.post, category: e.target.value}});
    }
  
  	save(e){
     addPost(this.state.post).then(data => {
                    this.props.addPost({...data, category: data.category}); 
       				this.props.history.goBack();
					}); 
      e.preventDefault()
    }
  
      render() {
        
        const CatList = this.props.categories.map((cat, index) =>
  			<option value={cat.name} key={index}>{cat.name}</option>
		);
        
        return (
            <div className="well" style={{ maxWidth: 400, margin: '0 auto 10px', textAlign: 'left' }}>
           <form onSubmit={this.save}>
           <h2> Title </h2>
           <textarea value={this.state.post.title} onChange={this.handleChangeTitle} autoFocus={this.state.focus === 0}/>
           <br /><br />
           <h2> Body </h2>
           <textarea value={this.state.post.body} onChange={this.handleChangeBody} autoFocus={this.state.focus === 1}/> 
		  <h2> Category </h2>
          <br /><br />
          <select value={this.state.post.category} onChange={this.handleChangeCategory}>
          {CatList}
          </select>
          <br /><br />
           <input type="submit" value="Add post" />
           <br />
           </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {categories: state.categories};
};

function mapDispatchToProps(dispatch) {
  return {
    addPost: (item) => dispatch(addPostA(item))
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(NewPost);