import React from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

import './SVGEditor.scss';
import userData from '../../../helpers/data/userData';
import elementData from '../../../helpers/data/elementData';
import SVGElementToolbox from '../SVGElementToolbox/SVGElementToolbox';
import SVGEditorViewbox from '../../shared/SVGEditorViewbox/SVGEditorViewbox';

import Rectangle from '../../shared/SVGElements/Rectangle/Rectangle';
import Circle from '../../shared/SVGElements/Circle/Circle';
import Ellipse from '../../shared/SVGElements/Ellipse/Ellipse';
import Polygon from '../../shared/SVGElements/Polygon/Polygon';
import Line from '../../shared/SVGElements/Line/Line';
import Polyline from '../../shared/SVGElements/Polyline/Polyline';
import Path from '../../shared/SVGElements/Path/Path';

class SVGEditor extends React.Component {
  static  propTypes = {
    authed: PropTypes.bool.isRequired
  }

  state = {
    user: {},
    userSVGs: [],
    userElements: [],
    defaultElements: [],
    viewboxAddElementIds: []    
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
    const { viewboxAddElementIds } = this.state;
    const joined = viewboxAddElementIds.concat(elementId)
    this.setState({ viewboxAddElementIds: joined });
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
    const { defaultElements, viewboxAddElementIds } = this.state;

    return (
      <div className="SVGEditor">
        <Container className="editor-window mt-3 rounded">
          Editor
          <hr/>
          <SVGEditorViewbox defaultElements={defaultElements} viewboxAddElementIds={viewboxAddElementIds} elementChoice={this.elementChoice}/>
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
