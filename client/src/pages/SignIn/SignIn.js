import React from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import '../../styles/userForm.css';
import { loginUser } from '../../services/http';
import * as userActions from '../../actions/userActions';
import * as signActions from '../../actions/signActions';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import NavBar from '../../Containers/Navbar/Navbar';

function SignIn() {
  let history = useHistory();
  let message = useSelector((state) => state.sign.signInMessage);
  const dispatch = useDispatch();
  dispatch(signActions.setSignUp(null));

  const handleSignIn = (data) => {
    loginUser(data, onSuccess, onFailure);
  };

  const onSuccess = (data) => {
    if (data.status === 200) {
      localStorage.setItem('jwtToken', data.token);
      setAuthorizationToken(data.token);
      dispatch(userActions.setUser(data.data));
      dispatch(signActions.setSignIn(data));
      history.push('/dashboard');
    }
  };

  const onFailure = (data) => {
    dispatch(signActions.setSignIn(data));
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: (values) => {
      handleSignIn(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <NavBar />
      <div>
        <div className="container">
          <form className="user-form" onSubmit={formik.handleSubmit}>
            <h2 className="user-form__heading">Sign In</h2>
            {message ? (
              <div
                className={`server-message ${
                  message.status === 200
                    ? 'server-message--success'
                    : 'server-message--failure'
                }`}
              >
                <p className="server-message__text">{message.message}</p>
              </div>
            ) : null}
            <label className="user-form__label" htmlFor="email">
              <b>Email</b>
            </label>
            <input
              id="email"
              className="user-form__input"
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email || ''}
              required
            />

            <label className="user-form__label" htmlFor="password">
              <b>Password</b>
            </label>
            <input
              className="user-form__input"
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password || ''}
              required
            />
            <input
              className="user-form__submit"
              type="submit"
              value="Sign In"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
