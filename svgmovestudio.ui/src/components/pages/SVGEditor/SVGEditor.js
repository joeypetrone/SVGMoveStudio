import React from 'react';
import { Container } from 'reactstrap';

import './SVGEditor.scss';

class SVGEditor extends React.Component {
  render() {
    return (
      <div className="SVGEditor">
        <Container className="editor-window mt-3 rounded">
          Editor
        </Container>
        <Container className="editor-toolbox my-3 rounded">
          Toolbox
        </Container>
      </div>
    )
  }
}

export default SVGEditor;
