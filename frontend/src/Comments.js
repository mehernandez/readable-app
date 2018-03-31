import React, { Component } from 'react';
import Comment from './Comment.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SortLogo from './sort.png';
import DateLogo from './date.png';
import ScoreLogo from './score.svg';
import AddLogo from './add.png';

class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sorted: 'date'
    };
    
    // Function to sort a comment list by date or score
   this.sort = (lis, type) =>{
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
      	<Link to={"/"+this.props.match.params.category+"/"+this.props.match.params.id+"/new/comment"}><img src={AddLogo} alt="Add" width="50" height="50"/></ Link>
        </ div>
        <img src={SortLogo} alt="Sort" width="50" height="50"/>
        <RenderSorting />
      	<br />
      	<h1>Comments</h1>
        <br />
          {this.sort(this.props.comments, this.state.sorted).map((item, index)=> {
            return <Comment key={index} comment={item} post={this.props.match.params.id}/>
          })}
      </div>
    );
  }
}
         
function mapStateToProps(state) {
	return {comments: state.comments};
};

export default connect(mapStateToProps)(Comments);
