import React from 'react';
import { Container, Header, Image } from 'semantic-ui-react';
import '/client/landing.css';

export default class About extends React.Component {
  render() {
    const gridStyle = { height: '400px', display: 'flex' };
    return (
        <div style={{ background: 'white', gridStyle, marginLeft: '10px', marginRight: '10px' }}>
          <Container style={{ textAlign: 'center', padding: '75px 0px 25px 0px', lineHeight: '1.7em' }}>
            <Header as="h1" style={{ fontSize: '40px' }}>What is a Trash Audit?</Header>
            <Header as="h3" style={{ fontSize: '25px' }}>
              A trash audit is an analysis of our waste to identify the changes needed to build a sustainable future. By
              sorting, categorizing, and weighing our trash, we are able to visualize the scope of our waste habits and
              their impact on the environment.
            </Header>
          </Container>
          <Container fluid style={{}}>
            <Image src="/images/landing-laptop.png"/>
            <Image
                src="/images/landing-laptop-2.png"
                size="small" style={{ display: 'inline-block', width: '50%', boxSizing: 'border-box' }}/>
            <Container style={{ display: 'inline-block', width: '50%', boxSizing: 'border-box', margin: 'auto' }}>
              <Header as="h1">Get rid of pencil and paper!</Header>
              <Header as="h3">The input form features an easy-to-use interface to record the category, type, weight, and
                volume of
                multiple bags of trash.</Header>
            </Container>
          </Container>
          <Container fluid>
            <Image src="/images/highcharts.PNG"
                   style={{ display: 'inline-block', width: '50%', boxSizing: 'border-box' }}/>
            <Container style={{ display: 'inline-block', width: '50%', boxSizing: 'border-box' }}>
              <Header as="h1">Turn data into insights</Header>
              <Header as="h3"> The Oahu Waste Organizer automatically produces graphs and charts that allow you to
                observe and compare various information from every waste audit, giving people and in depth as well as an
                overarching view of our waste habits on UH campuses.
              </Header>
            </Container>
          </Container>
        </div>
    );
  }
}
