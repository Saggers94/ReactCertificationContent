import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";

// This importing of axios is a global object while the other that
// we are using inside the blogjs file is a different instance
// Global configuration of the axios base url
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
// This is set by default anyway
axios.defaults.headers.post["Content-Type"] = "application/json";

// All axios requests globally would run this interceptors first and than only
// would go to the request
//you are blocking the axio request as you would need to return requestConfig in the
// interceptors of the axios
axios.interceptors.request.use(
  (request) => {
    console.log(request);
    //You can also edit the request config like you can add some
    // session header here
    return request;
  },
  (error) => {
    console.log(error);
    //this error is for sending the request like you don't have any
    // internet connectivity or something
    // this will forward the promise error to your local method and than to
    //the catch function of the promise
    return Promise.reject(error);
  }
);

//removing interceptors
// var myInterceptor = axios.interceptors.request.use(function () {
//   /*...*/
// });
// axios.interceptors.request.eject(myInterceptor);

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
