import React from 'react';
import { Header, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the Home page. */
class About extends React.Component {
  render() {
    return (
        <div className="about-background">
          <div className="about-text">
            <Header as="h1" inverted>What is Trash Auditing?</Header>
            <Header as="h3" inverted>A trash audit consists of sorting, categorizing and weighing waste, then
              recording and analyzing data. The audit
              targets specific types of waste (i.e. plastic utensils, disposable beverage containers) to enable a more
              targeted response from the UH community.</Header>
          </div>
          <div className="about-rest">
            <div className="about-rest-text">
              <Header as="h2">Impact</Header>
              <p>
                For most people, trash is something better left out of sight and out of mind. However, waste habits have
                fiscal
                and environmental consequences. Based on procurement records, UH Mānoa uses 21 tons of paper towels
                annually.
                This cost was more than $98,000 in 2016, and paper towels alone created enough waste to cover 2,121
                miles
                (nearly the distance from Hawaiʻi to California). There are economic and environmental impacts
                (deforestation,
                depletion of freshwater resources and transportation emissions) associated with the production and
                distribution
                of paper towels.
              </p>
              <p>
                “In order to manage our waste we need to first understand what we are throwing away so that we can
                responsibly
                direct our purchasing and minimize our disposal,” said Roxanne Adams, UH Mānoa director of building and
                grounds
                management.
              </p>
            </div>
            <div className="about-image">
              <Image src="http://www.hawaii.edu/news/attachments/img8876_7608l.jpg"/>
            </div>
          </div>
        </div>
    );
  }
}

export default About;
