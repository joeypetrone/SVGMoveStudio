import React from 'react';
import { Card, Button } from 'reactstrap';
import Rectangle from '../../shared/SVGElements/Rectangle/Rectangle';
import Circle from '../../shared/SVGElements/Circle/Circle';
import Ellipse from '../../shared/SVGElements/Ellipse/Ellipse';
import Polygon from '../../shared/SVGElements/Polygon/Polygon';
import Line from '../../shared/SVGElements/Line/Line';
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
          return <Rectangle element={element}/>;
        case 2: 
          return <Circle element={element}/>;
        case 3:
          return <Ellipse element={element}/>;
        case 4:
          const polygon = <Polygon element={element}/>
          console.log('polygon in elementChoice', polygon)
          return <Polygon element={element}/>;
        case 5:
          return <Line element={element}/>;
        case 6:
          return <polyline points={element.points} stroke={element.stroke} stroke-width={element.strokeWidth} fill={element.fill}>{element.elementName}</polyline>;
        case 7:
          return <path d={element.pathShape} fill={element.fill}>{element.elementName}</path>;                                    
        default:
          return element.elementName;
      }
    }

    const buildElements = elements.map(element => {
      const SVGData = `<svg width="100" height="100" viewBox="0 0 100 100">${elementChoice(element)}</svg>`

      console.log(SVGData);

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
