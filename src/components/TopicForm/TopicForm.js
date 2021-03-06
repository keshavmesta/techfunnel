import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import formValidation from './formValidation';

function asyncValidate(data) {
  // TODO: figure out a way to move this to the server. need an instance of ApiClient
  if (!data.email) {
    return Promise.resolve({});
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const errors = {};
      let valid = true;
      if (~['bobby@gmail.com', 'timmy@microsoft.com'].indexOf(data.email)) {
        errors.email = 'Email address already used';
        valid = false;
      }
      if (valid) {
        resolve();
      } else {
        reject(errors);
      }
    }, 1000);
  });
}

@reduxForm({
  form: 'post',
  fields: ['title', 'description', 'speakerMobile', 'dateScheduled', 'event', 'location', 'domain', 'tags'],
  validate: formValidation,
  asyncValidate,
  asyncBlurFields: ['email']
})
export default
class TopicForm extends Component {
  static propTypes = {
    asyncValidating: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  }

  render() {
    const {
      asyncValidating,
      fields: {title, description, speakerMobile, dateScheduled, event, location, domain, tags},
      handleSubmit,
      resetForm
    } = this.props;
    const styles = require('./TopicForm.scss');
    const renderInput = (field, label, showAsyncValidating) =>
    <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
    <label htmlFor={field.name} className="col-sm-2">{label}</label>
    <div className={'col-sm-8 ' + styles.inputGroup}>
    {showAsyncValidating && asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/>}
    <input type="text" className="form-control" id={field.name} {...field}/>
    {field.error && field.touched && <div className="text-danger">{field.error}</div>}
    </div>
    </div>;
    const renderTextarea = (field, label, rows) =>
    <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
    <label htmlFor={field.name} className="col-sm-2">{label}</label>
    <div className={'col-sm-8 ' + styles.inputGroup}>
    <textarea className="form-control" rows={rows} id={field.name} {...field}></textarea>
    {field.error && field.touched && <div className="text-danger">{field.error}</div>}
    </div>
    </div>;

    return (
      <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>

      <div className={'form-group' + (event.error && event.touched ? ' has-error' : '')}>
      <label className="col-sm-2">Event</label>
      <div className="col-sm-8">
      <input type="radio" id="event-techfriday" {...event} value="Tech Friday" checked={event.value === 'Tech Friday'}/>
      <label htmlFor="event-techfriday" className={styles.radioLabel}>Tech Friday</label>
      <input type="radio" id="event-xtsummit" {...event} value="XT Summit" checked={event.value === 'XT Summit'}/>
      <label htmlFor="event-xtsummit" className={styles.radioLabel}>XT Summit</label>
      {event.error && event.touched && <div className="text-danger">{event.error}</div>}
      </div>
      </div>
      <div className={'form-group' + (location.error && location.touched ? ' has-error' : '')}>
      <label htmlFor="location" className="col-sm-2">Location</label>
      <div className="col-sm-8">
      <select id="location" className="form-control" {...location}>
      <option defaultValue>Select location</option>
      <option>Bangalore</option>
      <option>Gurgaon</option>
      <option>Noida</option>
      </select>
      {location.error && location.touched && <div className="text-danger">{location.error}</div>}
      </div>
      </div>
      {renderInput(title, 'Title')}
      <div className={'form-group' + (domain.error && domain.touched ? ' has-error' : '')}>
      <label htmlFor="domain" className="col-sm-2">Domain</label>
      <div className="col-sm-8">
      <select id="domain" className="form-control" {...domain}>
      <option defaultValue>Select Domain</option>
      <option>Big Data</option>
      <option>IOT</option>
      <option>Mobility</option>
      <option>Virtual Reality</option>
      <option>Wearables</option>
      <option>Machine Learnign</option>
      </select>
      {domain.error && domain.touched && <div className="text-danger">{domain.error}</div>}
      </div>
      </div>
      {renderTextarea(description, 'Description', 10)}
      {renderInput(tags, 'Tags')}
      <div className="form-group">
      <label htmlFor="dateScheduled" className="col-sm-2">Preferred Date</label>
      <div className="col-sm-8">
      <input type="date" className="form-control" id="dateScheduled" {...dateScheduled}/>
      </div>
      </div>

      {renderInput(speakerMobile, 'Mobile #', true)}

      <div className="form-group">
      <div className="col-sm-offset-2 col-sm-10">
      <button className="btn btn-primary" onClick={handleSubmit}>
      <i className="fa fa-paper-plane"/> Submit
      </button>
      <button className="btn btn-default" onClick={resetForm} style={{marginLeft: 15}}>
      <i className="fa fa-undo"/> Reset
      </button>
      </div>
      </div>
      </form>
      </div>
    );
  }
}
