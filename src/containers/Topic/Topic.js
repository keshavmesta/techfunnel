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
    params: PropTypes.object
  }

  render() {
    const {topics} = this.props;
    const styles = require('./Topic.scss');
    return (
      <div className={styles.topic + ' container'}>
        <div><Link to={`/topics/${this.props.params.selection}`}>Go Back</Link></div>
        {topics && topics.length &&
          topics.map((topic) =>
          topic._id === this.props.params.topicid ?
          <div key={topic._id}>
              <h1>{topic.title}</h1>
              <Helmet title={topic.title}/>
              <p className={styles.otherDetails}>by <a href={'mailto:' + topic.speakerEmail}>{topic.speakerName}</a> on {topic.dateScheduled} in {topic.event}</p>
              <p className={styles.description}>{topic.description}</p>
              <p className={styles.datePosted}>Posted on {new Date(topic.datePosted).getFullYear() + '-' + (new Date(topic.datePosted).getMonth() + 1) + '-' + new Date(topic.datePosted).getDate()}</p>
              <p className={styles.upVotes}><a href="#">Upvote | {topic.upVotes}</a></p>
            </div> : null)}
      </div>
    );
  }
}
