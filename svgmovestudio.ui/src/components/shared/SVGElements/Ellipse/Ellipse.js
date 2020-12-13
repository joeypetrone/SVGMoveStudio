import React from 'react';
import elementShape from '../../../../helpers/propz/elementShape';
import './Ellipse.scss';

class Ellipse extends React.Component {
  static propTypes = {
    element: elementShape.elementShape 
  }

  render() {
    const { element } = this.props;

    return (
      <ellipse cx={element.x_CoordinateStart} cy={element.y_CoordinateStart} rx={element.x_Radius} ry={element.y_Radius} fill={element.fill}>{element.elementName}</ellipse>
    )
  }
}

export default Ellipse;
