import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './SaveSVGModal.scss';

const SaveSVGModal = (props) => {

const [modal, setModal] = useState(true);

const toggle = () => {
  setModal(!modal);
}

return (
  <div>
      <Modal className="w-100" isOpen={modal} toggle={toggle}>
        <div className="SVGCodeModal">
          <ModalHeader toggle={toggle}>Viewbox Has Unsaved Changes</ModalHeader>
          <ModalBody className="modal-body">
            <p>
              Please save your current changes.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Disregard Changes</Button>{' '}
            <Button color="primary">Cancel</Button>{' '}
            <Button color="danger" onClick={toggle}>Save</Button>
          </ModalFooter>
        </div>
      </Modal>
  </div>
  )
}

export default SaveSVGModal;
