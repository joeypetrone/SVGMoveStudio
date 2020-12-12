import React from 'react';
import { Card, Button } from 'reactstrap';
import './SVGElementToolbox.scss';

class SVGElementToolbox extends React.Component {
  static propTypes = {
    elements: []
  }

  render() {
    const {elements} = this.props;

    const elementChoice = (element) => {
      switch(element.elementTypeId) {
        case 1:
          return <rect x={element.x_CoordinateStart} width={element.width} height={element.height} fill={element.fill}>{element.elementName}</rect>;
        case 2:
          return <circle cx={element.x_CoordinateStart} cy={element.y_CoordinateStart} r={element.x_Radius} fill={element.fill}>{element.elementName}</circle>;
        case 3:
          return <ellipse cx={element.x_CoordinateStart} cy={element.y_CoordinateStart} rx={element.x_Radius} ry={element.y_Radius} fill={element.fill}>{element.elementName}</ellipse>;
        case 4:
          return <polygon points={element.points} fill={element.fill}>{element.elementName}</polygon>;
        case 5:
          return <line x1={element.x_CoordinateStart} y1={element.y_CoordinateStart} x2={element.x_CoordinateEnd} y2={element.y_CoordinateEnd} stroke={element.stroke} stroke-width={element.strokeWidth}>{element.elementName}</line>;
        case 6:
          return <polyline points={element.points} stroke={element.stroke} stroke-width={element.strokeWidth} fill={element.fill}>{element.elementName}</polyline>;
        case 7:
          return <path d={element.pathShape} fill={element.fill}>{element.elementName}</path>;                                    
        default:
          return element.elementName;
      }
    }

    const buildElements = elements.map(element => {
      return (
        <Card className="px-3 pb-3 pt-0">
          <small className="m-1 mb-2 pb-1 border-bottom">{element.elementName}</small>
          <svg width="100" height="100" viewBox="0 0 100 100">{elementChoice(element)}</svg>
          <Button className="btn-sm m-1 mt-3">Add</Button>
        </Card>
        )
    })

    return (
      <div className="SVGElementToolbox d-flew row justify-content-between m-3">
        {buildElements}
      </div>
    )
  }
}

export default SVGElementToolbox;
