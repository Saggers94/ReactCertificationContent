import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import "./Posts.css";
import { Route, Link } from "react-router-dom";
import FullPost from "../FullPost/FullPost";

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false,
  };

  componentDidMount() {
    // The BrowserRouter from the react-router-dom won't just provide the route functionality
    // it would even add many props into the over all application which would be available
    // throughout the application files.
    console.log(this.props);
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: "Max",
          };
        });
        this.setState({ posts: updatedPosts });
        // console.log( response );
      })
      .catch((error) => {
        console.log(error);
        // this.setState({ error: true });
      });
  }

  postSelectedHandler = (id) => {
    // push method of the history does allow you to push the page on the browser on the stack
    // of pages, it works in the both below given way
    this.props.history.push({ pathname: "/posts/" + id });
    // Below line also could be used
    // this.props.history.push("/" + id);
    // this.setState({ selectedPostId: id });
  };
  // Remember the routing props does not pass down to the component tree
  // so in this case inside the singular Post component you won't be able to find the
  // routing props. There will be no match, no location nor the history object with
  // all of the methods would be available inside the "Post" Component, if we want to
  // pass the routing props than you would need to pass it manually to the "Post" component
  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          // One way of routing with link there's also another way with the programmetic routing
          // <Link to={"/" + post.id} key={post.id}>
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            // One way of passing routing props to the Post Component
            // There's another way though
            // match={this.props.match}
            // {...this.props}
            clicked={() => this.postSelectedHandler(post.id)}
          />
          // </Link>
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        {/* Because this Posts component is a child of the Blog component and the Blog
        Component is wrapped by the BrowserRouter and that is the reason that we can even
        use Route here in this place. This is called as Nested Route. Below is the dynamic
        way of setting up the path*/}
        <Route
          path={this.props.match.url + "/:id"}
          // excat
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;
