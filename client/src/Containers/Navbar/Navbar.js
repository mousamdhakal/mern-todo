import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import setAuthorizationToken from '../../utils/setAuthorizationToken';
import Header from '../Header/Header';
import './Navbar.css';
import Button from '../../Components/common/button';
import * as userActions from '../../actions/userActions';
import * as signActions from '../../actions/signActions';
import * as todosActions from '../../actions/todosActions';

class NavBar extends Component {
  logout = () => {
    setAuthorizationToken(false);
    localStorage.removeItem('jwtToken');
    this.props.removeUser();
    this.props.setLogout({
      message: 'Logout successful',
      status: 200,
    });
    this.props.setTodos([]);
    this.goTo('signin');
  };

  goTo = (link) => {
    const { history } = this.props;
    history.push(`/${link}`, null);
  };

  render() {
    const userLinks = (
      <>
        <Button className="user__button logout" onClick={() => this.logout()}>
          Log out
        </Button>
      </>
    );

    const guestLinks = (
      <>
        <Button
          className="user__button sign-up"
          onClick={() => this.goTo('signup')}
        >
          Sign-Up
        </Button>
        <Button
          className="user__button sign-in"
          onClick={() => this.goTo('signin')}
        >
          Sign-In
        </Button>
      </>
    );

    return (
      <Header>
        <div className="user__buttons">
          {this.props.isAuthenticated ? userLinks : guestLinks}
        </div>
      </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.user.isAuthenticated };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: () => {
      dispatch(userActions.removeUser());
    },
    setLogout: (message) => {
      dispatch(signActions.setSignIn(message));
    },
    setTodos: (todos) => {
      dispatch(todosActions.setTodos(todos));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
