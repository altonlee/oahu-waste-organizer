import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table, Checkbox, Icon } from 'semantic-ui-react';

/** Renders a single bag in the InputData table. See pages/InputData.jsx. */
class Bag extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell collapsing><Checkbox/></Table.Cell>
          <Table.Cell collapsing>{this.props.data.type}</Table.Cell>
          <Table.Cell collapsing>{this.props.data.category}</Table.Cell>
          <Table.Cell collapsing>{this.props.data.weight}</Table.Cell>
          <Table.Cell collapsing>{this.props.data.volume}</Table.Cell>
          <Table.Cell>{this.props.data.notes}</Table.Cell>
          <Table.Cell collapsing>
            <Icon link name="edit"/>
            <Icon link name="delete"/>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
Bag.propTypes = {
  data: PropTypes.object.isRequired,

};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Bag);
