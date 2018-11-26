import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Events } from '/imports/api/event/event';
import { Input } from '/imports/api/input/input';
import Chart from '../components/Chart';
import Graph from '../components/Graph';

/** A simple static component to render some text for the Home page. */
class EventCharts extends React.Component {
  render() {
    return (
        <div>
          <Chart event={event} input={input}/>
          <Graph/>
        </div>
    );
  }
}

/** Require Event and its Input data in the props. */
EventCharts.propTypes = {
  event: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  // const docID = match.params._id;
  // Get access to Events and Input documents.
  const sub1 = Meteor.subscribe('Events');
  const sub2 = Meteor.subscribe('Input');
  return {
    event: Events.find().fetch(),
    input: Input.find().fetch(),
  };
})(EventCharts);
