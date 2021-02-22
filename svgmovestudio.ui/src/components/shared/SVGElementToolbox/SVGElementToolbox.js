import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'reactstrap';
import './SVGElementToolbox.scss';

import ElementToolboxPlaceholder from '../../shared/Placeholders/ElementToolboxPlaceholder/ElementToolboxPlaceholder';
class SVGElementToolbox extends React.Component {
  static propTypes = {
    defaultElements: PropTypes.array.isRequired,
    addElementToViewbox: PropTypes.func.isRequired,
    elementChoice: PropTypes.func.isRequired,
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
    const n = 7;

    const buildPlaceholders = [...Array(n)].map((e, i) => <ElementToolboxPlaceholder key={i} />)

    const buildElements = defaultElements.map(element => {
      return (
        <Card key={element.elementId} className="px-3 pb-3 pt-0">
          <small className="m-1 mb-2 pb-1 border-bottom">{element.elementName}</small>
          <svg id={element.elementId} width="100" height="100" viewBox="0 0 100 100">{elementChoice(element)}</svg>
          <Button className="btn-sm m-1 mt-3" id={element.elementId} onClick={this.addToViewBoxEvent}>Add</Button>
        </Card>
        )
    })

    return (
      <div className="SVGElementToolbox d-flex row justify-content-between m-3">
        {(defaultElements.length === 0)
          ? buildPlaceholders 
          : buildElements
        }
      </div>
    )
  }
}

export default SVGElementToolbox;
