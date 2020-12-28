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

    const transformEditors = () => {
      return `translate(${element.x_Translate}, ${element.y_Translate})
              scale(${element.scale})
              skewX(${element.x_Skew})
              skewY(${element.y_Skew})`
    }

    return (
      <circle 
        cx={element.x_CoordinateStart} 
        cy={element.y_CoordinateStart} 
        r={element.x_Radius} 
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

export default Circle;
