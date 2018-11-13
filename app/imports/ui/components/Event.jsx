import React from 'react';
import { Button, Icon, Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Event extends React.Component {
  render() {
    return (
        <Item>
          <Item.Image src='/images/logo.png'/>
          <Item.Content>
            <Item.Header>University of Hawaii at Manoa</Item.Header>
            <Item.Meta>
              <span className='details'>Keller Hall</span>
            </Item.Meta>
            <Item.Description>
              09/21/2018<br/>
              8:30am to 1:30pm<br/>
            </Item.Description>
            <Item.Extra>
              /**  Maybe make button unclickable if audit is closed */
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
    );
  }
}

/** Require a document to be passed to this component. */
Event.propTypes = {
  /* campus: PropTypes.string.isRequired,
    building: PropTypes.string.isRequired,
    timeStart: PropTypes.object.Date.isRequired,
    timeEnd: PropTypes.object.Date.isRequired, */
  stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Event);
