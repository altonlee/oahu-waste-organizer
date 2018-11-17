import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Container, Item, Header } from 'semantic-ui-react';
import { Events } from '/imports/api/event/event';
import Event from '/imports/ui/components/Event';

/** Renders a table containing all of the Event documents. Use <Event> to render each row. */
class ListEvents extends React.Component {
  render() {
    return (
        <Container>
          <Header as='h1' textAlign="center">Past / Upcoming Waste Audits</Header>
          <Item.Group divided unstackable>
            {this.props.event.map((event, index) => <Event key={index} event={event} />)}
          </Item.Group>
        </Container>
    );
  }
}

/** Require an array of Events in the props. */
ListEvents.propTypes = {
  event: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Events');
  return {
    event: Events.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListEvents);
