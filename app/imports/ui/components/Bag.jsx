import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table, Icon, Confirm } from 'semantic-ui-react';
import { Bags } from '/imports/api/bags/bags';

/** Renders a single bag in the InputData table. See pages/InputData.jsx. */
class Bag extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.deleteCallback = this.deleteCallback.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.showConfirm = this.showConfirm.bind(this);
    this.hideConfirm = this.hideConfirm.bind(this);
  }

  /** Notify user that bag is deleted. */
  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Deleted bag.' });
    }
  }

  /** Shows sidebar. */
  showConfirm() {
    this.setState({ visible: true });
  }

  /** Hides sidebar. */
  hideConfirm() {
    this.setState({ visible: false });
  }

  /** Deletes Bag. */
  handleDelete(event) {
    Bags.remove(this.props.data._id, this.deleteCallback);
  }

  render() {
    const visible = this.state;
    return (
        <Table.Row>
          <Table.Cell collapsing>{this.props.data.category}</Table.Cell>
          <Table.Cell collapsing>{this.props.data.name}</Table.Cell>
          <Table.Cell collapsing>{this.props.data.weight}</Table.Cell>
          <Table.Cell collapsing>{this.props.data.volume}</Table.Cell>
          <Table.Cell>{this.props.data.notes}</Table.Cell>
          <Table.Cell collapsing>
            <Icon link name="edit"/>
            <Icon link name="delete" onClick={this.showConfirm}/>
            <Confirm open={this.state.visible}
                     header="Deleting bag..."
                     content="Delete this bag? This action cannot be undone!"
                     onCancel={this.hideConfirm}
                     onConfirm={this.handleDelete}
            />
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
