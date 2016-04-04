import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {TopicForm} from 'components';
import * as topicActions from 'redux/modules/topics';
import {Link} from 'react-router';

@connect(
  state => ({
    saveError: state.topics.saveError,
    user: state.auth.user
  }),
  {...topicActions, initialize})

export default class Post extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    user: PropTypes.object
  }

  handleSubmit = (data) => {
    // window.alert('Data submitted! ' + JSON.stringify(data));
    this.props.save(data);
    this.props.initialize('post', {});
    window.location.href = '/topics';
  }

  render() {
    const {user} = this.props;

    return (
      <div className="container">
        <h1>Post a Topic</h1>
        <Helmet title="Post a Topic"/>
        {user && <TopicForm onSubmit={this.handleSubmit}/>}
        {!user && <p>You need to <Link to="/login">login</Link> to post a topic!</p>}
      </div>
    );
  }
}
