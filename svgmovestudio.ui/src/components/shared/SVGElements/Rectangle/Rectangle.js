import React from 'react';
import elementShape from '../../../../helpers/propz/elementShape';

class Rectangle extends React.Component {
  static propTypes = {
    element: elementShape.elementShape 
  }

  state = {
    rectangleXml: ''
  }

  componentDidMount() {
    const { element } = this.props;
    this.setState({
      rectangleXml: `<rect x="${element.x_CoordinateStart}" x="${element.y_CoordinateStart}" width="${element.width}" height="${element.height}" fill="${element.fill}" />`
    })
  }

  render() {
    const { element } = this.props; 

    return (
      <rect x={element.x_CoordinateStart} y={element.y_CoordinateStart} width={element.width} height={element.height} fill={element.fill}>{element.elementName}</rect>
    )
  }
}

export default Rectangle;
