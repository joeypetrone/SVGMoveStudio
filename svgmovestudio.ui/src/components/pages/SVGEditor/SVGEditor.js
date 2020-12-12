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
      if (element.elementName === 'Circle') {
        return (<svg width="100" height="100">
                  <circle cx={element.x_CoordinateStart} cy={element.y_CoordinateStart} r={element.x_Radius} fill="red" />
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
          <h3>{user.firstName + ' ' + user.lastName}</h3>
          <CardImg className="rounded w-25" src={user.photoUrl} alt="user"/>
        </Container>
        <Container className="editor-toolbox my-3 rounded">
          Toolbox
          <hr/>
          {buildDefaultElements}
        </Container>
      </div>
    )
  }
}

export default SVGEditor;
