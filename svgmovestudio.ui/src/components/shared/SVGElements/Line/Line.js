import React from 'react';
import elementShape from '../../../../helpers/propz/elementShape';

class Line extends React.Component {
  static propTypes = {
    element: elementShape.elementShape 
  }

  state = {
    lineXml: ''
  }

  componentDidMount() {
    const { element } = this.props;
    this.setState({
      lineXml: `<line x1="${element.x_CoordinateStart}" y1="${element.y_CoordinateStart}" x2="${element.x_CoordinateEnd}" y2="${element.y_CoordinateEnd}" stroke="${element.stroke}" stroke-width="${element.strokeWidth}" />`
    })
  }

  render() {
    const { element } = this.props;

    const transformEditors = () => {
      return `translate(${element.x_Translate}, ${element.y_Translate})`
    }

    return (
      <line 
        x1={element.x_CoordinateStart} 
        y1={element.y_CoordinateStart} 
        x2={element.x_CoordinateEnd} 
        y2={element.y_CoordinateEnd} 
        stroke={element.stroke} 
        stroke-width={element.strokeWidth}
        stroke-opacity={element.strokeOpacity}
        transform={transformEditors()} 
      />
    )
  }
}

export default Line;
