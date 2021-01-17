import React, { Component } from "react";
import axios from "axios";
// Conditional Redirecting is happened here
import { Redirect } from "react-router-dom";
import "./NewPost.css";

class NewPost extends Component {
  state = {
    title: "",
    content: "",
    author: "Max",
    submitted: false,
  };

  componentDidMount() {
    // if the user is unauthenticated than redirect to the posts page
    // If unauth => this.props.history.replace("/posts")
    console.log(this.props);
  }

  postDataHandler = () => {
    const data = {
      title: this.state.title,
      body: this.state.content,
      author: this.state.author,
    };
    axios.post("/posts", data).then((response) => {
      console.log(response);
      // we can redirect this way too
      this.props.history.push("/posts");

      //if we will use this than this would empty the route stack and so you won't be able to
      //go back to the previous page as there is none. This is the same behaviour as the Redirect
      //has
      //this.props.history.replace("/hosts");
      // this.setState({ submitted: true });
    });
  };

  render() {
    // we can also use history props as this NewPost component is available in the Route in the
    // Blog that has the BrowserRouter
    // Conditional Redirecting
    // let redirect = null;
    // if (this.state.submitted) {
    //   redirect = <Redirect to="/posts" />;
    // }
    return (
      <div className="NewPost">
        {/* {redirect} */}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.content}
          onChange={(event) => this.setState({ content: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={(event) => this.setState({ author: event.target.value })}
        >
          <option value="Max">Max</option>
          <option value="Manu">Manu</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
