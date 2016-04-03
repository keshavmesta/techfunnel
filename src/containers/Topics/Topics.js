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
    loading: state.topics.loading,
    locationDirection: 1,
    eventDirection: 1
  }),
  {...topicActions })
export default class Topics extends Component {
  static propTypes = {
    topics: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired,
    params: PropTypes.object,
    saveUpvote: PropTypes.func.isRequired,
    locationDirection: PropTypes.number,
    eventDirection: PropTypes.number
  }

  sortTopicsByLocation = (event) => {
    event.preventDefault();
    if (!!this.state && !!this.state.locationDirection) {
      this.sortTopicsState('location', this.props.topics, this.state.locationDirection);
    } else {
      this.sortTopicsState('location', this.props.topics, this.props.locationDirection);
    }
  };

  sortTopicsByEvent = (event) => {
    event.preventDefault();
    if (!!this.state && !!this.state.eventDirection) {
      this.sortTopicsState('event', this.props.topics, this.state.eventDirection);
    } else {
      this.sortTopicsState('event', this.props.topics, this.props.eventDirection);
    }
  };

  sortTopicsState = (field, topics, direction) => {
    // Sorting ...
    topics.sort( (topic1, topic2) => {
      if (topic1[field].toLowerCase() > topic2[field].toLowerCase()) {
        return -direction;
      }
      if (topic1[field].toLowerCase() < topic2[field].toLowerCase()) {
        return direction;
      }
      return 0;
    });

    // Change state
    if (field === 'location') {
      this.setState({topics: topics, 'locationDirection': -direction, 'eventDirection': 1});
    } else if (field === 'event') {
      this.setState({topics: topics, 'locationDirection': 1, 'eventDirection': -direction});
    }
  };

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
        {this.props.params.event ? <div><Link to={`/topics/${this.props.params.location}`}>Go Back</Link></div> : <div><div>Filter By: <Link to={`/topics/${this.props.params.location}/XT Summit`}>XT Summit</Link> | <Link to={`/topics/${this.props.params.location}/Tech Friday`}>Tech Friday</Link></div></div>}
        {topics && topics.length &&
        <table className="table">
          <thead>
          <tr>
            <th className={styles.title}>Title</th>
            <th className={styles.event}><a href="" onClick={this.sortTopicsByEvent}>Event<span style={{marginLeft: '5px'}} className="fa fa-sort"></span></a></th>
            <th className={styles.location}><a href="" onClick={this.sortTopicsByLocation}>Location<span style={{marginLeft: '5px'}} className="fa fa-sort"></span></a></th>
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
