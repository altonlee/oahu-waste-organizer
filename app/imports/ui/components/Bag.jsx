import React from 'react';
import { Button, Divider, List, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single bag in the InputData table. See pages/InputData.jsx. */
class Bag extends React.Component {
  render() {
    return (
        <div className='input-bag'>
          <List horizontal relaxed='very' style={{ width: '100%' }}>
            <List.Item style={{ width: '20px', paddingRight: 0 }}>
              <List.Content>
                <Checkbox/>
              </List.Content>
            </List.Item>
            <List.Item style={{ width: '150px' }}>
              <List.Content>
                <List.Header>Category</List.Header>
                {this.props.category}
              </List.Content>
            </List.Item>
            <List.Item style={{ width: '105px' }}>
              <List.Content>
                <List.Header>Weight</List.Header>
                {this.props.weight} lbs
              </List.Content>
            </List.Item>
            <List.Item style={{ width: '105px' }}>
              <List.Content>
                <List.Header>Volume</List.Header>
                {this.props.volume} gal
              </List.Content>
            </List.Item>
            <List.Item style={{ width: 'calc(100% - 476px)' }}>
              <List.Header>Notes</List.Header>
              <div style={{ overflow: 'hidden', height: '1em', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{this.props.notes}</div>
            </List.Item>
            <List.Item style={{ marginLeft: 'auto', width: '96px' }}>
              <List.Content verticalAlign='middle'>
                <Button disabled={this.props.visible} onClick={this.props.handleShowClick}>
                  Edit
                </Button>
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
