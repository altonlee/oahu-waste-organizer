import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Divider, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

/** Renders a single bag in the InputData table. See pages/InputData.jsx. */
class Bag extends React.Component {
  render() {
    const { visible } = this.state
    return (
        <List horizontal relaxed='very'>
          <List.Item>
            <List.Content>
              <List.Header>Category</List.Header>
              Starbucks Cups
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Weight</List.Header>
              3.1 Ibs
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Volume</List.Header>
              13.75 gal
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content floated='right' verticalAlign='middle'>
              <Button disabled={visible} onClick={this.handleShowClick}>Edit</Button>
            </List.Content>
          </List.Item>
          <Divider/>
        </List>
    );
  }
}


/** Require a document to be passed to this component. */
Bag.propTypes = {
  bag: PropTypes.object.isRequired,
  currentUser: PropTypes.string,

};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const BagContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Bag);


/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(BagContainer);
