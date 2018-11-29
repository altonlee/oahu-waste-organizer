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
  generatePieData(data) {
    let ret = [];
    let name = [];
    let y = [];
    let length = data.length;

    // Get points and name from collection
    for (let i = 0; i < length; i++) {
      name[i] = data[i].category;
      y[i] = _.reduce((_.pluck(data[i].items, 'weight')), function (memo, num) {return memo + num;}, 0);
    }

    // Return series with data
    for (let i = 0; i < data.length; i++) {
      ret.push({
        name: name[i],
        y: y[i]
      });
    }
    return ret;
  }

  generateBarData(data) {
    let ret = [];
    let name = [];
    let y = [];
    let length = data.length;

    // Get points and name from collection
    for (let i = 0; i < length; i++) {
      name[i] = data[i].category;
      y[i] = _.reduce((_.pluck(data[i].items, 'weight')), function (memo, num) {return memo + num;}, 0);
    }

    // Return series with data
    for (let i = 0; i < data.length; i++) {
      ret.push({
        name: name[i],
        y: y[i]
      });
    }
    return ret;
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    let pieData = this.generatePieData(this.props.data.data);
    let barData = this.generateBarData(this.props.data.data);
    const pieStyle = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'Data by Weight of Category',
      },
      subtitle: {
        text: `At ${this.props.data.campus} on ${this.props.data.date}`,
      },
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f} lbs</b>',
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
        name: 'Type of trash by weight',
        colorByPoint: true,
        data: pieData,
      }],
    };
    const barStyle = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Breakdown of Data'
      },
      subtitle: {
        text: 'Click the columns to view breakdown.'
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Weight (lbs)'
        }

      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}'
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },

      series: [{
        name: 'Breakdown of Trash Category',
        colorByPoint: true,
        data: barData,
      }],
    };

    return (
        <div className="ui centered header">{this.props.data.date}: {this.props.data.building} data
          <div className="ui grid container">
            <div className="eight wide column">
              <Chart style={pieStyle}/>
            </div>
            <div className="eight wide column">
              <Graph style={barStyle}/>
            </div>
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
