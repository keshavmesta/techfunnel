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
    params: PropTypes.object
  }

  render() {
    const {topics} = this.props;
    // let refreshClassName = 'fa fa-refresh';
    const styles = require('./Topic.scss');
    return (
      <div className={styles.topic + ' container'}>
        {topics && topics.length &&
          topics.map((topic) => topic._id !== this.props.params.topicid ?
            <div key={topic._id}></div> :
          <div key={topic._id}>
              <h1>{topic.title}</h1>
              <Helmet title={topic.title}/>
              <div className={styles.dateScheduled}>Scheduled to go live on: {topic.dateScheduled}</div>
              <p className={styles.description}>{topic.description}</p>
              <div className={styles.speaker}>Posted by: <a href={'mailto:' + topic.speakerEmail}>{topic.speakerName}</a></div>
              <div className={styles.datePosted}>Posted on: {topic.datePosted}</div>
            </div>)}
      </div>
    );
  }
}
