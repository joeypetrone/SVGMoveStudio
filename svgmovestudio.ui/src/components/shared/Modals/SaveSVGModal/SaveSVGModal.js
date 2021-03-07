import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './SaveSVGModal.scss';

const SaveSVGModal = (props) => {
  const {
    isSaveSvgModalOpen,
    toggleSaveSvgModal,
    disregardCurrentSvgChanges
  } = props;

const toggle = () => {
  console.log('in modal toggle')
  toggleSaveSvgModal()
}

const disregardChangesEvent = () => {
  disregardCurrentSvgChanges();
  toggle();
}

return (
  <div className="SaveSVGModal">
      <Modal className="w-100" isOpen={isSaveSvgModalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Viewbox Has Unsaved Changes</ModalHeader>
        <ModalBody className="modal-body">
          <p>
            Please save your current changes.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={disregardChangesEvent}>Disregard Changes</Button>{' '}
          <Button color="primary" onClick={toggle}>Cancel</Button>{' '}
          <Button color="danger" onClick={toggle}>Save</Button>
        </ModalFooter>
      </Modal>
  </div>
  )
}

export default SaveSVGModal;
