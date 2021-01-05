import React from 'react';
import elementShape from '../../../../helpers/propz/elementShape';

class Circle extends React.Component {
  static propTypes = {
    element: elementShape.elementShape,
  }

  transformEditors = () => {
    const { element } = this.props;
    return `translate(${element.x_Translate}, ${element.y_Translate}) scale(${element.scale}) skewX(${element.x_Skew}) skewY(${element.y_Skew}) rotate(${element.rotate})`
  }

  render() {
    const { element } = this.props;
    
    element.XML = `<circle cx="${element.x_CoordinateStart}" cy="${element.y_CoordinateStart}" r="${element.x_Radius}" fill="${element.fill}" fill-opacity="${element.fillOpacity + '%'}" opacity="${element.opacity}" stroke="${element.stroke}" stroke-width="${element.strokeWidth}" stroke-opacity="${element.strokeOpacity + '%'}" transform="${this.transformEditors()}"/>`;

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
        transform={this.transformEditors()}    
      />
    )
  }
}

export default Circle;
