import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

// Asks for a name the first time a new SVG is saved.
class NameSVGModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    saveNewSvg: PropTypes.func.isRequired
  }

  state = {
    name: '',
    nameError: ''
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isOpen && this.props.isOpen) {
      this.setState({ name: '', nameError: '' });
    }
  }

  nameChange = (e) => {
    this.setState({ name: e.target.value, nameError: '' });
  }

  submitEvent = (e) => {
    e.preventDefault();
    const name = this.state.name.trim();

    if (!name) {
      this.setState({ nameError: 'Give your SVG a name.' });
      return;
    }
    if (name.length > 50) {
      this.setState({ nameError: 'Use at most 50 characters.' });
      return;
    }

    this.props.saveNewSvg(name);
  }

  render() {
    const { isOpen, isSaving, toggle } = this.props;
    const { name, nameError } = this.state;

    return (
      <Modal isOpen={isOpen} toggle={toggle} autoFocus={false}>
        <Form noValidate onSubmit={this.submitEvent}>
          <ModalHeader toggle={toggle}>Save New SVG</ModalHeader>
          <ModalBody>
            <FormGroup className="mb-0">
              <Label for="svg-name">Name</Label>
              <Input
                id="svg-name"
                name="svgName"
                placeholder="My SVG"
                maxLength={60}
                autoFocus
                value={name}
                invalid={!!nameError}
                onChange={this.nameChange}
              />
              <FormFeedback>{nameError}</FormFeedback>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="button" color="secondary" onClick={toggle} disabled={isSaving}>Cancel</Button>
            <Button type="submit" color="danger" disabled={isSaving}>{isSaving ? 'Saving…' : 'Save'}</Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default NameSVGModal;
