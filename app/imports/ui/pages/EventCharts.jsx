import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import { Data, DataSchema } from '/imports/api/data/data';
import Chart from '../components/Charts/Chart';
import Graph from '../components/Charts/Graph';

/** Renders a table containing all of the Event documents. Use <Event> to render each row. */
class EventCharts extends React.Component {

  componentDidMount() {
    document.title = 'OWO - Data Visualized';
  }

  /** Generate data in a format for Charts to read. */
  generateData(data) {
    const ret = [];
    const type = [];

    // Get array of names
    for (let i = 0; i < data.length; i++) {
      type[i] = data[i].type;
    }
    const name = _.uniq(type);

    // Get array of values
    const y = [];
    // We want to find all elements with type "name[x]" and add up its weight
    // TODO: Optimize the hell out of this
    for (let i = 0; i < name.length; i++) {
      y[i] = 0;
      for (let j = 0; j < data.length; j++) {
        if (data[j].type === name[i]) {
          y[i] += data[j].weight;
        }
      }
    }

    // Return series with data
    for (let i = 0; i < name.length; i++) {
      ret.push({
        name: name[i],
        y: y[i],
        drilldown: name[i],
      });
    }

    return ret;
  }

  /**  Generate breakdown of data in a format for Graph can read. */
  generateDrilldown(input) {
    const ret = [];

    // Get array of names
    const type = [];
    for (let i = 0; i < input.length; i++) {
      type[i] = input[i].type;
    }
    const name = _.uniq(type);

    // Get array of values
    const data = [];
    const temp = [];
    // We want to find all elements with type "name[x]" and add up its weight
    // TODO: Optimize the hell out of this
    for (let i = 0; i < name.length; i++) {
      temp[i] = [];
      for (let j = 0; j < input.length; j++) {
        if (input[j].type === name[i]) {
          temp[i][j] = [input[j].category, input[j].weight];
        }
      }
      data[i] = _.compact(temp[i]);
    }

    // Return series with drilldown
    for (let i = 0; i < name.length; i++) {
      ret.push({
        name: name[i],
        id: name[i],
        data: data[i],
      });
    }
    return ret;
  }

  /** Get data before loading page. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    // Generate data for graphs to read
    const seriesData = this.generateData(this.props.data.bags);
    const drillData = this.generateDrilldown(this.props.data.bags);
    // Pie chart options
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
        pointFormat: '<b>{point.percentage:.1f}%</b>',
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
        data: seriesData,
      }],
    };
    // Bar graph options
    const barStyle = {
          chart: {
            type: 'column',
          },
          title: {
            text: 'Breakdown of Data',
          },
          subtitle: {
            text: 'Click the columns to view breakdown.',
          },
          xAxis: {
            type: 'category',
          },
          yAxis: {
            title: {
              text: 'Weight (lbs)',
            },

          },
          legend: {
            enabled: false,
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                format: '{point.y:.1f}',
              },
            },
          },

          tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>',
          },

          series: [{
            name: 'Breakdown of Trash Category',
            colorByPoint: true,
            data: seriesData,
          }],
          drilldown:
              { series: drillData },
        };

    const margins = { paddingBottom: '15px', paddingTop: '10px' };
    return (
        <div className="ui container">
          <div className="ui huge centered header">{this.props.data.date}: {this.props.data.building} data<br/>
            <div className="ui large buttons" style={margins}>
              <button className="ui button">Weight</button>
              <div className="or"></div>
              <button className="ui button">Volume</button>
            </div>
            <div className="ui grid container">
              <div className="eight wide column">
                <div className="ui segment">
                  <Chart style={pieStyle}/>
                </div>
              </div>
              <div className="eight wide column">
                <div className="ui segment">
                  <Graph style={barStyle}/>
                </div>
              </div>
            </div>
          </div>
          <br/>
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
