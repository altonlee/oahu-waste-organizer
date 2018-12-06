import React from 'react';
import { Container, Header, Image } from 'semantic-ui-react';
import '/client/about.css';

export default class AboutPage extends React.Component {
  render() {
    const gridStyle = { height: '400px', display: 'flex' };
    return (
        <div style={{ background: 'white', gridStyle, marginLeft: '10px', marginRight: '10px' }}>
          <Container style={{ textAlign: 'center', padding: '100px 0px 100px 0px', lineHeight: '1.7em' }}>
            <Header as="h1" style={{ fontSize: '40px' }}>Who Are We?</Header>
            <Header as="h3" style={{ fontSize: '20px' }}>
              The Oʻahu Waste Organizer waste audit management tool was first designed in the 2018 Hawaiʻi Annual Coding
              Challenge in cooperation with University of Manoa Office of Sustainability who presented the problems with
              conducting waste audits within the university. Our technically minded team used our knowledge to help
              address these issues to provide an easy way for people to conduct waste audits and get involved in taking
              care of our island.
            </Header>
          </Container>
          <Container fluid style={{}}>
            <Container style={{
              textAlign: 'center',
              width: '50%',
              boxSizing: 'border-box',
              margin: 'auto',
              paddingBottom: '100px'
            }}>
              <Header as="h1">Resources and Frameworks</Header>
              <Header as="h3">Built with Semantic UI, React, MongoDB, and Meteor</Header>
              <div class="ui small images">
                <Image src="https://react.semantic-ui.com/logo.png" size="tiny"/>
                <Image src="https://www.vectorlogo.zone/logos/reactjs/reactjs-card.png" size="tiny"/>
                <Image
                    src="https://cacm.acm.org/system/assets/0002/7119/042117_Theodo_MongoDB.large.jpg?1492791427&1492791427"
                    size="tiny"/>
                <Image src="https://d14jjfgstdxsoz.cloudfront.net/assets/og-image-logo.png" size="tiny"/>
              </div>
            </Container>
          </Container>
          <Container fluid>
            <Container style={{
              textAlign: 'center',
              width: '50%',
              boxSizing: 'border-box',
              margin: 'auto',
              paddingBottom: '100px'
            }}>
              <Header as="h1">Contact Us</Header>
              <Header as="h3">Alton Lee, Emily Pang, Jake Weber</Header>
              <Header as="h3"><a href="https://oahu-waste-organizer.github.io/">Oʻahu Waste Organizer</a></Header>
            </Container>
          </Container>
        </div>
    );
  }
}
