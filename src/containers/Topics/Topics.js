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
    topics: state.topics.data,
    error: state.topics.error,
    loading: state.topics.loading
  }),
  {...topicActions })
export default class Topics extends Component {
  static propTypes = {
    topics: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired
  }

  render() {
    const {topics, error, loading, load} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Topics.scss');
    return (
      <div className={styles.topics + ' container'}>
        <h1>
          Topics
        </h1>
        <Helmet title="Topics"/>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}
        {topics && topics.length &&
        <table className="table">
          <thead>
          <tr>
            <th className={styles.title}>Title</th>
            <th className={styles.event}>Event</th>
            <th className={styles.location}>Location</th>
            <th className={styles.scheduledOn}>Scheduled On</th>
            <th className={styles.postedBy}>Posted By</th>
            <th className={styles.upVotes}> Upvotes</th>
          </tr>
          </thead>
          <tbody>
          {
            topics.map((topic) =>
              <tr key={topic._id}>
                <td className={styles.title}><Link to={`/topic/${topic._id}`}>{topic.title}</Link></td>
                <td className={styles.event}>{topic.event}</td>
                <td className={styles.location}>{topic.location}</td>
                <td className={styles.scheduledOn}>{topic.dateScheduled}</td>
                <td className={styles.postedBy}>{topic.speakerName}</td>
                <td className={styles.upVotes}><a href="#">Upvote | {topic.upVotes}</a></td>
              </tr>)
          }
          </tbody>
        </table>}
        <button className={styles.refreshBtn + ' btn btn-primary'} onClick={load}>
          <i className={refreshClassName}/> {' '} Reload Topics
        </button>
      </div>
    );
  }
}
