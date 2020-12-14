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

    return (
      <line x1={element.x_CoordinateStart} y1={element.y_CoordinateStart} x2={element.x_CoordinateEnd} y2={element.y_CoordinateEnd} stroke={element.stroke} stroke-width={element.strokeWidth}>{element.elementName}</line>
    )
  }
}

export default Line;
