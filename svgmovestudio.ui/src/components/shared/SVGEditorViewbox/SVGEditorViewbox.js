import React from 'react';
import PropTypes from 'prop-types';
import './SVGEditorViewbox.scss';

class SVGEditorViewbox extends React.Component {
  static propTypes = {
    viewboxElements: PropTypes.array.isRequired,
    elementChoice: PropTypes.func.isRequired,
  }

  componentDidUpdate(prevProps) {
    const { viewboxElements } = this.props;

    if (prevProps.viewboxElements !== viewboxElements) {
      
    }
  }

  render() {
    const { elementChoice, viewboxElements } = this.props;

    const buildViewboxElements = () => {
      return viewboxElements.map( (element) => {
        return elementChoice(element);
      })
    } 

    return (
      <div className="SVGEditorViewbox rounded mr-2">
        <svg width="800" height="500" viewBox="0 0 800 500">
          {buildViewboxElements()}
        </svg>
      </div>
    )
  }
}

export default SVGEditorViewbox;
