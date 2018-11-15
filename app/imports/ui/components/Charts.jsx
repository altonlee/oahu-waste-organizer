import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Charts extends React.Component {
  render() {
    const options = {
      title: {
        text: 'My chart',
      },
      series: [{
        data: [1, 2, 3],
      }],
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
  }
}

export default Charts;
