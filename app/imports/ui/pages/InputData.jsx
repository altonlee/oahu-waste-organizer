import React from 'react';
import { Grid, Form, Input, Dropdown, Card, Header } from 'semantic-ui-react';
import '/client/input.css';

class InputData extends React.Component {
  render() {
    const campusOptions = [
      { key: 'uh manoa', text: 'University of Hawaiʻi at Manoa', value: 'uh manoa' },
      { key: 'uh hilo', text: 'University of Hawaiʻi at Hilo', value: 'uh hilo' },
      { key: 'west oahu', text: 'University of Hawaiʻi - West Oahu', value: 'west oahu' },
    ]
    const buildingOptions = [
      { key: 'qlc', text: 'Queen Liliʻuokalani Center', value: 'qlc' },
      { key: 'campus center', text: 'Campus Center', value: 'campus center' },
      { key: 'post', text: 'Pacific Ocean Science and Technology', value: 'post' },
    ]
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

    return (
        <div>
          <Card className="card-margins" fluid>
          <Grid container columns="two" className="border-margin">
            <Grid.Row>
              <Grid.Column>
                <div className="form-heading">Location</div>
                <Dropdown placeholder='Select Campus' fluid search selection options={campusOptions}/>
                <div className="form-heading">Building</div>
                <Dropdown placeholder='Select Building' fluid search selection options={buildingOptions}/>
                <div className="form-heading">Notes</div>
                <Form.TextArea placeholder="Notes..."/>
              </Grid.Column>
              <Grid.Column>
                <div className="form-heading">Date</div>
                <div className="data-content">Thursday, October 25, 2018</div>
                <div className="form-heading">Bucket Tare</div>
                <Input placeholder="Bucket Tare..."/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div className="card-margins">
            <Card fluid>
              <Header as='h3'>Category</Header>
              <Dropdown placeholder='Select Category' selection search options={categoryOptions}/>
              <div className="card-margins">
                <Card>
                  <Header as='h3'>Weight</Header>
                  <Input placeholder="Weight"/>
                </Card>
                <Card>
                  <Header as='h3'>Volume</Header>
                  <Input placeholder="Volume"/>
                </Card>
              </div>
            </Card>
          </div>
          </Card>
        </div>
    );
  }

}

export default InputData;
