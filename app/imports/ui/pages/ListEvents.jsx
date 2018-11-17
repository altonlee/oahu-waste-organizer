import React from 'react';
import { Container, Button, Icon, Item, Header } from 'semantic-ui-react';
import Event from '/imports/ui/components/Event';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListEvents extends React.Component {

  render() {
    const details = { color: 'grey' };
    return (
        <Container>
          <Header as='h1'>Past / Upcoming Waste Audits</Header>

          <Item.Group divided>
            <Item>
              <Item.Image src='/images/logo.png'/>
              <Item.Content>
                <Item.Header>University of Hawaii at Manoa</Item.Header>
                <Item.Meta>
                  <span options={details}>Keller Hall</span>
                </Item.Meta>
                <Item.Description>
                  09/21/2018<br/>
                  8:30am to 1:30pm<br/>
                </Item.Description>
                <Item.Extra>
                  {this.props.currentUser ? (
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

            <Item>
              <Item.Image src='/images/logo.png'/>
              <Item.Content>
                <Item.Header>Kapiolani Community College</Item.Header>
                <Item.Meta>
                  <span className='details'>Olona Building</span>
                </Item.Meta>
                <Item.Description>
                  11/13/2018<br/>
                  8:30am to 1:30pm<br/>
                </Item.Description>
                <Item.Extra>
                  {this.props.currentUser ? (
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

            <Item>
              <Item.Image src='/images/logo.png'/>
              <Item.Content>
                <Item.Header>Leeward Community College</Item.Header>
                <Item.Meta>
                  <span className='details'>Building A</span>
                </Item.Meta>
                <Item.Description>
                  12/25/2018<br/>
                  8:30am to 1:30pm<br/>
                </Item.Description>
                <Item.Extra>
                  {this.props.currentUser ? (
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
          </Item.Group>

        </Container>
    );
  }
}

/** Declare the types of all properties. */
ListEvents.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const EventsContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(ListEvents);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(EventsContainer);
