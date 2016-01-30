import React, { Component } from 'react';
import config from '../../config';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./techfunnel-logo.png');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>{config.app.title}</h1>

            <h2>{config.app.description}</h2>

            <p className={styles.humility}>
              Created and maintained by <a href="mailto:techfridaycommittee@sapient.com">Tech Friday Committee</a>.
            </p>
          </div>
        </div>

        <div className="container">

          <h3>Hello, XT!</h3>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium sit amet lacus sed ullamcorper. Proin sed nisl nec neque mattis imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lobortis ullamcorper vulputate. Nam ultricies diam in justo efficitur, dictum scelerisque libero ullamcorper. Vivamus nec bibendum sem, vitae ultricies ex. Phasellus luctus vel diam in pellentesque. Integer vitae nunc leo. Fusce lacinia vitae leo a venenatis. Aliquam erat volutpat. Maecenas ullamcorper erat sit amet vestibulum suscipit. Aliquam feugiat eget lorem vitae facilisis. Donec consequat ut orci sit amet pharetra. Vivamus pretium ipsum nec magna ornare porta. Proin pretium sollicitudin imperdiet. Praesent eu volutpat nisl.</p>

          <ul>
          	<li>Proin sed nisl nec neque mattis imperdiet.</li>
          	<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          	<li>Aliquam lobortis ullamcorper vulputate.</li>
          	<li>Sed pretium sit amet lacus sed ullamcorper.</li>
          </ul>
        </div>
      </div>
    );
  }
}
