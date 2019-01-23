import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import {
  Container,
  Form, Table, Menu,
  Loader,
  Dropdown,
  Segment,
  Sidebar,
  Input,
  Button,
  Icon,
} from 'semantic-ui-react';
import { Data } from '/imports/api/data/data';
import { Bags } from '/imports/api/bags/bags';
import Bag from '/imports/ui/components/Bag';

// Category options
const categoryOptions = [
  { key: 'Items of Interest', text: 'Items of Interest', value: 'Items of Interest' },
  { key: 'Paper', text: 'Paper', value: 'Paper' },
  { key: 'Plastic', text: 'Plastic', value: 'Plastic' },
  { key: 'Metals', text: 'Metals', value: 'Metals' },
  { key: 'Glass', text: 'Glass', value: 'Glass' },
  { key: 'Organics', text: 'Organics', value: 'Organics' },
  { key: 'Misc.', text: 'Misc.', value: 'Misc.' },
];

// Item options. Can also add custom options
const itemOptions = [
  { key: 'Items of Interest', text: 'Starbucks cups', value: 'Starbucks cups' },
  { key: 'Paper', text: 'Recyclable Paper', value: 'Recyclable Paper' },
  { key: 'Plastic', text: 'Food wrappers', value: 'Food wrappers' },
  { key: 'Metals', text: 'Aluminum cans', value: 'Aluminum cans' },
  { key: 'Glass', text: 'Glass containers', value: 'Glass containers' },
  { key: 'Organics', text: 'Food waste', value: 'Food waste' },
  { key: 'Misc.', text: 'Arkansas', value: 'Arkansas' },
];

/** Renders a table containing all of the Bag items. Use <Bag> to render each row. */
class InputData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      bagTare: '',
      eventID: '',
      category: '',
      name: '',
      weight: '',
      volume: '',
      notes: '',
      visible: false,
    };
    this.showSidebar = this.showSidebar.bind(this);
    this.hideSidebar = this.hideSidebar.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    document.title = 'OWO - Input Data';
  }

  /** Shows sidebar. */
  showSidebar() {
    this.setState({ visible: true });
  }

  /** Hides sidebar. */
  hideSidebar() {
    this.setState({
      category: '',
      name: '',
      weight: '',
      volume: '',
      notes: '',
      visible: false
    });
  }

  /** Handles change in form. */
  handleChange(event, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Inserts submitted values into Data collection as Event data. */
  handleSubmit() {
    const { category, name, weight, volume, notes } = this.state;
    const eventID = this.props.data.eventID;
    console.log(this.state, eventID);
    Bags.insert({ eventID, category, name, weight, volume, notes }, this.insertCallback);
    this.hideSidebar();
  }

  /** Edits submitted values in Data collection as Event data. */
  handleEdit() {
    console.log("Click!");
  }

  /** Load Events first, then render page. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Renders page. */
  renderPage() {
    // Used to add/edit new bags
    const { category, name, weight, volume, notes, visible } = this.state;

    // Filters event-only bags
    const bags = this.props.bags.filter(bags => (bags.eventID === this.props.data.eventID));

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
                onChange={this.handleChange}
            />
          </Form>

          <Dropdown text='Sort' icon='filter' floating labeled button className='icon'>
            <Dropdown.Menu>
              <Dropdown.Item icon='clipboard outline' text='Category'/>
              <Dropdown.Item icon='time' text='Recently added'/>
            </Dropdown.Menu>
          </Dropdown>
          <Button color="green" floated="right" icon='add' labelPosition='left' content="Add Bag"
                  onClick={this.showSidebar}/>
          <Input
              type="text"
              placeholder='Bag Tare'
              value={0}
              onChange={this.handleChange}
              floated="right"
          />

          <Sidebar.Pushable as={Segment}>
            <Sidebar
                as={Menu}
                borderless
                animation='overlay'
                icon='labeled'
                onHide={this.hideSidebar}
                vertical
                visible={visible}
                direction='right'
                width='wide'
            >
              <Menu.Item>
                <Form style={{ padding: '15px' }}>
                  <Form.Select
                      label='Category'
                      name="category"
                      placeholder="Trash category..."
                      options={categoryOptions}
                      value={category}
                      onChange={this.handleChange}
                  />
                  <Form.Select
                      label='Trash Name'
                      name="name"
                      placeholder="Name of trash item..."
                      options={itemOptions}
                      value={name}
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label='Weight (lbs)'
                      icon='balance scale'
                      name="weight"
                      placeholder="Weight (lbs)"
                      value={weight}
                      type="text"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label='Volume (gal)'
                      icon='weight'
                      name="volume"
                      placeholder="Volume (gal)"
                      value={volume}
                      type="text"
                      onChange={this.handleChange}
                  />
                  <Form.TextArea
                      label="Item Notes"
                      name="notes"
                      placeholder="Additional notes about this item."
                      value={notes}
                      onChange={this.handleChange}
                  />
                  <Button basic color='green' floated='left' content="Cancel" onClick={this.hideSidebar}/>
                  <Button color='green' floated='right' content="Save" onClick={this.handleSubmit}/>
                </Form>
              </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={visible}>
              <Table padded striped label='Event Data'>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell width={2}>Category</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Type</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Weight</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Volume</Table.HeaderCell>
                    <Table.HeaderCell width={6}>Notes</Table.HeaderCell>
                    <Table.HeaderCell width={1}/>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {bags.map((bag, index) => <Bag key={index} data={bag}/>)}
                </Table.Body>

                <Table.Footer fullWidth>
                  <Table.Row>
                    <Table.HeaderCell colSpan='16'/>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Container>
    );
  }
}

/** Require an array of Events in the props. */
InputData.propTypes = {
  data: PropTypes.object.isRequired,
  bags: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const docID = match.params._id;
  // Get access to audit data.
  const sub1 = Meteor.subscribe('Data');
  const sub2 = Meteor.subscribe('Bags');
  return {
    data: Data.findOne(docID),
    bags: Bags.find({}).fetch(),
    ready: (sub1.ready() && sub2.ready()),
  };
})(InputData);
