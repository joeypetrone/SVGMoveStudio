import React from 'react';
import { CardImg, Container } from 'reactstrap';
import PropTypes, { element } from 'prop-types';

import './SVGEditor.scss';
import userData from '../../../helpers/data/userData';
import elementData from '../../../helpers/data/elementData';

class SVGEditor extends React.Component {
  static  propTypes = {
    authed: PropTypes.bool.isRequired
  }

  state = {
    user: {},
    userSVGs: {},
    userElements: {},
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
    const { user, defaultElements } = this.state;

    const buildDefaultElements = defaultElements.map(element => {
      if (element.elementTypeId === 2) {
        return (<svg width="100" height="100">
                  <circle cx={element.x_CoordinateStart} cy={element.y_CoordinateStart} r={element.x_Radius} fill="red" />
                </svg>) 
      }
      else if (element.elementTypeId === 1) {
        return (<svg width="100" height="100">
                    <rect x={element.x_CoordinateStart} y={element.y_CoordinateStart} width={element.width} height={element.height} />
                </svg>) 
      } 
      else {
        return <span>{element.elementName}</span>
      }
    })

    return (
      <div className="SVGEditor">
        <Container className="editor-window mt-3 rounded">
          Editor
          <hr/>
        </Container>
        <Container className="editor-toolbox my-3 rounded">
          Toolbox
          <hr/>
          <div className="d-flew row justify-content-between p-3">
            {buildDefaultElements}
          </div>
        </Container>
      </div>
    )
  }
}

export default SVGEditor;
