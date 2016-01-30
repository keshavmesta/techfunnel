import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as topicActions from 'redux/modules/topics';
import {isLoaded, load as loadTopics} from 'redux/modules/topics';
import {initializeWithKey} from 'redux-form';
import connectData from 'helpers/connectData';
import { TopicForm } from 'components';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadTopics());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    topics: state.topics.data,
    editing: state.topics.editing,
    error: state.topics.error,
    loading: state.topics.loading
  }),
  {...topicActions, initializeWithKey })
export default class Topics extends Component {
  static propTypes = {
    topics: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
  }

  render() {
    const handleEdit = (topic) => {
      const {editStart} = this.props; // eslint-disable-line no-shadow
      return () => editStart(String(topic.id));
    };
    const {topics, error, editing, loading, load} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Topics.scss');
    return (
      <div className={styles.topics + ' container'}>
        <h1>
          Topics
          <button className={styles.refreshBtn + ' btn btn-primary'} onClick={load}>
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
            <th className={styles.idCol}>ID</th>
            <th className={styles.colorCol}>Color</th>
            <th className={styles.sprocketsCol}>Sprockets</th>
            <th className={styles.ownerCol}>Owner</th>
            <th className={styles.buttonCol}></th>
          </tr>
          </thead>
          <tbody>
          {
            topics.map((topic) => editing[topic.id] ?
              <TopicForm formKey={String(topic.id)} key={String(topic.id)} initialValues={topic}/> :
              <tr key={topic.id}>
                <td className={styles.idCol}>{topic.id}</td>
                <td className={styles.colorCol}>{topic.color}</td>
                <td className={styles.sprocketsCol}>{topic.sprocketCount}</td>
                <td className={styles.ownerCol}>{topic.owner}</td>
                <td className={styles.buttonCol}>
                  <button className="btn btn-primary" onClick={handleEdit(topic)}>
                    <i className="fa fa-pencil"/> Edit
                  </button>
                </td>
              </tr>)
          }
          </tbody>
        </table>}
      </div>
    );
  }
}

