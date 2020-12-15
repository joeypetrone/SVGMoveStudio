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
    defaultElements: [],
    viewboxElements: []    
  }

  componentDidMount() {
    if (this.props.authed) {
      userData.getUserByFirebasaeUid()
          .then(user => (this.setState({ user })) );
    }

    elementData.getDefaultElements()
      .then(elements => this.setState({ defaultElements: elements }) )
  }

  addElementToViewbox = (element) => {
    const { viewboxElements } = this.state;
    const joined = viewboxElements.concat(<circle cx="50" cy="50" r="50" fill="Gold">Circle</circle>);
    console.log('element' , element.elementName);
    console.log('joined', joined);
    this.setState({ viewboxElements: joined });
  }

  render() {
    const { defaultElements, viewboxElements } = this.state;

    return (
      <div className="SVGEditor">
        <Container className="editor-window mt-3 rounded">
          Editor
          <hr/>
          <SVGEditorViewbox viewboxElements={viewboxElements}/>
        </Container>
        <Container className="editor-toolbox my-3 p-2 rounded">
          Toolbox
          <hr/>
          <SVGElementToolbox elements={defaultElements} addElementToViewbox={this.addElementToViewbox}/>
        </Container>
      </div>
    )
  }
}

export default SVGEditor;
