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
    document.title = "OWO - Dashboard"
  }

  /** Get statistics of audits. */
  getStats(data) {
    let totalEvents = data.length;
    let totalWeight = 0;
    let totalVolume = 0;
    let totalBags = 0;
    let ret = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].bags.length; j++) {
        totalBags++;
        totalWeight += _.reduce((_.pluck(data[i].bags, 'weight')), function (memo, num) {
          return memo + num;
        }, 0);
        totalVolume += _.reduce((_.pluck(data[i].bags, 'volume')), function (memo, num) {
          return memo + num;
        }, 0);
      }
    }

    ret = {
      totalEvents: totalEvents,
      totalWeight: this.numFormatter(Math.round(totalWeight)),
      totalVolume: this.numFormatter(Math.round(totalVolume)),
      totalBags: totalBags
    };
    return ret;
  }

  /** Format numbers larger than 1000 to 1k. */
  numFormatter(num) {
    return num > 999 ? (num / 1000).toFixed(1) + 'k' : num;
  }

  /** Load all data first, then render page. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    // Statistics
    const stats = this.getStats(this.props.data);
    // Pie chart options
    const pieStyle = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'All trash by Weight'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Chrome',
          y: 61.41,
          sliced: true,
          selected: true
        }, {
          name: 'Internet Explorer',
          y: 11.84
        }, {
          name: 'Firefox',
          y: 10.85
        }, {
          name: 'Edge',
          y: 4.67
        }, {
          name: 'Safari',
          y: 4.18
        }, {
          name: 'Other',
          y: 7.05
        }]
      }]
    };
    // Bar graph options
    const barStyle = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'All trash by Weight across all campuses'
      },
      subtitle: {
        text: 'Click the columns to see trash by building.'
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Total percent market share'
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
            format: '{point.y:.1f}%'
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },

      "series": [
        {
          "name": "Browsers",
          "colorByPoint": true,
          "data": [
            {
              "name": "Chrome",
              "y": 62.74,
              "drilldown": "Chrome"
            },
            {
              "name": "Firefox",
              "y": 10.57,
              "drilldown": "Firefox"
            },
            {
              "name": "Internet Explorer",
              "y": 7.23,
              "drilldown": "Internet Explorer"
            },
            {
              "name": "Safari",
              "y": 5.58,
              "drilldown": "Safari"
            },
            {
              "name": "Edge",
              "y": 4.02,
              "drilldown": "Edge"
            },
            {
              "name": "Opera",
              "y": 1.92,
              "drilldown": "Opera"
            },
            {
              "name": "Other",
              "y": 7.62,
              "drilldown": null
            }
          ]
        }
      ],
      "drilldown": {
        "series": [
          {
            "name": "Chrome",
            "id": "Chrome",
            "data": [
              [
                "v65.0",
                0.1
              ],
              [
                "v64.0",
                1.3
              ],
              [
                "v63.0",
                53.02
              ],
              [
                "v62.0",
                1.4
              ],
              [
                "v61.0",
                0.88
              ],
              [
                "v60.0",
                0.56
              ],
              [
                "v59.0",
                0.45
              ],
              [
                "v58.0",
                0.49
              ],
              [
                "v57.0",
                0.32
              ],
              [
                "v56.0",
                0.29
              ],
              [
                "v55.0",
                0.79
              ],
              [
                "v54.0",
                0.18
              ],
              [
                "v51.0",
                0.13
              ],
              [
                "v49.0",
                2.16
              ],
              [
                "v48.0",
                0.13
              ],
              [
                "v47.0",
                0.11
              ],
              [
                "v43.0",
                0.17
              ],
              [
                "v29.0",
                0.26
              ]
            ]
          },
          {
            "name": "Firefox",
            "id": "Firefox",
            "data": [
              [
                "v58.0",
                1.02
              ],
              [
                "v57.0",
                7.36
              ],
              [
                "v56.0",
                0.35
              ],
              [
                "v55.0",
                0.11
              ],
              [
                "v54.0",
                0.1
              ],
              [
                "v52.0",
                0.95
              ],
              [
                "v51.0",
                0.15
              ],
              [
                "v50.0",
                0.1
              ],
              [
                "v48.0",
                0.31
              ],
              [
                "v47.0",
                0.12
              ]
            ]
          },
          {
            "name": "Internet Explorer",
            "id": "Internet Explorer",
            "data": [
              [
                "v11.0",
                6.2
              ],
              [
                "v10.0",
                0.29
              ],
              [
                "v9.0",
                0.27
              ],
              [
                "v8.0",
                0.47
              ]
            ]
          },
          {
            "name": "Safari",
            "id": "Safari",
            "data": [
              [
                "v11.0",
                3.39
              ],
              [
                "v10.1",
                0.96
              ],
              [
                "v10.0",
                0.36
              ],
              [
                "v9.1",
                0.54
              ],
              [
                "v9.0",
                0.13
              ],
              [
                "v5.1",
                0.2
              ]
            ]
          },
          {
            "name": "Edge",
            "id": "Edge",
            "data": [
              [
                "v16",
                2.6
              ],
              [
                "v15",
                0.92
              ],
              [
                "v14",
                0.4
              ],
              [
                "v13",
                0.1
              ]
            ]
          },
          {
            "name": "Opera",
            "id": "Opera",
            "data": [
              [
                "v50.0",
                0.96
              ],
              [
                "v49.0",
                0.82
              ],
              [
                "v12.1",
                0.14
              ]
            ]
          }
        ]
      }
    };
    // Combo graph options
    const comboStyle = {
      title: {
        text: 'Building Comparisons within University of Hawaii at Manoa'
      },
      xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
      },
      labels: {
        items: [{
          html: 'Total fruit consumption',
          style: {
            left: '50px',
            top: '18px',
            color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
          }
        }]
      },
      series: [{
        type: 'column',
        name: 'Jane',
        data: [3, 2, 1, 3, 4]
      }, {
        type: 'column',
        name: 'John',
        data: [2, 3, 5, 7, 6]
      }, {
        type: 'column',
        name: 'Joe',
        data: [4, 3, 3, 9, 0]
      }, {
        type: 'spline',
        name: 'Average',
        data: [3, 2.67, 3, 6.33, 3.33],
        marker: {
          lineWidth: 2,
          lineColor: Highcharts.getOptions().colors[3],
          fillColor: 'white'
        }
      }, {
        type: 'pie',
        name: 'Total consumption',
        data: [{
          name: 'Jane',
          y: 13,
          color: Highcharts.getOptions().colors[0] // Jane's color
        }, {
          name: 'John',
          y: 23,
          color: Highcharts.getOptions().colors[1] // John's color
        }, {
          name: 'Joe',
          y: 19,
          color: Highcharts.getOptions().colors[2] // Joe's color
        }],
        center: [100, 80],
        size: 100,
        showInLegend: false,
        dataLabels: {
          enabled: false
        }
      }]
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
