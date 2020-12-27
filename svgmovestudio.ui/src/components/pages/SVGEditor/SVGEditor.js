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

  addElementToViewbox = (elementId) => {
    const { defaultElements, viewboxElements } = this.state;
    const elementToAdd = Object.assign({}, defaultElements.find(element => element.elementId === parseInt(elementId)));
    elementToAdd.tempId = viewboxElements.length;
    const joined = viewboxElements.concat(elementToAdd);
    this.setState({ viewboxElements: joined });
  }

  updateElementPosition = (x_position, y_position) => {
    const { selectedElement } = this.state;
    if (x_position === null) {
      selectedElement.y_Translate = y_position;
      this.forceUpdate()
    } else if (y_position === null) {
      selectedElement.x_Translate = x_position;
      this.forceUpdate()
    } else {
      selectedElement.x_Translate = x_position;
      selectedElement.y_Translate = y_position;
      this.forceUpdate()
    }
  }

  updateElementScale = (scale, strokeWidth) => {
    const { selectedElement } = this.state;
    if (scale === null) {
      selectedElement.strokeWidth = strokeWidth;
      this.forceUpdate()
    } else if (strokeWidth === null) {
      selectedElement.scale = scale;
      this.forceUpdate()    
    } else {
      selectedElement.scale = scale;
      selectedElement.strokeWidth = strokeWidth;
      this.forceUpdate()
    }
  }

  updateElementColor = (fillColor, fillOpacity, strokeColor, strokeOpacity) => {
    const { selectedElement } = this.state;
    selectedElement.fill = fillColor;
    selectedElement.fillOpacity = fillOpacity / 10;
    selectedElement.stroke = strokeColor;
    selectedElement.strokeOpacity = strokeOpacity / 10;
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
        if (element.tempId === undefined) {
          return <Rectangle key={element.elementId} element={element}/>;
        } else {
          return <Rectangle key={element.tempId} element={element}/>;
        }
      case 2: 
        if (element.tempId === undefined) {
          return <Circle key={element.elementId} element={element}/>;
        } else {
          return <Circle key={element.tempId} element={element}/>;
        }
      case 3:
        if (element.tempId === undefined) {
          return <Ellipse key={element.elementId} element={element}/>;
        } else {
          return <Ellipse key={element.tempId} element={element}/>;
        }
      case 4:
        if (element.tempId === undefined) {
          return <Polygon key={element.elementId} element={element}/>;
        } else {
          return <Polygon key={element.tempId} element={element}/>;
        }
      case 5:
        if (element.tempId === undefined) {
          return <Line key={element.elementId} element={element}/>;
        } else {
          return <Line key={element.tempId} element={element}/>;
        }
      case 6:
        if (element.tempId === undefined) {
          return <Polyline key={element.elementId} element={element}/>;
        } else {
          return <Polyline key={element.tempId} element={element}/>;
        }
      case 7:
        if (element.tempId === undefined) {
          return <Path key={element.elementId} element={element}/>;
        } else {
          return <Path key={element.tempId} element={element}/>;
        }
      default:
        return element.elementName;
    }
  }

  render() {
    const { defaultElements, viewboxElements, selectedEditor, selectedElement } = this.state;

    return (
      <div className="SVGEditor">
        <Container className="editor-window mt-3 rounded">
          <SVGEditorNavbar 
            openSelectedEditor={this.openSelectedEditor} 
            viewboxElements={viewboxElements} 
            setSelectedElement={this.setSelectedElement}
          />
          <Row className="mx-0">
            <SVGEditorViewbox 
              defaultElements={defaultElements} 
              selectedElement={selectedElement} 
              viewboxElements={viewboxElements} 
              elementChoice={this.elementChoice}
            />
            <SVGEditorSidePanel 
              selectedEditor={selectedEditor} 
              selectedElement={selectedElement} 
              updateElementPosition={this.updateElementPosition} 
              updateElementScale={this.updateElementScale}
              updateElementColor={this.updateElementColor}
            />
          </Row>
        </Container>
        <Container className="editor-toolbox my-3 p-2 rounded">
          Toolbox
          <hr/>
          <SVGElementToolbox 
            defaultElements={defaultElements} 
            addElementToViewbox={this.addElementToViewbox} 
            elementChoice={this.elementChoice}
          />
        </Container>
      </div>
    )
  }
}

export default SVGEditor;
