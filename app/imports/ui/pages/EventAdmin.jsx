import React from 'react';
import { Container, Segment, Grid, Divider, Icon, Button, Header, Dropdown } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

class EventAdmin extends React.Component {
  handleClick() {

  }

  render() {
    const margins = { paddingBottom: "15px" };
    const campusOptions = [
      { key: 'uh manoa', text: 'University of Hawaiʻi at Manoa', value: 'uh manoa' },
      { key: 'uh hilo', text: 'University of Hawaiʻi at Hilo', value: 'uh hilo' },
      { key: 'west oahu', text: 'University of Hawaiʻi - West Oahu', value: 'west oahu' },
    ];

    return (
        <Container textAlign="center" style={margins}>
          <Header as="h1">Events Manager</Header>
          <Header as="h3">Find an audit to edit, or create an Event for a future audit</Header>
          <Segment>
            <Grid columns={2} stackable textAlign='center'>
              <Divider vertical>Or</Divider>

              <Grid.Row verticalAlign='middle'>
                <Grid.Column>
                  <Header icon>
                    <Icon name='search'/>
                    Find Event
                  </Header><br/>
                  <Dropdown placeholder='Select Campus' search selection options={campusOptions}/>
                  <Button positive as={Link} to={`/edit/`}>Edit</Button>
                </Grid.Column>

                <Grid.Column>
                  <Header icon>
                    <Icon name='world'/>
                    Add New Event
                  </Header><br/>
                  <Button primary as={Link} to={`/add`}>Create</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
    )
  }
}

export default EventAdmin;