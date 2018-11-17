import React from 'react';
import { Button, Icon, Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

/** Renders a single event in the ListEvents table. See pages/ListEvents.jsx. */
class Event extends React.Component {
  render() {
    const details = { color: 'grey' };
    return (
        <Item>
          <Item.Image
              src='http://manoa.hawaii.edu/confuciusinstitute/wp-content/uploads/2017/03/manoaseal_transparent.png'/>
          <Item.Content>
            <Item.Header>{this.props.event.campus}</Item.Header>
            <Item.Meta>
              <span className='details'>{this.props.event.building}</span>
            </Item.Meta>
            <Item.Description>
              {this.props.event.date}<br/>
              {this.props.event.timeStart} to {this.props.event.timeEnd}<br/>
            </Item.Description>
            <Item.Extra>
              {Meteor.userId() !== null ? (
                  <Button color='green' as={Link} to="/input" floated='right'>
                    Input Data
                    <Icon name='right chevron'/>
                  </Button>
              ) : ''}
              <Button basic color='green' as={Link} to="/charts" floated='right'>
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
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Event);
