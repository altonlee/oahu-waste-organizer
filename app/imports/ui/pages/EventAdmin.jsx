import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Container, Segment, Grid, Divider, Icon, Button, Header, Dropdown } from 'semantic-ui-react';
import { Data } from '/imports/api/data/data';

class EventAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = { docID: '' };
    this.handleChange = this.handleChange.bind(this);
    this.listEvents = this.listEvents.bind(this);
  }

  /** Populates dropdown with existing Events. */
  listEvents(data) {
    const options = [];
    for (let i = 0; i < data.length; i++) {
      options.push({
        key: i,
        text: `${data[i].date}: ${data[i].building}`,
        value: data[i]._id,
      });
    }
    return options;
  }

  /** Handles changes to input fields. */
  handleChange(event, { name, value }) {
    this.setState({ [name]: value });
  }

  render() {
    const { docID } = this.state;
    const isEnabled = docID.length > 0;

    return (
        <Container textAlign="center" style={{ paddingBottom: '15px' }}>
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
                  <Container>
                    <Dropdown floating search selection
                              options={this.listEvents(this.props.data)}
                              name="docID"
                              placeholder='Select an event to edit.'
                              value={docID}
                              onChange={this.handleChange}
                    />
                    <Button color="yellow"
                            as={Link} to={`/edit/${docID}`}
                            floated="right"
                            disabled={!isEnabled}
                    >
                      Edit
                    </Button>
                  </Container>
                </Grid.Column>

                <Grid.Column>
                  <Header icon>
                    <Icon name='world'/>
                    Add New Event
                  </Header><br/>
                  <Button primary as={Link} to={'/add'}>Create</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
    );
  }
}

/** Require an array of Events in the props. */
EventAdmin.propTypes = {
  data: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to audit data.
  const subscription = Meteor.subscribe('Data');
  return {
    data: Data.find({}, { sort: { date: -1 } }).fetch(),
    ready: subscription.ready(),
  };
})(EventAdmin);
