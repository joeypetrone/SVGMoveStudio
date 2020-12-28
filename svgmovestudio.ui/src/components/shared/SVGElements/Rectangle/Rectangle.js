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

    const transformEditors = () => {
      return `translate(${element.x_Translate}, ${element.y_Translate})
              scale(${element.scale})
              skewX(${element.x_Skew})
              skewY(${element.y_Skew})
              rotate(${element.rotate})`
    }

    return (
      <rect 
        x={element.x_CoordinateStart} 
        y={element.y_CoordinateStart} 
        width={element.width} 
        height={element.height} 
        fill={element.fill}
        fillOpacity={element.fillOpacity + '%'} 
        opacity={element.opacity} 
        stroke={element.stroke}
        strokeWidth={element.strokeWidth}
        strokeOpacity={element.strokeOpacity + '%'}
        transform={transformEditors()}
      />
    )
  }
}

export default Rectangle;
