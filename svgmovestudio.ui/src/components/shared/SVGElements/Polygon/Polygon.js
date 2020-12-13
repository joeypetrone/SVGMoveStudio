import React from 'react';
import elementShape from '../../../../helpers/propz/elementShape';
import './Polygon.scss';

class Polygon extends React.Component {
  static propTypes = {
    element: elementShape.elementShape 
  }

  render() {
    const { element } = this.props;

    return (
      <polygon points={element.points} fill={element.fill}>{element.elementName}</polygon>
    )
  }
}

export default Polygon;
