import React from 'react';
import elementShape from '../../../../helpers/propz/elementShape';

class Line extends React.Component {
  static propTypes = {
    element: elementShape.elementShape 
  }

  transformEditors = () => {
    const { element } = this.props;
    return `translate(${element.x_Translate}, ${element.y_Translate}) scale(${element.scale}) skewX(${element.x_Skew}) skewY(${element.y_Skew}) rotate(${element.rotate})`
  }

  render() {
    const { element } = this.props;

    element.XML = `<line x1="${element.x_CoordinateStart}" y1="${element.y_CoordinateStart}" x2="${element.x_CoordinateEnd}" y2="${element.y_CoordinateEnd}" stroke="${element.stroke}" stroke-width="${element.strokeWidth}" transform="${this.transformEditors()}"/>`;

    return (
      <line 
        x1={element.x_CoordinateStart} 
        y1={element.y_CoordinateStart} 
        x2={element.x_CoordinateEnd} 
        y2={element.y_CoordinateEnd} 
        stroke={element.stroke} 
        strokeWidth={element.strokeWidth}
        strokeOpacity={element.strokeOpacity + '%'}
        transform={this.transformEditors()} 
      />
    )
  }
}

export default Line;
