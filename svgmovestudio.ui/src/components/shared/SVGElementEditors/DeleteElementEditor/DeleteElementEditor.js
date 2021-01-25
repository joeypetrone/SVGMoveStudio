import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './DeleteElementEditor.scss';

class DeleteElementEditor extends React.Component {
  static propTypes = {
    updateElementSkew: PropTypes.func.isRequired,
    selectedElement: PropTypes.object.isRequired,
    deleteSelectedElement: PropTypes.func.isRequired
  }

  deleteElementEvent = (e) => {
    const {selectedElement, deleteSelectedElement} = this.props;
    e.preventDefault();

    deleteSelectedElement(selectedElement.tempId);
  }

  render() {
    return (
      <div className="DeleteElementEditor">
        Delete Element
        <hr/>
        <p className="p-3 border border-danger rounded text-left">The selected element will be deleted perminately.</p> 
        <Button color="danger" onClick={this.deleteElementEvent}>Delete</Button>
      </div>
    )
  }
}

export default DeleteElementEditor;
