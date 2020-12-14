import React from 'react';
import elementShape from '../../../../helpers/propz/elementShape';

class Polyline extends React.Component {
  static propTypes = {
    element: elementShape.elementShape 
  }

  state = {
    polylineXml: ''
  }

  componentDidMount() {
    const { element } = this.props;
    this.setState({
      polylineXml: `<polyline points="${element.points}" stroke="${element.stroke}" stroke-width="${element.strokeWidth}" fill="${element.fill}" />`
    })
  }

  render() {
    const { element } = this.props;

    return (
      <polyline points={element.points} stroke={element.stroke} stroke-width={element.strokeWidth} fill={element.fill}>{element.elementName}</polyline>
    )
  }
}

export default Polyline;
