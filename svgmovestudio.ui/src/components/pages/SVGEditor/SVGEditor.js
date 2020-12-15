import React from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

import './SVGEditor.scss';
import userData from '../../../helpers/data/userData';
import elementData from '../../../helpers/data/elementData';
import SVGElementToolbox from '../SVGElementToolbox/SVGElementToolbox';
import SVGEditorViewbox from '../../shared/SVGEditorViewbox/SVGEditorViewbox';

class SVGEditor extends React.Component {
  static  propTypes = {
    authed: PropTypes.bool.isRequired
  }

  state = {
    user: {},
    userSVGs: [],
    userElements: [],
    defaultElements: []    
  }

  componentDidMount() {
    if (this.props.authed) {
      userData.getUserByFirebasaeUid()
          .then(user => (this.setState({ user })) );
    }

    elementData.getDefaultElements()
      .then(elements => this.setState({ defaultElements: elements }) )
  }

  render() {
    const { defaultElements } = this.state;

    return (
      <div className="SVGEditor">
        <Container className="editor-window mt-3 rounded">
          Editor
          <hr/>
          <SVGEditorViewbox />
        </Container>
        <Container className="editor-toolbox my-3 p-2 rounded">
          Toolbox
          <hr/>
          <SVGElementToolbox elements={defaultElements}/>
        </Container>
      </div>
    )
  }
}

export default SVGEditor;
