import React from 'react';
import { Header, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the Home page. */
class Home extends React.Component {
  render() {
    return (
        <div className="landing-background">
          <div className="trapezoid">
            <Image src="/images/logo.png" size='medium' centered/>
            <Header as="h1" inverted>Oʻahu Waste Organization</Header>
            <Header as="h3" inverted>
              A clean, streamlined tool for data input and visualization
            </Header>
          </div>
        </div>
    );
  }
}

export default Home;
