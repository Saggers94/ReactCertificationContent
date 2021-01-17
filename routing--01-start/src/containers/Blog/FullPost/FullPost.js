import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  //Router will not unmount the component and than remount it with the different data
  //so you would need to use componentDidUpdate here instead of componentDidMount
  //However in this case we need both of them

  //Here componentDidUpdate would triggered because the props changed when we reload the route
  //with the new Id

  //the reason behind the below thing is : the React Router does not replace
  //the component the whole time that's why componentDidMount does not get
  //called, so we would need to use the componentDidUpdate

  //when we change the route in the Posts with the specific post id again
  //the posts component did not rerender the whole component as
  //it is the nested component and because of which the FullPost doesn't
  //rerender and because of which this componentDidMount does not get called
  //in that case we would need to use componentDidUpdate
  componentDidMount() {
    console.log(this.props);
    // for the first time that single post gets loaded
    this.loadData();
  }

  componentDidUpdate() {
    // whenever the data would update this will reload again
    this.loadData();
  }
  // this.parops.match.params.id would give us a string so below in loaddata in the if condition
  // we would need to convert the params(id) into the number or we have to use (!=) instead of
  // (!==) or by adding a plus before ( +this.props.match.params.id) you would convert the string
  // into a number
  loadData = () => {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost &&
          this.state.loadedPost.id !== +this.props.match.params.id)
      ) {
        axios.get("/posts/" + this.props.match.params.id).then((response) => {
          // console.log(response);
          this.setState({ loadedPost: response.data });
        });
      }
    }
  };

  deletePostHandler = () => {
    axios.delete("/posts/" + this.props.match.params.id).then((response) => {
      console.log(response);
    });
  };

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.match.params.id) {
      post = <p style={{ textAlign: "center" }}>Loading...!</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button onClick={this.deletePostHandler} className="Delete">
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
