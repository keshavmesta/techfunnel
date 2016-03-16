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
  fields: ['title', 'description', 'name', 'oracleid', 'email', 'preferredDate', 'comments'],
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
      fields: {title, description, name, oracleid, email, preferredDate, comments},
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
          <p className={styles['form-sub-header']}>Topic Details:</p>
          {renderInput(title, 'Title')}
          {renderTextarea(description, 'Description', 10)}

          <p className={styles['form-sub-header']}>Speaker Details:</p>
          {renderInput(name, 'Full Name')}
          {renderInput(oracleid, 'Oracle ID')}
          {renderInput(email, 'Email', true)}

          <p className={styles['form-sub-header']}>We are already excited! When you shall be ready?</p>
          <div className="form-group">
            <label htmlFor="preferredDate" className="col-sm-2">Preferred Date</label>
            <div className="col-sm-8">
              <input type="date" className="form-control" id="preferredDate" {...preferredDate}/>
            </div>
          </div>

          {renderTextarea(comments, 'Comments', 3)}

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-primary" onClick={handleSubmit}>
                <i className="fa fa-paper-plane"/> Submit
              </button>
              <button className="btn btn-warning" onClick={resetForm} style={{marginLeft: 15}}>
                <i className="fa fa-undo"/> Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
