import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Auxilliary/Auxiliary";

const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    //but in the future this lifecycle method won't be supported anymore
    // and therefore we can use the constructor instead of this method
    //we had to use this as before the wrappedComponent that is bugerbuilder
    //load before that we would like to have the interceptors that
    //checks the requests sanity.
    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptors = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    // We have to unmount the interceptors as everytime this Higher Order Component
    //is called it would register same interceptors over and over so it is important
    //to unmount them every time we unmount the component
    componentWillUnmount() {
      console.log("will Unmount", this.reqInterceptors, this.resInterceptors);
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default WithErrorHandler;
