import React from 'react';
import { Header } from 'semantic-ui-react';

/** A simple static component to render some text for the Home page. */
class About extends React.Component {
  render() {
    return (
        <div className="about-background">
          <div className="about-text">
            <Header as="about-title">What is Trash Auditing?</Header>
          </div>
        </div>
    );
  }
}

export default About;
