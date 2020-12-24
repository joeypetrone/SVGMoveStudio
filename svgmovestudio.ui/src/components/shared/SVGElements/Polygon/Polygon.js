import React from 'react';
import elementShape from '../../../../helpers/propz/elementShape';

class Polygon extends React.Component {
  static propTypes = {
    element: elementShape.elementShape 
  }

  state = {
    polygonXml: ''
  }

  componentDidMount() {
    const { element } = this.props;
    this.setState({
      polygonXml: `<polygon points="${element.points}" fill="${element.fill}" />`
    })
  }



  render() {
    const { element } = this.props;

    const transformEditors = () => {
      return `translate(${element.x_Translate}, ${element.y_Translate})
              scale(${element.scale})`
    }

    return (
      <polygon 
        points={element.points} 
        fill={element.fill} 
        fillOpacity={element.fillOpacity}
        opacity={element.opacity}
        stroke={element.stroke}
        stroke-width={element.strokeWidth}
        stroke-opacity={element.strokeOpacity}
        transform={transformEditors()}
      />
    )
  }
}

export default Polygon;
