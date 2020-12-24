import React from 'react';
import elementShape from '../../../../helpers/propz/elementShape';

class Path extends React.Component {
  static propTypes = {
    element: elementShape.elementShape 
  }

  state = {
    pathXml: ''
  }

  componentDidMount() {
    const { element } = this.props;
    this.setState({
      pathXml: `<path d="${element.pathShape}" fill="${element.fill}" />`
    })
  }

  render() {
    const { element } = this.props;

    const transformEditors = () => {
      return `translate(${element.x_Translate}, ${element.y_Translate})
              scale(${element.scale})`
    }

    return (
      <path 
        d={element.pathShape} 
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

export default Path;
