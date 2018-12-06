import React from 'react';
import LogoAboutPage from '../components/LogoAboutPage';
import AboutPage from '../components/AboutPage';
import '/client/landing.css';


export default class About extends React.Component {
  componentDidMount() {
    document.title = "OWO - About Us"
  }

  render() {
    return (
        <div>
          <LogoAboutPage/>
          <AboutPage/>
        </div>
    );
  }
}

