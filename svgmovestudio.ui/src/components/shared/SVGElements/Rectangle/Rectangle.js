import React from 'react';
import elementShape from '../../../../helpers/propz/elementShape';
import './Rectangle.scss';

class Rectangle extends React.Component {
  static propTypes = {
    element: elementShape.elementShape 
  }

  state = {
    RectangleData: ''
  }

  render() {
    const { element } = this.props;

    return (
      <rect x={element.x_CoordinateStart} width={element.width} height={element.height} fill={element.fill}>{element.elementName}</rect>
    )
  }
}

export default Rectangle;
