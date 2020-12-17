import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import './SVGEditorViewbox.scss';

class SVGEditorViewbox extends React.Component {
  static propTypes = {
    defaultElements: [],
    viewboxAddElementIds: [],
    elementChoice: PropTypes.func.isRequired
  }

  state = {
    allElementsInSVG: [],
    circles: [],
    totalElements: 0,
  }

  componentDidUpdate(prevProps) {
    const { viewboxAddElementIds, defaultElements } = this.props;
    const { allElementsInSVG } = this.state;
    const lastElement = viewboxAddElementIds[viewboxAddElementIds.length - 1];
    const elementToAdd = Object.assign({}, defaultElements[lastElement - 1])

    if (prevProps.viewboxAddElementIds !== viewboxAddElementIds) {
      let updatedCircles = [];

      let updatedElementArray = allElementsInSVG.concat(elementToAdd)
      updatedElementArray = updatedElementArray.map((element) => {
        // switch(element.elementTypeId) {
        //   case 1:
        //     element.tempId = 'rectangle' + index;
        //     return element
        //   case 2:
        //     element.tempId = 'circle' + index;
        //     const updatedCircles = circles.concat(element)
        //     this.setState({circles: updatedCircles})
        //     return element
        //   case 3:
        //     element.tempId = 'ellipse' + index;
        //     return element
        //   case 4:
        //     element.tempId = 'polygon' + index;
        //     return element
        //   case 5:
        //     element.tempId = 'line' + index;
        //     return element
        //   case 6:
        //     element.tempId = 'polyline' + index;
        //     return element
        //   case 7:
        //     element.tempId = 'path' + index;
        //     return element                                 
        //   default:
        //     return console.error('elementTypeId Not Found in SVG Editor Viewbox switch statement.');
        // }

        if (element.elementTypeId === 2) {
          updatedCircles.push(element)
          this.setState({circles: updatedCircles})
          return element
        }
        return element
      })
      this.setState({allElementsInSVG: updatedElementArray, totalElements: this.state.totalElements + 1})      
    }
  }

  moveCircle = (e) => {
    const { allElementsInSVG } = this.state;
    allElementsInSVG[0].x_CoordinateStart = 400;
    allElementsInSVG[0].y_CoordinateStart = 250;
    allElementsInSVG[0].x_Radius = 100;
    this.forceUpdate()
  }

  moveEllipse = (e) => {
    const { allElementsInSVG } = this.state;
    allElementsInSVG[1].x_CoordinateStart = 400;
    allElementsInSVG[1].y_CoordinateStart = 250;
    allElementsInSVG[1].x_Radius = 100;
    this.forceUpdate()
  }

  render() {
    const { elementChoice } = this.props;
    const { allElementsInSVG } = this.state;

    const buildViewboxElements = () => {
      return allElementsInSVG.map( (element) => {
        return elementChoice(element);
      })
    } 

    return (
      <div className="SVGEditorViewbox rounded">
        <svg width="800" height="500" viewBox="0 0 800 500">
          {buildViewboxElements()}
        </svg>
      </div>
    )
  }
}

export default SVGEditorViewbox;
