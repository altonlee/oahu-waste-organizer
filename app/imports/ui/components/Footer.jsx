import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    const footerStyle = { 'background-color': '#069200', color: '#FFF' };
    return (
        <footer style={footerStyle} >
          <div style={divStyle} className="ui center aligned container">
            O'ahu Waste Organizer<br/>
            <hr/>
            Final Project for ICS 314<br/>
            Inspired by OWO, the HACC 2018 team project<br/>
            University of Hawaii<br/>
            Honolulu, HI 96822<br/>
          </div>
        </footer>
    );
  }
}

export default Footer;
