import React from 'react';
import { Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import './SVGEditor.scss';
import userData from '../../../helpers/data/userData';
import elementData from '../../../helpers/data/elementData';
import SVGElementToolbox from '../../shared/SVGElementToolbox/SVGElementToolbox';
import SVGEditorViewbox from '../../shared/SVGEditorViewbox/SVGEditorViewbox';

import Rectangle from '../../shared/SVGElements/Rectangle/Rectangle';
import Circle from '../../shared/SVGElements/Circle/Circle';
import Ellipse from '../../shared/SVGElements/Ellipse/Ellipse';
import Polygon from '../../shared/SVGElements/Polygon/Polygon';
import Line from '../../shared/SVGElements/Line/Line';
import Polyline from '../../shared/SVGElements/Polyline/Polyline';
import Path from '../../shared/SVGElements/Path/Path';
import SVGEditorSidePanel from '../../shared/SVGEditorSidePanel/SVGEditorSidePanel';
import SVGEditorNavbar from '../../shared/SVGEditorNavbar/SVGEditorNavbar';

class SVGEditor extends React.Component {
  static  propTypes = {
    authed: PropTypes.bool.isRequired
  }

  state = {
    user: {},
    userSVGs: [],
    userElements: [],
    defaultElements: [],
    viewboxAddElementIds: [],
    viewboxElements: [],
    editorObject: {},
    selectedEditor: '',
    selectedElement: {}
  }

  componentDidMount() {
    if (this.props.authed) {
      userData.getUserByFirebasaeUid()
          .then(user => (this.setState({ user })) );
    }

    elementData.getDefaultElements()
      .then(elements => this.setState({ defaultElements: elements }) )
  }

  // addElementToViewbox = (elementId) => {
  //   const { viewboxAddElementIds } = this.state;
  //   const joined = viewboxAddElementIds.concat(elementId)
  //   this.setState({ viewboxAddElementIds: joined });
  // }

  addElementToViewbox = (elementId) => {
    const { defaultElements, viewboxElements } = this.state;
    const elementToAdd = Object.assign({}, defaultElements.find(element => element.elementId === parseInt(elementId)));
    elementToAdd.tempId = viewboxElements.length;
    const joined = viewboxElements.concat(elementToAdd);
    this.setState({ viewboxElements: joined });
  }

  createMoveElementObject = (x_position, y_position) => {
    this.setState({
      editorObject: {
        x_position,
        y_position
      }
    })
  }

  updateElementPosition = (x_position, y_position) => {
    const { selectedElement } = this.state;
    selectedElement.x_Translate = x_position;
    selectedElement.y_Translate = y_position;
    this.forceUpdate()
  }

  updateElementColor = (fillColor, fillOpacity) => {
    const { selectedElement } = this.state;
    selectedElement.fill = fillColor;
    selectedElement.fillOpacity = fillOpacity / 10;
    this.forceUpdate()
  }

  openSelectedEditor = (editorName) => {
    this.setState({selectedEditor: editorName})
  }

  setSelectedElement = (element) => {
    this.setState({selectedElement: element});
  }

  elementChoice = (element) => {
    switch(element.elementTypeId) {
      case 1:
        return <Rectangle element={element}/>;
      case 2: 
        return <Circle element={element}/>;
      case 3:
        return <Ellipse element={element}/>;
      case 4:
        return <Polygon element={element}/>;
      case 5:
        return <Line element={element}/>;
      case 6:
        return <Polyline element={element}/>
      case 7:
        return <Path element={element}/>;                                    
      default:
        return element.elementName;
    }
  }

  render() {
    const { defaultElements, viewboxElements, editorObject, selectedEditor, selectedElement } = this.state;

    return (
      <div className="SVGEditor">
        <Container className="editor-window mt-3 rounded">
          <SVGEditorNavbar openSelectedEditor={this.openSelectedEditor} viewboxElements={viewboxElements} setSelectedElement={this.setSelectedElement}/>
          <Row className="mx-0">
            <SVGEditorViewbox defaultElements={defaultElements} selectedElement={selectedElement} viewboxElements={viewboxElements} elementChoice={this.elementChoice} editorObject={editorObject}/>
            <SVGEditorSidePanel selectedEditor={selectedEditor} selectedElement={selectedElement} updateElementPosition={this.updateElementPosition} updateElementColor={this.updateElementColor}/>
          </Row>
        </Container>
        <Container className="editor-toolbox my-3 p-2 rounded">
          Toolbox
          <hr/>
          <SVGElementToolbox defaultElements={defaultElements} addElementToViewbox={this.addElementToViewbox} elementChoice={this.elementChoice}/>
        </Container>
      </div>
    )
  }
}

export default SVGEditor;
