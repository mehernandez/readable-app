import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import './App.css';
import { setCategories, setPosts} from './actions/Actions';
import { getCategories, getPosts, getComments, getCategoryPosts} from './Api.js';
import { connect } from 'react-redux';

const buttonStyles = ['primary', 'success', 'info', 'warning'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "N/A"
    }
    
    // Function to get and update posts
    this.getP = (cats)=>{
  
    const cat = this.props.match.params.category
    if(cat){
      
      let exists = false;
      
      cats.map((item)=>{
        if(item.name === cat){
         exists = true; 
        }
      });
      
    if(!exists){
      this.props.history.push('/not/found/not');
    }else{

    // Get posts from category
    getCategoryPosts(cat).then((data)=>{
      if (data.length > 0){
      var arr = [];
      data.map((item, index)=>{
      	getComments(item.id).then((da)=>{
          item.comments = da.length;
          arr.push(item);
          if(arr.length === data.length){
           this.setState({category: cat});
           this.props.setPosts(arr); 
          }
        });
      });   
      }else{
        this.setState({category: cat});
        this.props.setPosts([]); 
      }
      
      });
    }
      
    }else{
      
   	// Get all posts
    getPosts().then((data)=>{
      if (data.length > 0){
      var arr = [];
      data.map((item, index)=>{
      	getComments(item.id).then((da)=>{
          item.comments = da.length;
          arr.push(item);
          if(arr.length === data.length){
           this.setState({category: "N/A"});
           this.props.setPosts(arr); 
          }
        });
      });      
       }else{
        this.setState({category: "N/A"});
        this.props.setPosts([]); 
      }
      });
    }
  
  }
    
  }
  

  componentDidMount() {
    // Get initial categories
    getCategories().then((data)=>{
    this.props.setCategories(data)
    this.getP(data);
    });
    
      }
  
  componentDidUpdate(){
        
    if(this.state.category !== "N/A" && this.state.category !== this.props.match.params.category){
      this.getP(this.props.categories);
    }

  }
                  

  render() {

    
    return (
            <div>
        	<ButtonToolbar style={{ "display": "flex", "justifyContent": "center", "marginTop": 50, "marginBottom": 50 }}>

          {this.props.categories.map((item, index)=> {
            return <Button key={index} bsStyle={buttonStyles[index]} onClick={(e)=> this.props.history.push('/'+ item.name)}>{item.name}</Button>
          })}

        </ButtonToolbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {categories: state.categories};
};

function mapDispatchToProps(dispatch) {
  return {
    setCategories: (items) => dispatch(setCategories(items)),
    setPosts: (items) => dispatch(setPosts(items))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
