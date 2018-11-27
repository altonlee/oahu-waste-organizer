import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Container, Item, Header, Loader } from 'semantic-ui-react';
import { Data } from '/imports/api/data/data';
import Event from '/imports/ui/components/Event';

/** Renders a table containing all of the Event documents. Use <Event> to render each row. */
class ListEvents extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }
  
  renderPage() {
    const eventStyle = { paddingBottom: '15px' };
    return (
        <Container style={eventStyle}>
          <Header as='h1' textAlign="center">Past / Upcoming Waste Audits</Header>
          <Item.Group divided unstackable>
            {this.props.data.map((event, index) => <Event key={index} data={event} />)}
          </Item.Group>
        </Container>
    );
  }
}

/** Require an array of Events in the props. */
ListEvents.propTypes = {
  data: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to audit data.
  const subscription = Meteor.subscribe('Data');
  return {
    data: Data.find({}, {sort: {date: -1}}).fetch(),
    ready: subscription.ready(),
  };
})(ListEvents);
