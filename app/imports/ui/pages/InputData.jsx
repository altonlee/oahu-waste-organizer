import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Container, Form, Table, Loader, Dropdown, Button, Icon } from 'semantic-ui-react';
import { Data } from '/imports/api/data/data';
import Bag from '/imports/ui/components/Bag';

/** Renders a table containing all of the Event documents. Use <Event> to render each row. */
class InputData extends React.Component {

  componentDidMount() {
    document.title = 'OWO - Input Data';
  }

  /** Load Events first, then render page. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Renders page. */
  renderPage() {
    return (
        <Container style={{ paddingBottom: '15px' }}>
          <Form style={{ paddingBottom: '15px' }}>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Campus</label>
                <input value={this.props.data.campus} disabled/>
              </Form.Field>
              <Form.Field>
                <label>Building</label>
                <input value={this.props.data.building} disabled/>
              </Form.Field>
              <Form.Field>
                <label>Date</label>
                <input value={this.props.data.date} disabled/>
              </Form.Field>
            </Form.Group>
            <Form.TextArea
                label='Event Notes'
                name='notes'
                placeholder='Write any notes about this event.'
                value={this.props.data.notes}
            />
          </Form>

          <Dropdown text='Filter' icon='filter' floating labeled button className='icon'>
            <Dropdown.Menu>
                <Dropdown.Item text='New' />
                <Dropdown.Item text='Open...' description='ctrl + o' />
                <Dropdown.Item text='Save as...' description='ctrl + s' />
                <Dropdown.Item text='Rename' description='ctrl + r' />
                <Dropdown.Item text='Make a copy' />
                <Dropdown.Item icon='folder' text='Move to folder' />
                <Dropdown.Item icon='trash' text='Move to trash' />
              </Dropdown.Menu>
          </Dropdown>
          <Button floated="right" content="Save" color="green"/>

          <Table striped label='Event Data'>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell/>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Weight</Table.HeaderCell>
                <Table.HeaderCell>Volume</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
                <Table.HeaderCell/>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.data.bags.map((bag, index) => <Bag key={index} data={bag}/>)}
            </Table.Body>

            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell/>
                <Table.HeaderCell colSpan='6'>
                  <Button floated='right' icon labelPosition='left' primary size='small'>
                    <Icon name='user'/> Add User
                  </Button>
                  <Button size='small'>Approve</Button>
                  <Button disabled size='small'>
                    Approve All
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Events in the props. */
InputData.propTypes = {
  data: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const docID = match.params._id;
  // Get access to audit data.
  const subscription = Meteor.subscribe('Data');
  return {
    data: Data.findOne(docID),
    ready: subscription.ready(),
  };
})(InputData);
