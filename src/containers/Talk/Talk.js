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
export default class Talk extends Component {
  static propTypes = {
    topics: PropTypes.array,
    params: PropTypes.object
  }

  render() {
    const {topics} = this.props;
    // let refreshClassName = 'fa fa-refresh';
    const styles = require('./Talk.scss');
    return (
      <div className={styles.talk + ' container'}>
        <h1>
          {this.props.params.topicid}
        </h1>
        <Helmet title={this.props.params.topicid}/>
        {topics && topics.length &&
          topics.map((topic) => topic._id !== this.props.params.topicid ?
            <div key={topic._id}></div> :
          <div key={topic._id}>
              <div className={styles.idCol}>{topic._id}</div>
              <div className={styles.datePosted}>{topic.datePosted}</div>
              <h2 className={styles.title}>{topic.title}</h2>
              <h4 className={styles.speaker}>{topic.speakerName}</h4>
              <p className={styles.description}>{topic.description}</p>
              <div className={styles.talkDate}>{topic.dateScheduled}</div>
              <div className={styles.speakerEmail}>{topic.speakerEmail}</div>
            </div>)}
      </div>
    );
  }
}
