import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Header, Image, Container, Segment, Form, Message } from 'semantic-ui-react';
import '/client/landing.css';

/** A simple static component to render some text for the Home page. */
class Logo extends React.Component {
  render() {
    const gridStyle = { display: 'flex', height: '700px', alignItems: 'center' };
    return (
        <div className="landing-background">
          <Container id="grad1" style={gridStyle}>
            <Container style={{ display: 'inline-block', width: '50%', paddingTop: '50px', boxSizing: 'border-box' }}>
              <Image src="/images/logo.png" size='medium' style={{ margin: 'auto' }}/>
              <Header as="h1" style={{ padding: '10px 0 0 110px', fontSize: '50px' }} inverted>
                Oʻahu Waste Organizer
              </Header>
              <Header as="h3" style={{ paddingBottom: '100px', fontStyle: 'italic', textAlign: 'center' }} inverted>
                A clean, streamlined tool for data input and visualization
              </Header>
            </Container>
            <Container style={{ width: '50%' }}>
              {this.props.currentUser === '' ? (
                  [<Container style={{ display: 'inline-block', boxSizing: 'border-box' }}>
                    <Form>
                      <Segment raised style={{ width: 'calc(100% - 250px)', height: '300px', margin: 'auto' }}>
                        <Header style={{ textAlign: 'center', fontSize: '30px', paddingTop: '10px' }}>Sign In</Header>
                        <Form.Input
                            fluid
                            label="Email"
                            icon="user"
                            name="email"
                            type="email"
                            placeholder="E-mail address"
                        />
                        <Form.Input
                            fluid
                            label="Password"
                            icon="lock"
                            name="password"
                            placeholder="Password"
                            type="password"
                        />
                        <Form.Button content="Submit" color='green'/>
                      </Segment>
                    </Form>
                  </Container>,
                    <Container style={{ width: 'calc(100% - 250px)', margin: 'auto', paddingTop: '5px' }}>
                      <Message>
                        <Link to="/signup">Click here to Register</Link>
                      </Message>
                    </Container>]
              ) : ''}
            </Container>
          </Container>
        </div>
    );
  }
}

/** Declare the types of all properties. */
Logo.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const LogoContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Logo);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(LogoContainer);
