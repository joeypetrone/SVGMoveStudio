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

    return (
      <path d={element.pathShape} fill={element.fill}>{element.elementName}</path>
    )
  }
}

export default Path;
