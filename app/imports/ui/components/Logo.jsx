import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Header, Image, Container, Segment, Form, Message } from 'semantic-ui-react';
import '/client/landing.css';
import { Grid } from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';

/** A simple static component to render some text for the Home page. */
class Logo extends React.Component {
  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  handleSubmit() {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  render() {
    const gridStyle = { display: 'flex', height: '680px', alignItems: 'center' };
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
                    <Form onSubmit={this.handleSubmit}>
                      <Segment raised style={{ width: 'calc(100% - 250px)', height: '300px', margin: 'auto' }}>
                        <Header style={{ textAlign: 'center', fontSize: '30px', paddingTop: '10px' }}>Sign In</Header>
                        <Form.Input
                                    fluid
                                    label="Email"
                                    icon="user"
                                    name="email"
                                    type="email"
                                    placeholder="E-mail address"
                                    onChange={this.handleChange}
                        />
                        <Form.Input
                            fluid
                            label="Password"
                            icon="lock"
                            name="password"
                            placeholder="Password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <Form.Button content="Submit" color='green'/>
                      </Segment>
                    </Form>
                  </Container>,
                    <Container style={{ width: 'calc(100% - 250px)', margin: 'auto', paddingTop: '5px' }}>
                      <Message>
                        <Link to="/signup">Click here to Register</Link>
                      </Message>
                      {this.state.error === '' ? (
                          ''
                      ) : (
                          <Message
                              error
                              header="Login was not successful"
                              content={this.state.error}
                          />
                      )}
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
  location: PropTypes.object,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const LogoContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Logo);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(LogoContainer);
