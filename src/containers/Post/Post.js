import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {TopicForm} from 'components';
import * as topicActions from 'redux/modules/topics';
import {Link} from 'react-router';
import { pushState } from 'redux-router';

@connect(
  state => ({
    saveError: state.topics.saveError,
    user: state.auth.user
  }),
  {...topicActions, initialize, pushState})

export default class Post extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    user: PropTypes.object,
    saveError: PropTypes.bool,
    pushState: PropTypes.func.isRequired,
  }

  handleSubmit = (data) => {
    // window.alert('Data submitted! ' + JSON.stringify(data));
    this.props.save(data);
    if (!this.props.saveError) {
      this.props.initialize('post', {});
      this.props.pushState(null, '/topics');
    }
  }

  render() {
    const {user, saveError} = this.props;

    return (
      <div className="container">
        <h1>Post a Topic</h1>
        <Helmet title="Post a Topic"/>
        {saveError &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {saveError}
        </div>}
        {user && <TopicForm onSubmit={this.handleSubmit}/>}
        {!user && <p>You need to <Link to="/login">login</Link> to post a topic!</p>}
      </div>
    );
  }
}
