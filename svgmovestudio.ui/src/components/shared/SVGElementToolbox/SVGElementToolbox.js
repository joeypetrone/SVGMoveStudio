import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'reactstrap';
import './SVGElementToolbox.scss';

class SVGElementToolbox extends React.Component {
  static propTypes = {
    defaultElements: [],
    addElementToViewbox: PropTypes.func.isRequired,
    elementChoice: PropTypes.func.isRequired
  }

  state = {
    selectedXML: ''
  }

  addToViewBoxEvent = (e) => {
    e.preventDefault();
    const { addElementToViewbox } = this.props;
    addElementToViewbox(e.target.id);
  }

  render() {
    const {defaultElements, elementChoice} = this.props;

    const buildElements = defaultElements.map(element => {
      return (
        <Card className="px-3 pb-3 pt-0">
          <small className="m-1 mb-2 pb-1 border-bottom">{element.elementName}</small>
          <svg id={element.elementId} width="100" height="100" viewBox="0 0 100 100">{elementChoice(element)}</svg>
          <Button className="btn-sm m-1 mt-3" id={element.elementId} onClick={this.addToViewBoxEvent}>Add</Button>
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
