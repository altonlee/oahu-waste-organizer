import React from 'react';
import { Button, Icon, Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Event extends React.Component {
  render() {
    return (
        <Item>
          <Item.Image src='/images/logo.png'/>

          <Item.Content>
            <Item.Header>Leeward Community College GOOD</Item.Header>
            <Item.Meta>
              <span className='details'>Building A</span>
            </Item.Meta>
            <Item.Description>
              Building A
              12/25/2018
              8:30am to 1:30pm
            </Item.Description>
            <Item.Extra>
              <Button as={Link} to="/input" primary floated='right'>
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
