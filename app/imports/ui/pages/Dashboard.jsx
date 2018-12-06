import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import { Data, DataSchema } from '/imports/api/data/data';
import Highcharts from 'highcharts';
import Chart from '../components/Charts/Chart';
import Graph from '../components/Charts/Graph';
import Combo from '../components/Charts/Combo';

/** Renders a table containing all of the Event documents. Use <Event> to render each row. */
class EventCharts extends React.Component {
  componentDidMount() {
    document.title = 'OWO - Dashboard';
  }

  /** Get statistics of audits. */
  getStats(data) {
    const totalEvents = data.length;
    let totalWeight = 0;
    let totalVolume = 0;
    let totalBags = 0;
    let ret = [];

    for (let i = 0; i < data.length; i++) {
      totalBags += data[i].bags.length;
      totalWeight += _.reduce((_.pluck(data[i].bags, 'weight')), function (memo, num) {
        return memo + num;
      }, 0);
      totalVolume += _.reduce((_.pluck(data[i].bags, 'volume')), function (memo, num) {
        return memo + num;
      }, 0);
    }

    ret = {
      totalEvents: totalEvents,
      totalWeight: this.numFormatter(Math.round(totalWeight)),
      totalVolume: this.numFormatter(Math.round(totalVolume)),
      totalBags: totalBags,
    };
    return ret;
  }

  /** Format numbers larger than 1000 to 1k. */
  numFormatter(num) {
    return num > 999 ? `${(num / 1000).toFixed(1)}k` : num;
  }

  /** Generate data into a format Chart can read. */
  getSeriesData(data) {
    const ret = [];

    // Get array of campuses
    const campuses = [];
    for (let i = 0; i < data.length; i++) {
      campuses[i] = data[i].campus;
    }
    const name = _.uniq(campuses);

    // Get array of values
    const y = [];
    // TODO: Optimize the hell out of this
    for (let x = 0; x < name.length; x++) {
      y[x] = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].campus === name[x]) {
          for (let j = 0; j < data[i].bags.length; j++) {
            y[x] += data[i].bags[j].weight;
          }
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

  /** Generate drilldown data for Graph to read. */
  getDrillData(data) {
    const ret = [];

    // Get array of names
    const campuses = [];
    for (let i = 0; i < data.length; i++) {
      campuses[i] = data[i].campus;
    }
    const name = _.uniq(campuses);

    // Get array of values
    const buildings = [];
    for (let x = 0; x < name.length; x++) {
      buildings[x] = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].campus === name[x]) {
          for (let j = 0; j < data[i].bags.length; j++) {
            buildings[x][j] = [data[i].bags[j].type, data[i].bags[j].weight];
          }
        }
      }
      console.log(buildings[x]);
    }

    // Return series with drilldown
    for (let i = 0; i < name.length; i++) {
      ret.push({
        name: name[i],
        id: name[i],
        data: buildings[i],
      });
    }
    return ret;
  }

  /** Load all data first, then render page. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    // Get data
    const stats = this.getStats(this.props.data);
    const seriesData = this.getSeriesData(this.props.data);
    const drillData = this.getDrillData(this.props.data);

    // Pie chart options
    const pieStyle = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'Total Weight of trash per campus',
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
        name: 'Total Campus Trash',
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
        text: 'Total Weight of trash per campus',
      },
      subtitle: {
        text: 'Click the columns to see trash types.',
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
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> lbs<br/>',
      },

      series: [
        {
          name: 'Total Campus Trash',
          colorByPoint: true,
          data: seriesData,
        },
      ],
      drilldown:
          { series: drillData },
    };
    // Combo graph options
    const comboStyle = {
      title: {
        text: 'Building Comparisons within University of Hawaii at Manoa',
      },
      xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums'],
      },
      labels: {
        items: [{
          html: 'Total fruit consumption',
          style: {
            left: '50px',
            top: '18px',
            color: (Highcharts.theme && Highcharts.theme.textColor) || 'black',
          },
        }],
      },
      series: [{
        type: 'column',
        name: 'Jane',
        data: [3, 2, 1, 3, 4],
      }, {
        type: 'column',
        name: 'John',
        data: [2, 3, 5, 7, 6],
      }, {
        type: 'column',
        name: 'Joe',
        data: [4, 3, 3, 9, 0],
      }, {
        type: 'spline',
        name: 'Average',
        data: [3, 2.67, 3, 6.33, 3.33],
        marker: {
          lineWidth: 2,
          lineColor: Highcharts.getOptions().colors[3],
          fillColor: 'white',
        },
      }, {
        type: 'pie',
        name: 'Total consumption',
        data: [{
          name: 'Jane',
          y: 13,
          color: Highcharts.getOptions().colors[0], // Jane's color
        }, {
          name: 'John',
          y: 23,
          color: Highcharts.getOptions().colors[1], // John's color
        }, {
          name: 'Joe',
          y: 19,
          color: Highcharts.getOptions().colors[2], // Joe's color
        }],
        center: [100, 80],
        size: 100,
        showInLegend: false,
        dataLabels: {
          enabled: false,
        },
      }],
    };

    const margins = { paddingTop: '10px' };
    return (
        <div className="ui container">
          <div className="ui huge centered header">Dashboard<br/>
            <div className="ui centered segment" style={margins}>
              <div className="ui five small statistics">
                <div className="statistic">
                  <div className="value">
                    <i className="clipboard icon"/> {stats.totalEvents}
                  </div>
                  <div className="label">
                    Total Audits
                  </div>
                </div>
                <div className="statistic">
                  <div className="value">
                    <i className="balance scale icon"/> {stats.totalWeight}
                  </div>
                  <div className="label">
                    Pounds of Trash
                  </div>
                </div>
                <div className="statistic">
                  <div className="value">
                    <i className="weight icon"/> {stats.totalVolume}
                  </div>
                  <div className="label">
                    Gallons of Trash
                  </div>
                </div>
                <div className="statistic">
                  <div className="value">
                    <i className="trash icon"/> {stats.totalBags}
                  </div>
                  <div className="label">
                    Total Trashbags
                  </div>
                </div>
                <div className="statistic">
                  <div className="value">
                    <i className="users icon"/> 42
                  </div>
                  <div className="label">
                    Users
                  </div>
                </div>
              </div>
            </div>
            <div className="ui grid container" style={margins}>
              <div className="eight wide column">
                <div className="ui segment">
                  <Chart style={pieStyle}/>
                </div>
              </div>
              <div className="eight wide column">
                <div className="ui segment">
                  <Graph style={barStyle}/></div>
              </div>
            </div>
            <div className="ui segment">
              <Combo style={comboStyle}/>
            </div>
          </div>
          <br/>
        </div>
    );
  }
}

/** Require an array of Events in the props. */
EventCharts.propTypes = {
  data: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  // Get access to audit data.
  const subscription = Meteor.subscribe('Data');
  return {
    data: Data.find({}, { sort: { date: -1 } }).fetch(),
    ready: subscription.ready(),
  };
})(EventCharts);
