import React from 'react';
import { Icon } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
        <footer>
          <div className="footer">
            <div style={{ paddingBottom: '5px' }}>
            <a href="https://www.facebook.com/uhsustainability/" style={{ color: 'white' }}>
              <Icon link size='big' name='facebook official'/>
            </a>
            <a href="https://www.instagram.com/uhsustain/" style={{ color: 'white' }}>
              <Icon link size='big' name='instagram'/>
            </a>
              <a href="https://twitter.com/uhsustain" style={{ color: 'white' }}>
              <Icon link size='big' name='twitter square'/>
          </a>
            </div>
            <br/>
            O'ahu Waste Organizer<br/>
            <hr/>
            Final Project for ICS 314<br/>
            Inspired by OWO, the HACC 2018 team project<br/>
            University of Hawaiʻi<br/>
            Honolulu, HI 96822<br/>
          </div>
        </footer>
    );
  }
}

export default Footer;
