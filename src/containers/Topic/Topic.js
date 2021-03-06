import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as topicActions from 'redux/modules/topics';
import {isLoaded, load as loadTopics} from 'redux/modules/topics';
import connectData from 'helpers/connectData';
import { pushState } from 'redux-router';
import { createHistory, createMemoryHistory } from 'history';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadTopics());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    topics: state.topics.data.topics,
    upvotedTopics: state.topics.data.upvotedTopics,
    error: state.topics.error,
    user: state.auth.user
  }),
  {...topicActions, pushState })
export default class Topic extends Component {
  static propTypes = {
    topics: PropTypes.array,
    upvotedTopics: PropTypes.array,
    params: PropTypes.object,
    saveUpvote: PropTypes.func.isRequired,
    error: PropTypes.string,
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired
  }

  render() {
    const handleUpvote = (topic) => {
      const {saveUpvote, user} = this.props;
      if (user) {
        return () => saveUpvote(topic);
      }
      return () => this.props.pushState(null, '/login');
    };
    const {topics, upvotedTopics, error} = this.props;
    const styles = require('./Topic.scss');
    const param1 = this.props.params.param1;
    const eventName = this.props.params.event;
    const topicid = this.props.params.topicid;

    let currentIndex;
    let prevIndex;
    let nextIndex;
    const selectionTopics = topics.map((topic) => {
      if (topic.location === param1 && topic.event === eventName) {
        return topic._id;
      }
    });
    const thisSelectionTopics = selectionTopics.filter((topicId) => { return topicId !== undefined; });
    let history;
    if (typeof(window) !== 'undefined') {
      history = createHistory();
    } else {
      history = createMemoryHistory();
    }

    return (
      <div className={styles.topic + ' container'}>
        {topics && topics.length &&
          topics.map((topic) =>
          topic._id === topicid ?
          <div key={topic._id}>
              <span style={{display: 'none'}}> { currentIndex = thisSelectionTopics.indexOf(topic._id)}
               { prevIndex = currentIndex === 0 ? thisSelectionTopics.length - 1 : currentIndex - 1}
               { nextIndex = currentIndex === thisSelectionTopics.length - 1 ? 0 : currentIndex + 1}</span>
              <h1>{topic.title}</h1>
              <Helmet title={topic.title}/>
              {error && topicid &&
              <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                {' '}
                {error}
              </div>}
              <p className={styles.otherDetails}>by <a href={'mailto:' + topic.speakerEmail}>{topic.speakerName}</a> on {topic.dateScheduled} in {topic.event}</p>
              <p className={styles.description}>{topic.description}</p>
              <p className={styles.datePosted}>Posted on {new Date(topic.datePosted).getFullYear() + '-' + (new Date(topic.datePosted).getMonth() + 1) + '-' + new Date(topic.datePosted).getDate()}</p>
              <p className={styles.upVotes}>
                {upvotedTopics && upvotedTopics.indexOf(topic._id) >= 0 &&
                <button className="btn btn-disabled" title="You have already upvoted this topic">
                  <i className="fa fa-thumbs-up"/> {topic.upVotes > 0 && topic.upVotes}
                </button>}
                {upvotedTopics && upvotedTopics.indexOf(topic._id) === -1 &&
                <button className="btn btn-skyblue" onClick={handleUpvote(topic)}>
                  <i className="fa fa-thumbs-o-up"/>{topic.upVotes > 0 && topic.upVotes}
                </button>}
                {!upvotedTopics &&
                <button className="btn btn-skyblue" onClick={handleUpvote(topic)}>
                  <i className="fa fa-thumbs-o-up"/>{topic.upVotes > 0 && topic.upVotes}
                </button>}
              </p>
              <p className={styles.upVotes}>
                <button className="btn btn-skyblue" onClick={() => history.goBack()}>
                  <i className="fa fa-reply"></i> Go Back
                </button>
              </p>
              <p>
                <Link to={`/topics/${topic.location}/${topic.event}/${thisSelectionTopics[prevIndex]}`} className={styles.previous}><i className="fa fa-chevron-left"></i></Link>
                <Link to={`/topics/${topic.location}/${topic.event}/${thisSelectionTopics[nextIndex]}`} className={styles.next}><i className="fa fa-chevron-right"></i></Link>
              </p>
            </div> : null)}
      </div>
    );
  }
}
