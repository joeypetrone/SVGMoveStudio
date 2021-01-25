import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './DeleteElementEditor.scss';

class DeleteElementEditor extends React.Component {
  static propTypes = {
    selectedElement: PropTypes.object.isRequired,
    deleteSelectedElement: PropTypes.func.isRequired
  }

  state = {
    disable: false
  }

  componentDidMount() {
    const { selectedElement } = this.props;

    if (selectedElement) {
      if(Object.entries(selectedElement).length === 0) {
        this.setState({ disable: true })
      } else {
        this.setState({ disable: false })
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedElement } = this.props;

    if (prevProps.selectedElement !== selectedElement) {
      if (selectedElement) {
        if(Object.entries(selectedElement).length === 0) {
          this.setState({ disable: true })
        } else {
          this.setState({ disable: false })
        }
      }
    }
  }

  deleteElementEvent = (e) => {
    const {selectedElement, deleteSelectedElement} = this.props;
    e.preventDefault();
    if(Object.entries(selectedElement).length === 0) {
      this.setState({ disable: true })
    } else {
      this.setState({ disable: false })
    }
    deleteSelectedElement(selectedElement.tempId);
  }

  render() {
    const { disable } = this.state;

    return (
      <div className="DeleteElementEditor">
        Delete Element
        <hr/>
        <p className="p-3 border border-danger rounded text-left">The selected element will be deleted perminately.</p> 
        <Button color="danger" onClick={this.deleteElementEvent} disabled={disable}>Delete</Button>
      </div>
    )
  }
}

export default DeleteElementEditor;
