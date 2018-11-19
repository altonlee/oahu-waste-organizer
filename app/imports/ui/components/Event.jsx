import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Icon, Item } from 'semantic-ui-react';

/** Renders a single event in the ListEvents table. See pages/ListEvents.jsx. */
class Event extends React.Component {
  render() {
    const UHM = { src: '/images/thumb-uhm.png' };
    const KCC = { src: '/images/thumb-kcc.png' };
    return (
        <Item>
          <Item.Image src='/images/thumb-uhm.png' size='medium' rounded/>
          <Item.Content>
            <Item.Header>{this.props.event.campus}</Item.Header>
            <Item.Meta>
              <span>{this.props.event.building}</span>
            </Item.Meta>
            <Item.Description>
              {this.props.event.date}<br/>
              {this.props.event.timeStart} to {this.props.event.timeEnd}<br/>
               <br/><strong>NOTES:</strong><br/>
              {this.props.event.notes}<br/>
            </Item.Description>
            <Item.Extra>
              {this.props.currentUser ? (
                  <Button color='green' as={Link} to={`/input/${this.props.event._id}`} floated='right'>
                    Input Data
                    <Icon name='right chevron'/>
                  </Button>
              ) : ''}
              <Button basic color='green' as={Link} to={`/charts/${this.props.event._id}`} floated='right'>
                View
                <Icon name='right chevron'/>
              </Button>
            </Item.Extra>
          </Item.Content>
        </Item>
    );
  }
}

/** Require a document to be passed to this component. */
Event.propTypes = {
  event: PropTypes.object.isRequired,
  currentUser: PropTypes.string,

};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const EventContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Event);


/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(EventContainer);
