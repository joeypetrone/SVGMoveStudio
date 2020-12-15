import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'reactstrap';
import Rectangle from '../../shared/SVGElements/Rectangle/Rectangle';
import Circle from '../../shared/SVGElements/Circle/Circle';
import Ellipse from '../../shared/SVGElements/Ellipse/Ellipse';
import Polygon from '../../shared/SVGElements/Polygon/Polygon';
import Line from '../../shared/SVGElements/Line/Line';
import Polyline from '../../shared/SVGElements/Polyline/Polyline';
import Path from '../../shared/SVGElements/Path/Path';
import './SVGElementToolbox.scss';

class SVGElementToolbox extends React.Component {
  static propTypes = {
    elements: [],
    addElementToViewbox: PropTypes.func.isRequired,
  }

  state = {
    selectedXML: ''
  }

  addToViewBoxEvent = (e) => {
    e.preventDefault();
    const { addElementToViewbox } = this.props;
    addElementToViewbox(e.target.value);
  }

  elementChoice = (element) => {
    switch(element.elementTypeId) {
      case 1:
        return <Rectangle element={element}/>;
      case 2: 
        return <Circle element={element}/>;
      case 3:
        return <Ellipse element={element}/>;
      case 4:
        return <Polygon element={element}/>;
      case 5:
        return <Line element={element}/>;
      case 6:
        return <Polyline element={element}/>
      case 7:
        return <Path element={element}/>;                                    
      default:
        return element.elementName;
    }
  }

  render() {
    const {elements} = this.props;

    const buildElements = elements.map(element => {
      return (
        <Card className="px-3 pb-3 pt-0">
          <small className="m-1 mb-2 pb-1 border-bottom">{element.elementName}</small>
          <svg id={element.elementId} width="100" height="100" viewBox="0 0 100 100">{this.elementChoice(element)}</svg>
          <Button className="btn-sm m-1 mt-3" onClick={this.addToViewBoxEvent}>Add</Button>
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
