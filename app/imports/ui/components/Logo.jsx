import React from 'react';
import { Header, Image, Container, Segment, Form, Message } from 'semantic-ui-react';
import '/client/landing.css';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the Home page. */
export default class Logo extends React.Component {
  render() {
    const gridStyle = { display: 'flex', height: '700px', alignItems: 'center' };
    return (
        <div className="landing-background">
          <Container id="grad1" style={ gridStyle }>
            <Container style={{ display: 'inline-block', width: '50%', paddingTop: '50px', boxSizing: 'border-box' }}>
              <Image src="/images/logo.png" size='medium' style={{ margin: 'auto' }}/>
              <Header as="h1" style={{ padding: '10px 0 0 110px', fontSize: '50px' }} inverted >Oʻahu Waste Organizer</Header>
              <Header as="h3" style={{ paddingBottom: '100px', fontStyle: 'italic', textAlign: 'center' }} inverted>
                A clean, streamlined tool for data input and visualization
              </Header>
            </Container>
            <Container style={{ display: 'inline-block', width: '50%', boxSizing: 'border-box' }}>
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
              <div style={{ width: 'calc(100% - 250px)', margin: 'auto', paddingTop: '5px' }}>
              <Message>
                <Link to="/signup">Click here to Register</Link>
              </Message>
              </div>
            </Container>
          </Container>
        </div>
    );
  }
}
