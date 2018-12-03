import React from 'react';
import { Stuffs, StuffSchema } from '/imports/api/stuff/stuff';
import { Grid, Segment, Header, Dropdown } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

/** Renders the Page for adding a document. */
class AddStuff extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  handleAddition(e, {value}) {
    this.setState({
      options: [{text: value, value}, ...this.state.options],
    })
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, quantity, condition } = data;
    const owner = Meteor.user().username;
    Stuffs.insert({ name, quantity, condition, owner }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const campusOptions = [
      { key: 'uh manoa', text: 'University of Hawaiʻi at Manoa', value: 'uh manoa' },
      { key: 'uh hilo', text: 'Kapiolani Community College', value: 'uh hilo' },
      { key: 'west oahu', text: 'University of Hawaiʻi - West Oahu', value: 'west oahu' },
    ];
    const buildingOptions = [
      { key: 'qlc', text: 'Queen Liliʻuokalani Center', value: 'qlc' },
      { key: 'campus center', text: 'Campus Center', value: 'campus center' },
      { key: 'keller', text: 'Keller Hall', value: 'keller' },
    ];
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Create an Event</Header>
            <Segment>
              <div className="form-heading">Location</div>
              <Dropdown placeholder='Select Campus' fluid search selection options={campusOptions}/>
              <Dropdown placeholder='Select Building' search selection allowAdditions onAddItem={this.handleAddition} options={buildingOptions}/>
            </Segment>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddStuff;
