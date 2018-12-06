import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Header, Image, Container } from 'semantic-ui-react';
import '/client/about.css';
import { Grid } from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';

export default class LogoAboutPage extends React.Component {
  render() {
    const gridStyle = { display: 'flex', height: '600px', alignItems: 'center' };
    return (
        <div className="about-background">
          <Container id="grad1" style={gridStyle}>
            <Container style={{ display: 'inline-block', width: '50%', textAlign: 'center', boxSizing: 'border-box' }}>
              <Header as="h1" style={{ fontSize: '50px' }} inverted>
                Our Mission
              </Header>
              <Header as="h3" style={{ paddingBottom: '100px', fontSize: '20px', ontStyle: 'italic', textAlign: 'center' }} inverted>
                To build and better understanding of our waste habits to discovers ways to innovate our campuses to make
                a greener Hawaiʻi.  We achieve this by easing the processes of collecting and visualizing waste audit
                data, increasing productivity at waste audits and enhancing the learning of those looking to make a
                difference.
              </Header>
            </Container>
          </Container>
        </div>
    );
  }
}
