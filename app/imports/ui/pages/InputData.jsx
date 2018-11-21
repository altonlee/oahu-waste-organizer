import React from 'react';
import { Meteor } from 'meteor/meteor';
import {
  TextArea,
  Segment,
  Menu,
  Form,
  Input,
  Dropdown,
  Header,
  Sidebar, Button, Icon, Grid,
} from 'semantic-ui-react';
import '/client/input.css';
import Bag from '/imports/ui/components/Bag';

class InputData extends React.Component {
  constructor() {
    super();

    this.categoryInput = null;
    this.weightInput = null;
    this.volumeInput = null;
    this.notesInput = null;
  }

  state = { visible: false }

  handleShowClick = () => this.setState({ visible: true })

  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state;
    const campusOptions = [
      { key: 'uh manoa', text: 'University of Hawaiʻi at Manoa', value: 'uh manoa' },
      { key: 'uh hilo', text: 'University of Hawaiʻi at Hilo', value: 'uh hilo' },
      { key: 'west oahu', text: 'University of Hawaiʻi - West Oahu', value: 'west oahu' },
    ];
    const buildingOptions = [
      { key: 'qlc', text: 'Queen Liliʻuokalani Center', value: 'qlc' },
      { key: 'campus center', text: 'Campus Center', value: 'campus center' },
      { key: 'post', text: 'Pacific Ocean Science and Technology', value: 'post' },
    ];
    const categoryOptions = [
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
      { key: 'glass', text: '---Glass---', value: 'glass' },
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

    const bags = [
      {
        category: 'Starbucks Cups',
        weight: 3.1,
        volume: 13.75,
      },
      {
        category: 'Plastic To-Go Cups',
        weight: 2.65,
        volume: 11,
      },
      {
        category: 'Wax Paper cups',
        weight: 3.2,
        volume: 11,
      },
    ];
    const bagElements = [];
    for (let i = 0; i < bags.length; i++) {
      bagElements[i] = <Bag handleShowClick={this.handleShowClick} category={bags[i].category} volume={bags[i].volume}
                            weight={bags[i].weight} visible={visible}/>;
    }

    return (
        <div style={{ padding: '20px' }}>
          <Segment>
            <Grid columns='equal'>
              <Grid.Row>
                <Grid.Column>
                  <div className="form-heading">Location</div>
                  <Dropdown placeholder='Select Campus' fluid search selection options={campusOptions}/>
                </Grid.Column>
                <Grid.Column>
                  <div className="form-heading">Building</div>
                  <Dropdown placeholder='Select Building' fluid search selection options={buildingOptions}/>
                </Grid.Column>
                <Grid.Column>
                  <div className="form-heading">Date</div>
                  <Input fluid placeholder="MM/DD/YYYY"/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <div className="form-heading">Notes</div>
            <Form>
              <TextArea placeholder="Notes..."/>
            </Form>
            <Sidebar.Pushable as={Segment} className='input-sidebar'>
              <Sidebar as={Menu} animation='overlay' icon='labeled' vertical
                       visible={visible} direction='right' width='very wide' style={{ padding: '10px' }}>
                <Form>
                  <Header as='h3'>Category</Header>
                  <Dropdown ref={this.categoryInput} placeholder='Select Category' selection search
                            options={categoryOptions}/>
                  <Header as='h3'>Weight</Header>
                  <Input ref={this.weightInput} label={{ basic: true, content: 'lb' }} labelPosition='right'
                         placeholder="Weight"/>
                  <Header as='h3'>Volume</Header>
                  <Input ref={this.volumeInput} label={{ basic: true, content: 'gal' }} labelPosition='right'
                         placeholder="Volume"/>
                  <Header as='h3'>Notes</Header>
                  <TextArea ref={this.notesInput} placeholder="Notes"/>
                </Form>
                <div style={{ padding: '20px' }}>
                  <Button basic color='green' floated='left' onClick={this.handleSidebarHide}>
                    Cancel
                  </Button>
                  <Button color='green' floated='right'>
                    Save
                  </Button>
                </div>
              </Sidebar>

              <Sidebar.Pusher>
                <Segment.Group>
                  <Segment style={{ paddingBottom: '5px' }}>
                    <Grid columns='equal'>
                      <Grid.Row>
                        <Grid.Column>
                          <Icon name='tasks'/>
                        </Grid.Column>
                        <Grid.Column>
                          <Icon name='trash alternate'/>
                        </Grid.Column>
                        <Grid.Column>
                          <Button color='green'>
                            Add Bag
                          </Button>
                        </Grid.Column>
                        <Grid.Column>
                          <div className="form-heading" style={{ display: 'inline-block', paddingRight: '10px' }}>Bucket Tare</div>
                          <Input placeholder="Bucket Tare..."/>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                  <Segment basic style={{ minHeight: '500px' }}>
                    {bagElements}
                  </Segment>
                </Segment.Group>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </Segment>
        </div>
    );
  }

}

export default InputData;
