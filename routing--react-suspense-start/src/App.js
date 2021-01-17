import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";

// import Posts from "./containers/Posts";
import User from "./containers/User";
import Welcome from "./containers/Welcome";

// lazy loading is nothing but the async rendering of the component

// lazy method did come with the react 16.6 and this does the
// same thing as the asyncComponent that we have built for the
// lazyloading with the dynamic import

//Whenever we use dynamic import make sure that in the file you would
//use the default export
const Posts = React.lazy(() => import("./containers/Posts"));

class App extends Component {
  state = { showPosts: false };
  modeHandler = () => {
    this.setState((prevState) => {
      return { showPosts: !prevState.showPosts };
    });
  };
  render() {
    return (
      <React.Fragment>
        <button onClick={this.modeHandler}>Toggle Mode</button>
        {this.state.showPosts ? (
          <Suspense fallback={<div>Loadin...</div>}>
            <Posts />
          </Suspense>
        ) : (
          <User />
        )}
      </React.Fragment>
      // the default server is already configured for the routing but the
      // server on which you host is not. for that you have to consider the
      // basename or you can use the file "_redirects" which has
      // "*/ index.html 200"
      // whenever you are serving your application from the base directory
      // make sure that you change base name
      // <BrowserRouter basename="/my-app">
      //   <React.Fragment>
      //     <nav>
      //       <NavLink to="/user">User Page</NavLink> |&nbsp;
      //       <NavLink to="/posts">Posts Page</NavLink>
      //     </nav>
      //     <Route path="/" component={Welcome} exact />
      //     <Route path="/user" component={User} />
      //     <Route
      //       path="/posts"
      //       render={() => (
      //         <Suspense fallback={<div>Loading...</div>}>
      //           <Posts />
      //         </Suspense>
      //       )}
      //     />
      //   </React.Fragment>
      // </BrowserRouter>
    );
  }
}

export default App;
