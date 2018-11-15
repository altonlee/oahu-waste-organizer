import React from 'react';
import Charts from '../components/Charts';

/** A simple static component to render some text for the Home page. */
class EventCharts extends React.Component {

  render() {
    const Pie = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Browser market shares in January, 2018'
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
    const Bar = {
      chart: {
        type: 'area'
      },
      title: {
        text: 'Historic and Estimated Worldwide Population Distribution by Region'
      },
      subtitle: {
        text: 'Source: Wikipedia.org'
      },
      xAxis: {
        categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        }
      },
      yAxis: {
        title: {
          text: 'Percent'
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} millions)<br/>',
        split: true
      },
      plotOptions: {
        area: {
          stacking: 'percent',
          lineColor: '#ffffff',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#ffffff'
          }
        }
      },
      series: [{
        name: 'Asia',
        data: [502, 635, 809, 947, 1402, 3634, 5268]
      }, {
        name: 'Africa',
        data: [106, 107, 111, 133, 221, 767, 1766]
      }, {
        name: 'Europe',
        data: [163, 203, 276, 408, 547, 729, 628]
      }, {
        name: 'America',
        data: [18, 31, 54, 156, 339, 818, 1201]
      }, {
        name: 'Oceania',
        data: [2, 2, 2, 6, 13, 30, 46]
      }]
    };

    return (
        <Charts options={Bar}/>
    );
  }
}

export default EventCharts;
