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

    return (
      <polygon points={element.points} fill={element.fill}>{element.elementName}</polygon>
    )
  }
}

export default Polygon;
