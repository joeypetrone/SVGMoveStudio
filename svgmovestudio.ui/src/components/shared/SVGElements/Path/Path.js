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
      return `translate(${element.x_Translate}, ${element.y_Translate})`
    }

    return (
      <path 
        d={element.pathShape} 
        fill={element.fill}
        opacity={element.opacity}
        transform={transformEditors()}
      />
    )
  }
}

export default Path;
