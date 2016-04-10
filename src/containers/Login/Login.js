import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import superagent from 'superagent';
import cookie from 'react-cookie';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  constructor() {
    super();
    this.state = {errorMessage: ''};
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    const that = this;

    function loginHandle(err, res) {
      if (res.body.success) {
        let now = new Date();
        let exp = new Date(now.getTime() + 900*1000);
        cookie.save('username', username.value, { path: '/', expires: exp });
        that.props.login(username.value, res.body.token);
      } else {
        password.value = '';
        username.value = '';
        that.setState({errorMessage: res.body.message});
      }
    }

    superagent
      .post('https://studioauth.sapient.com/apiv1/authenticate')
      .send({ username: username.value, password: password.value })
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .end(loginHandle);
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <h1>Login</h1>
        {!user &&
        <div>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="username" placeholder="NT ID" className="form-control"/>
            </div>
            <div className="form-group">
              <input type="password" ref="password" placeholder="Password" className="form-control"/>
            </div>
            <div className="form-group">
              <button className="btn btn-primary" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
              </button>
            </div>
          </form>
          <div className={styles.errorMessage}>{this.state.errorMessage}</div>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
