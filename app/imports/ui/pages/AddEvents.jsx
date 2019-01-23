import React from 'react';
import { Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Segment, Form, Header } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import { Data } from '/imports/api/data/data';

/** Semantic React-styled date and time picker. https://www.npmjs.com/package/semantic-ui-calendar-react */
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';

/** Some sample options. Admin can also type in custom options and will be saved in dropdowns. */
const campuses = [
  { key: 'uhm', text: 'University of Hawaiʻi at Manoa', value: 'University of Hawaiʻi at Manoa' },
  { key: 'uhwo', text: 'University of Hawaiʻi - West Oʻahu', value: 'University of Hawaiʻi - West Oʻahu' },
  { key: 'uhh', text: 'University of Hawaiʻi at Hilo', value: 'University of Hawaiʻi at Hilo' },
  { key: 'kcc', text: 'Kapiʻolani Community College', value: 'Kapiʻolani Community College' },
  { key: 'hocc', text: 'Honolulu Community College', value: 'Honolulu Community College' },
  { key: 'lcc', text: 'Leeward Community College', value: 'Leeward Community College' },
  { key: 'wcc', text: 'Windward Community College', value: 'Windward Community College' },
  { key: 'uhma', text: 'UH Maui College', value: 'UH Maui College' },
  { key: 'kacc', text: 'Kauaʻi Community College', value: 'Kauaʻi Community College' },
  { key: 'hacc', text: 'Hawaiʻi Community College', value: 'Hawaiʻi Community College' },
];
const buildings = [
  { key: 'qlc', text: 'Queen Liliʻuokalani Center', value: 'Queen Liliʻuokalani Center' },
  { key: 'campus center', text: 'Campus Center', value: 'Campus Center' },
  { key: 'post', text: 'Pacific Ocean Science and Technology', value: 'Pacific Ocean Science and Technology' },
];

/** Renders the Page for adding a document. */
class AddEvents extends React.Component {

  componentDidMount() {
    document.title = 'OWO - Create Event';
  }

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.state = {
      campus: '',
      building: '',
      buildings: buildings,
      date: '',
      timeStart: '',
      timeEnd: '',
      eventID: '',
      notes: '',
      redirect: false,
    };
    this.handleAddition = this.handleAddition.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  /** Notify the user of the results of the submit. If successful, redirect to Events. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: `Added ${this.state.date}: ${this.state.building} Event` });
      this.setState({ redirect: true });
    }
  }

  /** Redirects the page. */
  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to='/events'/>;
    }
  }

  /** Inserts submitted values into Data collection as Event data. */
  handleSubmit() {
    const { campus, building, date, timeStart, timeEnd, notes } = this.state;
    const eventID = new Meteor.Collection.ObjectID().toString();
    Data.insert({ campus, building, date, timeStart, timeEnd, eventID, notes }, this.insertCallback);
  }

  /** Handles changes to input fields. */
  handleChange(event, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Adds new value to array of options. */
  handleAddition(event, { value }) {
    this.setState({
      buildings: [{ text: value, value }, ...this.state.buildings],
    });
  }

  render() {
    const { campus, building, date, timeStart, timeEnd, notes } = this.state;
    return (
        <Container style={{ paddingBottom: '15px' }}>
          {this.renderRedirect()}
          <Header as="h2" textAlign="center">Create an Event</Header>
          <Segment>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group widths='equal'>
                <Form.Select required fluid search label='Campus'
                             options={campuses}
                             name="campus"
                             placeholder='Select the campus the audit is being held at.'
                             value={campus}
                             onChange={this.handleChange}
                />
                <Form.Select required fluid search selection label='Building'
                             options={this.state.buildings}
                             name="building"
                             placeholder='Select a building, or type a new building name to save it.'
                             value={building}
                             onChange={this.handleChange}
                             allowAdditions
                             onAddItem={this.handleAddition}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field required label="Date of Event"
                            control={DateInput}
                            name="date"
                            placeholder="Select a date using the calendar."
                            dateFormat="MM/DD/YYYY"
                            iconPosition="left"
                            value={date}
                            onChange={this.handleChange}
                />
                <Form.Field required label="Start Time"
                            control={TimeInput}
                            name="timeStart"
                            placeholder="Select a start time."
                            timeFormat="AMPM"
                            iconPosition="left"
                            value={timeStart}
                            onChange={this.handleChange}
                />
                <Form.Field required label="End Time"
                            control={TimeInput}
                            name="timeEnd"
                            placeholder="Select a finish time."
                            timeFormat="AMPM"
                            iconPosition="left"
                            value={timeEnd}
                            onChange={this.handleChange}
                />
              </Form.Group>
              <Form.TextArea label="Notes"
                             name="notes"
                             placeholder="Write any notes about this event."
                             value={notes}
                             onChange={this.handleChange}
              />
              <Form.Button content="Submit"/>
            </Form>
          </Segment>
        </Container>
    );
  }
}

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => ({
  data: Data.find({}).fetch(),
}))(AddEvents);
