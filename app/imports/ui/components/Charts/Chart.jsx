import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';

/** Renders a chart for use in EventCharts.jsx.
 * https://www.highcharts.com/blog/tutorials/highcharts-react-wrapper/
 * TODO: give Chart sample data to read
 * */
class Chart extends React.Component {
  componentDidMount() {
    this.chart = new Highcharts[this.props.type || 'Chart'](
        this.chartEl,
        this.props.style,
    );
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return (
        <div ref={el => this.chartEl = el} />
    );
  }
}

/** Require a document to be passed to this component. */
Chart.propTypes = {
  style: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Chart);
