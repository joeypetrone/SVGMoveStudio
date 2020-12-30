import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './SVGCodeModal.scss';

const SVGCodeModal = (props) => {
  const {
    viewboxElements
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  const copyToClipBoard = () =>{

    document.execCommand('copy');
    toggle();
  }

  const buildSVGCode = viewboxElements.map((element) => {
    return element.XML;
  })

  return (
    <div>
      <Button className="mr-2" color="dark" onClick={toggle}>Generate Code</Button>
      <Modal className="w-100" isOpen={modal} toggle={toggle}>
        <div className="SVGCodeModal">
          <ModalHeader toggle={toggle}>SVG Generated Code</ModalHeader>
          <ModalBody className="modal-body">
            <textarea className="modal-text-area px-2 pt-1 pb-2 w-100 border-0 rounded"
              value={`<svg width="800" height="500" viewBox="0 0 800 500">${buildSVGCode}</svg>`}
            />
          {/* {'<svg width="800" height="500" viewBox="0 0 800 500">'}
            {buildSVGCode}
          {'</svg>'} */}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={copyToClipBoard}>Copy Code</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </div>
      </Modal>
    </div>
  );
}

export default SVGCodeModal;
