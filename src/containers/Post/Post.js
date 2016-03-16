import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {TopicForm} from 'components';

@connect(
  () => ({}),
  {initialize})
export default class Post extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    window.alert('Data submitted! ' + JSON.stringify(data));
    this.props.initialize('post', {});
  }

  handleInitialize = () => {
    this.props.initialize('post', {
      title: 'Default title',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      name: 'Little Bobby Tables',
      oracleid: 'Redux Wizard',
      email: 'bobby@gmail.com',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      preferredDate: '2016-02-29'
    });
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
