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
    load: PropTypes.func.isRequired,
    params: PropTypes.object,
    saveUpvote: PropTypes.func.isRequired
  }

  render() {
    const handleUpvote = (topic) => {
      const {saveUpvote} = this.props;
      return () => saveUpvote(topic);
    };
    const eventName = this.props.params.event;
    const locationName = this.props.params.location;
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
        {this.props.params.event ? <div><Link to={`/topics/${this.props.params.location}`}>Go Back</Link></div> : <div><div><Link to={`/topics/${this.props.params.location}/XT Summit`}>XT Summit</Link></div><div><Link to={`/topics/${this.props.params.location}/Tech Friday`}>Tech Friday</Link></div></div>}
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
              (locationName ? locationName === topic.location : true) && (eventName ? eventName === topic.event : true) ?
              <tr key={topic._id}>
                <td className={styles.title}><Link to={`/topic/${topic.location}/${topic.event}/${topic._id}`}>{topic.title}</Link></td>
                <td className={styles.event}>{topic.event}</td>
                <td className={styles.location}>{topic.location}</td>
                <td className={styles.scheduledOn}>{topic.dateScheduled}</td>
                <td className={styles.postedBy}>{topic.speakerName}</td>
                <td className={styles.upVotes}>
                  <button className="btn btn-skyblue" onClick={handleUpvote(topic)}>
                    <i className="fa fa-thumbs-o-up"/> {topic.upVotes}
                  </button>
                </td>
              </tr> : null)
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
