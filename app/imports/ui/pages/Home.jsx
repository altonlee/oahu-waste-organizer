import React from 'react';
import Logo from '../components/Logo';
import About from '../components/About';
import '/client/landing.css';

export default class Home extends React.Component {
  componentDidMount() {
    document.title = 'OWO - Home';
  }

  render() {
    return (
        <div>
          <Logo/>
          <About/>
        </div>
    );
  }
}
