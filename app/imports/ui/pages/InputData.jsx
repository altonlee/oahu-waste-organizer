import React from 'react';
import { Grid, Form, Input, Dropdown, Card, Header } from 'semantic-ui-react';
import '/client/input.css';

class InputData extends React.Component {
  render() {
    return (
        <div>
          <Grid container columns="two" className="border-margin-border-margin-border-margin-border-margin-border-margin-border-margin">
            <Grid.Row>
              <Grid.Column>
                <div className="form-heading">Location</div>
                <Dropdown placeholder='Select Campus' fluid search selection/>
                <div className="form-heading">Building</div>
                <Dropdown placeholder='Select Building' fluid search selection/>
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
              <Dropdown placeholder='Select Category' fluid search selection/>
              <div className="card-margins">
                <Card fluid>
                  <Header as='h3'>Weight</Header>
                  <Input placeholder="Weight"/>
                </Card>
              </div>
            </Card>
          </div>
        </div>
    );
  }

}

export default InputData;
