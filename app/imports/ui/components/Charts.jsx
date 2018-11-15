import React from 'react';
import Highcharts from 'highcharts';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.chartContainer = React.createRef();
  }

  componentDidMount() {
    this.chart = new Highcharts[this.props.type || 'Chart'](
        this.chartContainer.current,
        this.props.options
    );
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return (
        <div ref={this.chartContainer}/>
    );
  }
}

export default Charts;