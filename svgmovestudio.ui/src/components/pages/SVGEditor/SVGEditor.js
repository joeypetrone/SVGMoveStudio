import React from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

import './SVGEditor.scss';
import userData from '../../../helpers/data/userData';

class SVGEditor extends React.Component {
  static  propTypes = {
    authed: PropTypes.bool.isRequired
  }

  state = {
    user: {}
  }

  componentDidMount() {
    if (this.props.authed) {
      userData.getUserByFirebasaeUid()
          .then(user => (this.setState({ user })) );
    }
  }

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
