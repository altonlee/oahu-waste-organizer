import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Icon, Item } from 'semantic-ui-react';

/** Renders a single event in the ListEvents table. See pages/ListEvents.jsx. */
class Event extends React.Component {

  /** Loads Event thumbnail. */
  renderSwitch(param) {
    const campus = param.toString();
    switch (campus) {
      case 'University of Hawaiʻi at Manoa':
        return <Item.Image src='/images/thumb-uhm.png' size='medium' rounded/>;
      case 'Kapiʻolani Community College':
        return <Item.Image src='/images/thumb-kcc.png' size='medium' rounded/>;
      default:
        return <Item.Image src='/images/logo.png' size='medium' rounded/>;
    }
  }

  render() {
    return (
        <Item>
          {this.renderSwitch(this.props.data.campus)}
          <Item.Content>
            <Item.Header>{this.props.data.campus}</Item.Header>
            <Item.Meta>
              <span>{this.props.data.building}</span>
            </Item.Meta>
            <Item.Description>
              {this.props.data.date}<br/>
              {this.props.data.timeStart} to {this.props.data.timeEnd}<br/>
              <br/><strong>NOTES:</strong><br/>
              {this.props.data.notes}<br/>
            </Item.Description>
            <Item.Extra>
              {this.props.currentUser ?
                  <Button color='green' as={Link} to={`/input/${this.props.data._id}`} floated='right'>
                    Input Data
                    <Icon name='right chevron'/>
                  </Button> : ''}

              <Button basic color='green' as={Link} to={`/charts/${this.props.data._id}`} floated='right'>
                View
                <Icon name='right chevron'/>
              </Button>

              {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                  <Button circular color="grey" as={Link} to={`/edit/${this.props.data._id}`} icon="edit"/>
              ) : ''}
            </Item.Extra>
          </Item.Content>
        </Item>
    );
  }
}

/** Require a document to be passed to this component. */
Event.propTypes = {
  data: PropTypes.object.isRequired,
  currentUser: PropTypes.string,

};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const EventContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Event);

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(EventContainer);
