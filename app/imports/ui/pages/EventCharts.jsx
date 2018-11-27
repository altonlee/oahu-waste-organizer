import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import { Data, DataSchema } from '/imports/api/data/data';
import Chart from '../components/Chart';
import Graph from '../components/Graph';

/** Renders a table containing all of the Event documents. Use <Event> to render each row. */
class EventCharts extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const pieStyle = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: `${this.props.data.campus}`,
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Chrome',
          y: 61.41,
          sliced: true,
          selected: true,
        }, {
          name: 'Internet Explorer',
          y: 11.84,
        }, {
          name: 'Firefox',
          y: 10.85,
        }, {
          name: 'Edge',
          y: 4.67,
        }, {
          name: 'Safari',
          y: 4.18,
        }, {
          name: 'Other',
          y: 7.05,
        }],
      }],
    };
    return (
        <div>
          <Chart style={pieStyle}/>
          <Graph/>
        </div>
    );
  }
}

/** Require an array of Events in the props. */
EventCharts.propTypes = {
  data: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  //const docID = match.params._id;
  const docID = "University of Hawaii at Manoa";
  // Get access to audit data.
  const subscription = Meteor.subscribe('Data');
  return {
    data: Data.find(docID),
    ready: subscription.ready(),
  };
})(EventCharts);
