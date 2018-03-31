import React, { Component } from 'react';
import Post from './Post.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SortLogo from './sort.png';
import DateLogo from './date.png';
import ScoreLogo from './score.svg';
import AddLogo from './add.png';

class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sorted: 'date'
    };
    
    // Function to sort a post list by date or score
   this.sort = (lisx, type) =>{
     
   let lis = lisx.filter((item)=> !item.deleted);  
     
   var arr = [];
   switch(type){
     case 'date':
       arr = lis.sort(function (a, b) {
        if (a.timestamp < b.timestamp) {
          return 1;
        }
        if (a.timestamp > b.timestamp) {
          return -1;
        }
        return 0;
      });
       break;
     case 'score':
       arr = lis.sort(function (a, b) {
        if (a.voteScore < b.voteScore) {
          return 1;
        }
        if (a.voteScore > b.voteScore) {
          return -1;
        }
        return 0;
      });
       break;
     default:
       console.log('default');
   }
     return arr;
} 
  }
  
  render() {
    
 // Function to render which is the sorting filter applied
 var RenderSorting = ()=>{
   switch(this.state.sorted){
     case 'date':
       return(
         <div>
          <img src={DateLogo} alt="Date" width="50" height="50" style={{backgroundColor:"gray"}} />
     	  <img src={ScoreLogo} alt="Score" width="50" height="50" onClick={()=> this.setState({sorted: 'score'})}/>
         </div>
         );
     case 'score':
       return(
         <div>
          <img src={DateLogo} alt="Date" width="50" height="50" onClick={()=> this.setState({sorted: 'date'})}/>
     	  <img src={ScoreLogo} alt="Score" width="50" height="50" style={{backgroundColor:"gray"}}/>
         </div>
         )
     default:
       return(
         <div>
          <img src={DateLogo} alt="Date" width="50" height="50" onClick={()=> this.setState({sorted: 'date'})}/>
     	  <img src={ScoreLogo} alt="Score" width="50" height="50" onClick={()=> this.setState({sorted: 'score'})}/>
         </div>
         )
   }
  };
    return (
      <div>
      <div>
      	<Link to="/new/new/post"><img src={AddLogo} alt="Add" width="50" height="50"/></ Link>
      </ div>
        <img src={SortLogo} alt="Sort" width="50" height="50"/>
        <RenderSorting />
      <br />
      	<h1>Posts</h1>
      <br />
          {this.sort(this.props.posts, this.state.sorted).map(function (item, index) {
            return <Post key={index} post={item} />
          })}
      </div>
    );
  }
}
         
function mapStateToProps(state) {
  //console.log(state.posts)
  return {posts: state.posts};
};

export default connect(mapStateToProps)(Posts);
