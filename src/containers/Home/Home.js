import React, { Component, PropTypes } from 'react';
import config from '../../config';
import {isLoaded, load as loadTopics} from 'redux/modules/topics';
import Helmet from 'react-helmet';
import connectData from 'helpers/connectData';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as topicActions from 'redux/modules/topics';
import {Col} from 'react-bootstrap';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadTopics());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    topics: state.topics.data.topics,
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
      const topicsClone = topics.slice(0).reverse();
      const styles = require('./Home.scss');
      // require the image both from client and server
      const xtBanner = require('./home-banner.jpg');

      return (
        <div className={styles.home}>
          <Helmet title="Home"/>
          <div className={styles.masthead}>
          <div className="container">
          <h1>{config.app.title}</h1>

          <h2>{config.app.description}</h2>
          </div>
          </div>
          <div><img src={xtBanner} alt="XT Banner"/></div>
          <section className={styles.homeMain}>
            <div className="container">
              <div className={styles.hotTopicsContainer}>
                <h2>Trending Topics</h2>
                {
                  topicsClone.splice(0, 3).map(function cbi(topic) {
                    return (<div key={topic._id} className={styles.hotTopicGrid}><h4><Link to={`/topic/${topic.location}/${topic.event}/${topic._id}`}>{topic.title}</Link></h4><p>{topic.description.length > 175 ? (topic.description.substring(0, 175) + '...') : (topic.description)}</p></div>);
                  })
                }
                {
                sortedArray.splice(0, 3).map(function cb(upVote) {
                  return topics.map(function cbinner(topic) {
                    return (topic.upVotes === upVote ? <div key={topic._id} className={styles.hotTopicGrid}><h4><Link to={`/topic/${topic.location}/${topic.event}/${topic._id}`}>{topic.title}</Link></h4><p>{topic.description.length > 175 ? (topic.description.substring(0, 175) + '...') : (topic.description)}</p></div> : null);
                  });
                })
                }
              </div>
              <Col xs={12} sm={6} className={styles.topicsByLocationsContainer}>
                <h2>Topics by locations</h2>
                <ul>
                  { Object.keys(myLocationArray).map(function outercb(location) {
                    return <li key={location}><Link to={`/topics/${location}`}>{location} <i className="fa fa-external-link" aria-hidden="true"></i></Link></li>;
                  })
                  }
                </ul>
              </Col>
              <Col xs={12} sm={6} className={styles.topicsByEventsContainer}>
                <h2>Topics by events</h2>
                <ul>
                  { Object.keys(myEventArray).map(function cb(event) {
                    return <li key={event}><Link to={`/topics/${event}`}>{event} <i className="fa fa-external-link" aria-hidden="true"></i></Link></li>;
                  })
                  }
                </ul>
              </Col>
            </div>
          </section>
        </div>
      );
    }
  }
