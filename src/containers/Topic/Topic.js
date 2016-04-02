import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as topicActions from 'redux/modules/topics';
import {isLoaded, load as loadTopics} from 'redux/modules/topics';
import connectData from 'helpers/connectData';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadTopics());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    topics: state.topics.data
  }),
  {...topicActions })
export default class Topic extends Component {
  static propTypes = {
    topics: PropTypes.array,
    params: PropTypes.object,
    saveUpvote: PropTypes.func.isRequired
  }

  render() {
    const handleUpvote = (topic) => {
      const {saveUpvote} = this.props;
      return () => saveUpvote(topic);
    };
    const {topics} = this.props;
    const styles = require('./Topic.scss');
    const eventName = this.props.params.event;
    const locationName = this.props.params.location;
    let currentIndex;
    let prevIndex;
    let nextIndex;
    const selectionTopics = topics.map((topic) => {
      if (topic.location === locationName && topic.event === eventName) {
        return topic._id;
      }
    });
    const thisSelectionTopics = selectionTopics.filter((topicId) => { return topicId !== undefined; });
    return (
      <div className={styles.topic + ' container'}>
        <div><Link to={`/topics/${this.props.params.location}/${this.props.params.event}`}>Go Back</Link></div>
        {topics && topics.length &&
          topics.map((topic) =>
          topic._id === this.props.params.topicid ?
          <div key={topic._id}>
             <span style={{display: 'none'}}> { currentIndex = thisSelectionTopics.indexOf(topic._id)}
               { prevIndex = currentIndex === 0 ? thisSelectionTopics.length - 1 : currentIndex - 1}
               { nextIndex = currentIndex === thisSelectionTopics.length - 1 ? 0 : currentIndex + 1}</span>
              <span><Link to={`/topic/${topic.location}/${topic.event}/${thisSelectionTopics[prevIndex]}`}>Previous Topic</Link></span>
              <h1>{topic.title}</h1>
              <span><Link to={`/topic/${topic.location}/${topic.event}/${thisSelectionTopics[nextIndex]}`}>Next Topic</Link></span>
              <Helmet title={topic.title}/>
              <p className={styles.otherDetails}>by <a href={'mailto:' + topic.speakerEmail}>{topic.speakerName}</a> on {topic.dateScheduled} in {topic.event}</p>
              <p className={styles.description}>{topic.description}</p>
              <p className={styles.datePosted}>Posted on {new Date(topic.datePosted).getFullYear() + '-' + (new Date(topic.datePosted).getMonth() + 1) + '-' + new Date(topic.datePosted).getDate()}</p>
              <p className={styles.upVotes}>
                <button className="btn btn-skyblue" onClick={handleUpvote(topic)}>
                  <i className="fa fa-thumbs-o-up"/> {topic.upVotes}
                </button>
              </p>
            </div> : null)}
      </div>
    );
  }
}
