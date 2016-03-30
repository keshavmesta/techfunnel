import React, { Component, PropTypes } from 'react';
import config from '../../config';
import {isLoaded, load as loadTopics} from 'redux/modules/topics';
import Helmet from 'react-helmet';
import connectData from 'helpers/connectData';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as topicActions from 'redux/modules/topics';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadTopics());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    topics: state.topics.data,
    error: state.topics.error,
    loading: state.topics.loading
  }),
  {...topicActions })
export default class Home extends Component {
  static propTypes = {
    topics: PropTypes.array
  }
    render() {
      // Object.prototype.map = Array.prototype.map;
      const {topics} = this.props;
      const myEventArray = {};
      const myLocationArray = {};
      const upvotesArray = [];
      topics.map(function cb(topic) {
        if (!myEventArray.hasOwnProperty(topic.event)) {
          myEventArray[topic.event] = true;
        }
        if (!myLocationArray.hasOwnProperty(topic.location)) {
          myLocationArray[topic.location] = true;
        }
        upvotesArray.push(topic.upVotes);
      });
      const sortedArray = upvotesArray.sort(function cb(firstNumber, secondNumber) {return secondNumber - firstNumber;});
      const styles = require('./Home.scss');
      // require the logo image both from client and server
      const logoImage = require('./logo.png');
      return (
        <div className={styles.home}>
        <Helmet title="Home"/>
        <div className={styles.masthead}>
        <div className="container">
        <div className={styles.logo}>
        <p>
        <img src={logoImage}/>
        </p>
        </div>
        <h1>{config.app.title}</h1>

        <h2>{config.app.description}</h2>

        <p className={styles.humility}>
        Created and maintained by <a href="mailto:techfridaycommittee@sapient.com">Tech Friday Committee</a>.
        </p>
        </div>
        </div>
        <section className={styles.counterContainer}>
        <h2>All our events</h2>
        { Object.keys(myLocationArray).map(function outercb(location) {
          return Object.keys(myEventArray).map(function cb(newitem) {
            return <div key={newitem + location}><Link to={`/topics/${newitem + '-' + location}`}>{newitem + '-' + location}</Link></div>;
          });
        })
      }</section>
      <section className={styles.counterContainer}>
      <h2>Hot Topics</h2>
      {
        sortedArray.splice(0, 2).map(function cb(upVote) {
          return topics.map(function cbinner(topic) {
            return (topic.upVotes === upVote ? <div><Link to={`/topic/${topic.event + '-' + topic.location}/${topic._id}`}>{topic.title}</Link></div> : null);
          });
        })
      }</section>
        </div>
      );
    }
  }
