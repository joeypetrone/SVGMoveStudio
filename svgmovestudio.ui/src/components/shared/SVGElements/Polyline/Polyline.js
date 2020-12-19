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

    const transformEditors = () => {
      return `translate(${element.x_Translate}, ${element.y_Translate})`
    }

    return (
      <polyline 
        points={element.points} 
        stroke={element.stroke} 
        stroke-width={element.strokeWidth} 
        fill={element.fill} 
        fillOpacity={element.fillOpacity}
        opacity={element.opacity}
        transform={transformEditors()}
      />
    )
  }
}

export default Polyline;
