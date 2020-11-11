import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default function (ComposedComponent) {
  class UnAuthenticatedCheck extends Component {
    constructor(props) {
      super(props);
      this.checkAuthenticated();
    }

    checkAuthenticated = () => {
      if (this.props.isAuthenticated) {
        const { history } = this.props;
        history.push(`/dashboard`, null);
      }
    };

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    return { isAuthenticated: state.user.isAuthenticated };
  };

  return connect(mapStateToProps)(withRouter(UnAuthenticatedCheck));
}
