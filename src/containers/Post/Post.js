import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {TopicForm} from 'components';
import * as topicActions from 'redux/modules/topics';

@connect(
  state => ({
    saveError: state.topics.saveError,
  }),
  {...topicActions, initialize})

export default class Post extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    // window.alert('Data submitted! ' + JSON.stringify(data));
    this.props.save(data);
    // this.props.initialize('post', {});
  }

  render() {
    return (
      <div className="container">
        <h1>Post a Topic</h1>
        <Helmet title="Post a Topic"/>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium sit amet lacus sed ullamcorper. Proin sed nisl nec neque mattis imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lobortis ullamcorper vulputate. Nam ultricies diam in justo efficitur, dictum scelerisque libero ullamcorper.</p>

        <TopicForm onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}
