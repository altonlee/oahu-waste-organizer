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
        text: `${this.props.data.building} data`,
      },
      subtitle: {
        text: `At ${this.props.data.campus} on ${this.props.data.date}`,
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
    const barStyle = {
      chart: {
        type: 'area',
      },
      title: {
        text: `${this.props.data.building} data`,
      },
      subtitle: {
        text: `At ${this.props.data.campus} on ${this.props.data.date}`,
      },
      xAxis: {
        categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
        tickmarkPlacement: 'on',
        title: {
          enabled: false,
        },
      },
      yAxis: {
        title: {
          text: 'Percent',
        },
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} millions)<br/>',
        split: true,
      },
      plotOptions: {
        area: {
          stacking: 'percent',
          lineColor: '#ffffff',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#ffffff',
          },
        },
      },
      series: [{
        name: 'Asia',
        data: [502, 635, 809, 947, 1402, 3634, 5268],
      }, {
        name: 'Africa',
        data: [106, 107, 111, 133, 221, 767, 1766],
      }, {
        name: 'Europe',
        data: [163, 203, 276, 408, 547, 729, 628],
      }, {
        name: 'America',
        data: [18, 31, 54, 156, 339, 818, 1201],
      }, {
        name: 'Oceania',
        data: [2, 2, 2, 6, 13, 30, 46],
      }],
    };
    return (
        <div className="ui grid">
          <div className="eight wide column">
            <Chart style={pieStyle}/>
          </div>
          <div className="eight wide column">
            <Graph style={barStyle}/>
          </div>
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
  const docID = match.params._id;
  // Get access to audit data.
  const subscription = Meteor.subscribe('Data');
  return {
    data: Data.findOne(docID),
    ready: subscription.ready(),
  };
})(EventCharts);
