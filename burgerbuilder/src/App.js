import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch } from "react-router-dom";

export default class App extends Component {
  state = {
    show: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: false });
    }, 5000);
  }
  render() {
    return (
      <div>
        <Layout>
          {/* Here we are using switch just for practising purposes
          Switch would load only one of these Routes given below */}
          <Switch>
            <Route path="/checkout" exact component={Checkout} />
            {/* Here the only "/" without any word should be below
          because this would work as a prefix if we put it before the
          checkout and this case we won't need the Switch Component
          from the router */}
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}
