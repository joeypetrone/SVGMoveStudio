import React from 'react';
import elementShape from '../../../../helpers/propz/elementShape';

class Circle extends React.Component {
  static propTypes = {
    element: elementShape.elementShape, 
  }

  componentDidMount() {
    const { element } = this.props;
    this.setState({
      circleXml: `<circle cx="${element.x_CoordinateStart}" cy="${element.y_CoordinateStart}" r="${element.x_Radius}" fill="${element.fill}" />`
    })
  }

  render() {
    const { element } = this.props;

    return (
      <circle cx={element.x_CoordinateStart} cy={element.y_CoordinateStart} r={element.x_Radius} fill={element.fill} opacity={element.opacity}>{element.elementName}</circle>
    )
  }
}

export default Circle;
