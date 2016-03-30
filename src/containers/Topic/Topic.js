import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
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
    return (
      <div className={styles.topic + ' container'}>
        {topics && topics.length &&
          topics.map((topic) => topic._id !== this.props.params.topicid ?
            <div key={topic._id}></div> :
          <div key={topic._id}>
              <h1>{topic.title}</h1>
              <Helmet title={topic.title}/>
              <p className={styles.otherDetails}>by <a href={'mailto:' + topic.speakerEmail}>{topic.speakerName}</a> on {topic.dateScheduled} in {topic.event}</p>
              <p className={styles.description}>{topic.description}</p>
              <p className={styles.datePosted}>Posted on {new Date(topic.datePosted).getFullYear() + '-' + (new Date(topic.datePosted).getMonth() + 1) + '-' + new Date(topic.datePosted).getDate()}</p>
              <p className={styles.upVotes}>
                <button className="btn btn-skyblue" onClick={handleUpvote(topic)}>
                  <i className="fa fa-thumbs-o-up"/> {topic.upVotes}
                </button>
              </p>
            </div>)}
      </div>
    );
  }
}
