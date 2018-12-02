import React from 'react';
import { Container, Header, Image } from 'semantic-ui-react';
import '/client/landing.css';

export default class About extends React.Component {
  render() {
    const gridStyle = { height: '400px', display: 'flex' };
    return (
        <div style={{ background: 'white', gridStyle, marginLeft: '10px', marginRight: '10px' }}>
          <Container style={{ textAlign: 'center', padding: '100px 0px 100px 0px', lineHeight: '1.7em' }}>
            <Header as="h1" style={{ fontSize: '40px' }}>What is a Trash Audit?</Header>
            <Header as="h3" style={{ fontSize: '25px' }}>A trash audit consists of sorting, categorizing and weighing waste, then
              recording and analyzing data. The audit
              targets specific types of waste (i.e. plastic utensils, disposable beverage containers) to enable a more
              targeted response from the UH community. </Header>
          </Container>
          <Container fluid style={{  }}>
            <Image src="https://lh3.googleusercontent.com/-1OrHC5XsHXA/W8isKqXFv_I/AAAAAAAAB6E/QTdFC4uutlUVQWx41TsmS95D5To3nXDRACJoC/w530-h353-n/pictofon-laptop-35.png" size="small" style={{ display: 'inline-block', width: '50%', boxSizing: 'border-box' }}/>
            <Container style={{ display: 'inline-block', width: '50%', boxSizing: 'border-box', margin: 'auto' }}>
            <Header as="h1">Get rid of pencil and paper!</Header>
            <Header as="h3">The input form features an easy-to-use interface to record the weight and volume of multiple bags.</Header>
            </Container>
          </Container>
          <Container fluid>
            <Image src="/images/highcharts.PNG" style={{ display: 'inline-block', width: '50%', boxSizing: 'border-box' }}/>
            <Container style={{ display: 'inline-block', width: '50%', boxSizing: 'border-box' }}>
            <Header as="h1">Turn data into insights</Header>
            <Header as="h3">Various graphs are used to help the user compare data results. The Oahu Waste Organizer saves you time by                       automatically producing the graphs for you. These charts are available for the community to view.</Header>
            </Container>
          </Container>
        </div>
    );
  }
}
