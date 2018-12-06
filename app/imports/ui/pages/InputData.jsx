import React from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Segment,
  Form,
  Input,
  Dropdown,
  Header,
  Sidebar, Button, Grid, Loader,
} from 'semantic-ui-react';
import '/client/input.css';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import { Data } from '/imports/api/data/data';
import Bag from '/imports/ui/components/Bag';
import PropTypes from 'prop-types';

class InputData extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleShowClick = this.handleShowClick.bind(this);
    this.handleSidebarHide = this.handleSidebarHide.bind(this);

    this.state = {
      notes: this.props.data.notes,
      category: '',
      type: '',
      weight: '',
      volume: '',
      bagNotes: '',
      visible: false,
    };
  }

  /** Handles changes to input fields. */
  handleChange(event, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSave = () => {
    this.setState({ visible: false });

    const notes = this.state.notes;
    const bags = this.props.data.bags;
    bags.push({
      category: this.state.category,
      type: this.state.type,
      weight: this.state.weight,
      volume: this.state.volume,
      notes: this.state.bagNotes,
    });
    Data.update(this.props.data._id, { $set: { notes, bags } }, this.insertCallback);
  };

  handleDelete = (event, {value}) => {
    console.log(event, {value});
  };

  handleShowClick = () => this.setState({ visible: true });

  handleSidebarHide = () => this.setState({ visible: false });

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { visible } = this.state;
    const categoryOptions = [
      { key: 'items of interest', text: 'Items of Interest', value: 'items of interest' },
      { key: 'paper', text: 'Paper', value: 'paper' },
      { key: 'plastic', text: 'Plastic', value: 'plastic' },
      { key: 'glass', text: 'Glass', value: 'glass' },
      { key: 'metals', text: 'Metals', value: 'metals' },
      { key: 'organics', text: 'Organics', value: 'organics' },
      { key: 'misc', text: 'Misc', value: 'misc' },
    ];
    const typeOptions = [
      { key: 'items of interest', text: '---Items of Interest---', value: 'items of interest', disabled: true },
      { key: 'starbucks cups', text: 'Starbucks Cups', value: 'starbucks cups' },
      { key: 'plastic to-go cups', text: 'Plastic To-Go Cups', value: 'plastic to-go cups' },
      { key: 'wax paper cups', text: 'Wax Paper Cups', value: 'wax paper cups' },
      { key: 'compostable utensils', text: 'Compostable Utensils', value: 'compostable utensils' },
      { key: 'paper', text: '---Paper---', value: 'paper', disabled: true },
      { key: 'recyclable paper', text: 'Recyclable Paper', value: 'recyclable paper' },
      { key: 'non-recyclable paper', text: 'Non-Recyclable Paper', value: 'non-recyclable paper' },
      { key: 'paper towels', text: 'Paper Towels', value: 'paper towels' },
      { key: 'plastic', text: '---Plastic---', value: 'plastic', disabled: true },
      {
        key: 'recyclable plastic containers',
        text: 'Recyclable Plastic Containers',
        value: 'recyclable plastic containers',
      },
      {
        key: 'hi-5 recyclable plastic containers',
        text: 'HI-5 Recyclable Plastic Containers',
        value: 'hi-5 recyclable plastic containers',
      },
      { key: 'food wrappers', text: 'Food Wrappers', value: 'food wrappers' },
      { key: 'plastic food containers', text: 'Plastic Food Containers', value: 'plastic food containers' },
      { key: 'styrofoam', text: 'Styrofoam', value: 'styrofoam' },
      { key: 'other plastic', text: 'Other Plastic', value: 'other plastic' },
      { key: 'glass', text: '---Glass---', value: 'glass', disabled: true },
      {
        key: 'hi-5 glass bottles and containers',
        text: 'HI-5 Glass Bottles and Containers',
        value: 'hi-5 glass bottles and containers',
      },
      { key: 'non-hi-5 glass', text: 'Non-HI-5 Glass', value: 'non-hi-5 glass' },
      { key: 'metals', text: '---Metals---', value: 'metals', disabled: true },
      { key: 'recyclable metals', text: 'Recyclable Metals', value: 'recyclable metals' },
      { key: 'non-recyclable', text: 'Non-Recyclable', value: 'non-recyclable' },
      { key: 'aluminum cans', text: 'Aluminum Cans', value: 'aluminum cans' },
      { key: 'organics', text: '---Organics---', value: 'organics', disabled: true },
      { key: 'food and napkins', text: 'Food and Napkins', value: 'food and napkins' },
      { key: 'green waste', text: 'Green Waste', value: 'green waste' },
      { key: 'misc', text: '---Misc---', value: 'misc', disabled: true },
      {
        key: 'construction and demolition',
        text: 'Construction and Demolition ',
        value: 'construction and demolition',
      },
      { key: 'household hazardous waste', text: 'Household Hazardous Waste', value: 'household hazardous waste' },
      { key: 'mixed residue', text: 'Mixed Residue', value: 'mixed residue' },
      { key: 'liquids', text: 'Liquids', value: 'liquids' },
      { key: 'office/school supplies', text: 'Office/School Supplies', value: 'office/school supplies' },
      { key: 'all electronics', text: 'All Electronics', value: 'all electronics' },
    ];

    const bags = this.props.data.bags;
    const bagElements = [];
    for (let i = 0; i < bags.length; i++) {
      bagElements[i] = <Bag handleDelete={this.handleDelete} category={bags[i].category} type={bags[i].type}
                            volume={bags[i].volume}
                            weight={bags[i].weight} notes={bags[i].notes} visible={visible}/>;
    }

    const { notes, category, type, weight, volume, bagNotes } = this.state;

    const { contextRef } = this.state

    return (
        <div>
          <div style={{ padding: '20px' }}>
            <Grid columns='equal'>
              <Grid.Row>
                <Grid.Column>
                  <div className="form-heading">Location</div>
                  <Input disabled fluid value={this.props.data.campus}/>
                </Grid.Column>
                <Grid.Column>
                  <div className="form-heading">Building</div>
                  <Input disabled fluid value={this.props.data.building}/>
                </Grid.Column>
                <Grid.Column>
                  <div className="form-heading">Date</div>
                  <Input disabled fluid value={this.props.data.date}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <div className="form-heading">Notes</div>
            <Form>
              <Form.TextArea value={notes} name="notes" placeholder="Notes..." onChange={this.handleChange}/>
            </Form>
            <Sidebar.Pushable as={Segment} style={{ maxHeight: 'calc(100vh - 100px)' }}>
              <div className="new-sidebar" style={{ display: this.state.visible ? 'block' : 'none' }}>
                <div className="new-sidebar-content">
                  <Form>
                    <Header as='h3'>Category</Header>
                    <Dropdown value={category} name='category' placeholder='Select Category' selection search
                              options={categoryOptions} onChange={this.handleChange}/>
                    <Header as='h3'>Type</Header>
                    <Dropdown value={type} name='type' placeholder='Select Type' selection search
                              options={typeOptions} onChange={this.handleChange}/>
                    <Header as='h3'>Weight</Header>
                    <Input value={weight} name='weight' label={{ content: 'lb' }} labelPosition='right'
                           placeholder="Weight" onChange={this.handleChange}/>
                    <Header as='h3'>Volume</Header>
                    <Input value={volume} name='volume' label={{ content: 'gal' }} labelPosition='right'
                           placeholder="Volume" onChange={this.handleChange}/>
                    <Header as='h3'>Notes</Header>
                    <Form.TextArea value={bagNotes} name='bagNotes' placeholder="Notes" onChange={this.handleChange}/>
                  </Form>
                  <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                    <Button color='green' floated='right' onClick={this.handleSave}>
                      Save
                    </Button>
                    <Button basic color='green' floated='right' onClick={this.handleSidebarHide}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
              <Sidebar.Pusher>
                <Segment vertical style={{ padding: '20px' }}>
                  <Grid columns='equal'>
                    <Grid.Row>
                      <Grid.Column>
                        <Dropdown placeholder='State' search selection options={categoryOptions}/>
                      </Grid.Column>
                      <Grid.Column>
                        <Button color='green' float='right' onClick={this.handleShowClick}>
                          Add Bag
                        </Button>
                      </Grid.Column>
                      <Grid.Column>
                        <div className="form-heading" style={{ display: 'inline-block', paddingRight: '10px' }}>Bucket
                          Tare
                        </div>
                        <Input placeholder="Bucket Tare..."/>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
                <Segment vertical basic style={{ minHeight: '500px', padding: '20px' }}>
                  {bagElements}
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </div>
        </div>
    );
  }

}

/** Require the presence of a Events in the props object. */
InputData.propTypes = {
  data: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const docID = match.params._id;
  // Get access to Events.
  const subscription = Meteor.subscribe('Data');
  return {
    data: Data.findOne(docID),
    ready: subscription.ready(),
  };
})(InputData);
