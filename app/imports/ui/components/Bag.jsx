import React from 'react';
import { Button, Divider, Form, Header, List, TextArea } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single bag in the InputData table. See pages/InputData.jsx. */
class Bag extends React.Component {
  render() {
    return (
        <div>
          <List horizontal relaxed='very' style={{ display: 'flex', width: '100%' }}>
            <List.Item>
              <List.Content>
                <List.Header>Category</List.Header>
                {this.props.category}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Weight</List.Header>
                {this.props.weight} lbs
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Volume</List.Header>
                {this.props.volume} gal
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Header>Notes</List.Header>
              {this.props.notes}
            </List.Item>
            <List.Item style={{ marginLeft: 'auto' }}>
              <List.Content floated='right' verticalAlign='middle'>
                <Button disabled={this.props.visible} onClick={this.props.handleShowClick}>Edit</Button>
              </List.Content>
            </List.Item>
          </List>
          <Divider/>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
Bag.propTypes = {
  handleShowClick: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
  notes: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Bag;
