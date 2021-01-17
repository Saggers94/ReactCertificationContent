import React, { Component } from "react";
import Posts from "./Posts/Posts";
// import FullPost from "./FullPost/FullPost";

// import { Route, Link } from "react-router-dom";
// NavLink would give us some styling on the Links other than that it is the same as the Link
// and it will give the active route css automatically so prefer "NavLink" component
// from the react-router-dom
// Redirect component only can be used anywhere however you can't define "from" prop
// if you are not in the Switch component
import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import "./Blog.css";
// import NewPost from "./NewPost/NewPost";
import asyncComponent from "../../hoc/asyncComponent";
const AsyncNewPost = asyncComponent(() => {
  // these import function import the files dynamically
  //when we do the dynamic import webpack takes care of creating another
  //bundle that has the dynamic imported component and only when we route
  //to that dynamic component. this component will appear in our project
  //this method of loading as less component files as necessary for the user
  //is called as the lazyloading.
  return import("./NewPost/NewPost");
});

class Blog extends Component {
  state = { auth: false };
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                {/* If we would here use normal link than it would load the page like normal website.
              to stop that you would need to use the "Link" Component from the react-router-dom. */}
                {/* After adding the activeClassName. not the className that we provided in this props
                would be applied on it. not the default "active" class that the NavLink provides. right now
                i am setting it to the default but you can choose whatever class you want on this link */}
                <NavLink
                  // Use more specific route if you don't want to have merging routes that also
                  // merges their components
                  to="/posts"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#fa932f",
                    textDecoration: "underline",
                  }}
                >
                  Posts
                </NavLink>
              </li>
              <li>
                {/* Link would prevent default loading of "anchor" tag and than it would go to the specific
                    component that we have provided in the object */}
                {/* The search is a get query that we would run when this link would be clicked
                            and through hash you would be able to go to the certain element specific on the page with 
                            the given id which in this case is "#submit" */}
                <NavLink
                  to={{
                    // whatever path you choose if it is the relative path or it is the
                    //absolute path, it depends on what you want
                    // react-router-dom always work with the absolute path
                    //  example.com/posts/new-post
                    // if we omit "/posts" from the above path
                    // than this path "example.com/new-post" would
                    // be called as the absolute path
                    // But if you want to create a relative path than you would need
                    // to create by yourself dynamically like below
                    // this.props.match.url + "/new-post" (this would be the relative path as
                    // it is going to the first url path and than it is going to the "new-post"
                    // path)
                    //this.props.match.url gives the currently loading path

                    // If you want to append the path than you would need to use this approach
                    // pathname: this.props.match.url + "/new-post",
                    pathname: "/new-post",
                    hash: "#submit",
                    exact: true,
                    search: "?quick-submit=true",
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* This route component we get from the react-router dom. 
            but to get this we have to use "BrowserRouter" in the app.js file or 
            in the index.js file */}
        {/* Here the render props would render the returned jsx to the dom when this path
            would be called and if we use exact which is a boolean value that means match the path
            exactly as it is defined in the path prop */}
        {/* If the two path has similiar path and exact then the rendering of this jsx would get merged
            and it would have both Home and Home2 on the page */}
        {/* If path and exact are not similiar of two routes than the page would have the merged value
        however if there will be a path in the url which is not specified the route path prop than
        it would render the element that does not have the exact so in this case it would be the Home2 page 
        */}
        {/* Never do component rendering in the render props of the route because that would
            mess up your code. */}
        {/* <Route path="/" exact render={() => <h1>Home</h1>} />
        <Route path="/" render={() => <h1>Home2</h1>} /> */}
        {/*  */}
        {/* These Routes parse from the top to the bottom so be very careful in having the correct
            sequence that does not interfere with the other paths */}
        {/* All of these routes would render if they would match the path */}
        {/* Switch Component will look for the first route that matches to the given path
        and than stop looking afterwards */}
        {/* you can also mix and match by putting route outside of the switch that is still
            valid and it would work correctly */}
        {/* we are using the Posts component here but the Posts component also have their own route.
        Here we are using exact because of which only this Posts component does not go to look for the 
        Route available in the Posts Component. To take care of this issue we could remove the exact and
        than reorder the sequence of the route */}
        {/* <Route path="/" exact component={Posts} /> */}

        <Switch>
          {/* if the path would exactly match as a given path than it would come as true
            but in the below case if we would use "/new-post/2" than it would come as a false and will rerender the
            below given component as we haven't defined the exact. But still remember that sequencing
            still matter. " */}
          {/* ":id" means passing through a flexible variable */}

          {/* this below is called as guard in React */}
          {/* {this.state.auth ? ( */}
          <Route path="/new-post" component={AsyncNewPost} />
          {/* ) : null} */}
          <Route path="/posts" component={Posts} />
          {/* If you use this outside of Switch component than the "from" can't be satisfied */}
          {/* In this way you can handle 404 page error. However, There's also another one. */}
          {/* here the from which is a prefix so if you want to the route with no definition
          of path than this would not work as this below from would execute as it is there in
          the url any ways */}
          {/* <Redirect from="/" to="/posts" /> */}

          {/* In the below example we are not specifying the path because of which whenever
          there will be an unknown path in the url this below code will render.
          And you can also use component here too. */}
          <Route render={() => <h1>Not Found!</h1>} />

          {/* In this case we want to use the redirecting */}
          {/* <Route path="/" component={Posts} /> */}
          {/* <Route path="/:id" exact component={FullPost} /> */}
        </Switch>
        {/* These can be the other solution to take care of the multiple component getting
            merging but there's a better way. Use Switch Component*/}
        {/* <Route path="/posts/:id" exact component={FullPost} /> */}
      </div>
    );
  }
}

export default Blog;
