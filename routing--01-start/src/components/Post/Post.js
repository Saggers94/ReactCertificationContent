import React from "react";

// Another way of fetching the router props is with the "withRouter"
// Component which is the higher component and by wrapping it through
// this component you would be able to have the router props

// import { withRouter } from "react-router-dom";

import "./Post.css";

const post = (props) => (
  <article className="Post" onClick={props.clicked}>
    <h1>{props.title}</h1>
    <div className="Info">
      <div className="Author">{props.author}</div>
    </div>
  </article>
);
export default post;
// export default withRouter(post);
