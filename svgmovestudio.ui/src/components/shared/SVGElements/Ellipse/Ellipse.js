import React from 'react';
import elementShape from '../../../../helpers/propz/elementShape';

class Ellipse extends React.Component {
  static propTypes = {
    element: elementShape.elementShape 
  }

  state = {
    ellipseXml: ''
  }

  componentDidMount() {
    const { element } = this.props;
    this.setState({
      ellipseXml: `<ellipse cx="${element.x_CoordinateStart}" cy="${element.y_CoordinateStart}" rx="${element.x_Radius}" ry="${element.y_Radius}" fill="${element.fill}" />`
    })
  }

  render() {
    const { element } = this.props;

    const transformEditors = () => {
      return `translate(${element.x_Translate}, ${element.y_Translate})
              scale(${element.scale})`
    }

    return (
      <ellipse 
        cx={element.x_CoordinateStart} 
        cy={element.y_CoordinateStart} 
        rx={element.x_Radius} 
        ry={element.y_Radius} 
        fill={element.fill}
        fill-opacity={element.fillOpacity} 
        opacity={element.opacity}
        stroke={element.stroke}
        stroke-width={element.strokeWidth}
        stroke-opacity={element.strokeOpacity}
        transform={transformEditors()} 
      />
    )
  }
}

export default Ellipse;
