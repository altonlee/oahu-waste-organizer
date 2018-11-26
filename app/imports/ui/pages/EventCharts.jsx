import React from 'react';
import Chart from '../components/Chart';
import Graph from '../components/Graph';

/** A simple static component to render some text for the Home page. */
class EventCharts extends React.Component {
  render() {
    return (
        <div>
          <Chart/>
          <Graph/>
        </div>
    );
  }
}

export default EventCharts;