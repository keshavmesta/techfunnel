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
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={load}>
            <i className={refreshClassName}/> {' '} Reload Topics
          </button>
        </h1>
        <Helmet title="Topics"/>
        <p>
          If you hit refresh on your browser, the data loading will take place on the server before the page is returned.
          If you navigated here from another page, the data was fetched from the client after the route transition.
          This uses the static method <code>fetchDataDeferred</code>. To block a route transition until some data is loaded, use <code>fetchData</code>.
          To always render before loading data, even on the server, use <code>componentDidMount</code>.
        </p>
        <p>
          This topics are stored in your session, so feel free to edit it and refresh.
        </p>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}
        {topics && topics.length &&
        <table className="table table-striped">
          <thead>
          <tr>
            <th className={styles.idcol}>Title</th>
            <th className={styles.speakercol}>Posted By</th>
            <th className={styles.speakercol}>Posted On</th>
            <th className={styles.talkdatecol}>Scheduled On</th>
          </tr>
          </thead>
          <tbody>
          {
            topics.map((topic) =>
              <tr key={topic._id}>
                <td className={styles.titlecol}><Link to={`/topic/${topic._id}`}>{topic.title}</Link></td>
                <td className={styles.speakercol}>{topic.speakerName}</td>
                <td className={styles.datepostedcol}>{topic.datePosted}</td>
                <td className={styles.talkdatecol}>{topic.dateScheduled}</td>
              </tr>)
          }
          </tbody>
        </table>}
      </div>
    );
  }
}
