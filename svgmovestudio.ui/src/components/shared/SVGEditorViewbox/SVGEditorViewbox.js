import React from 'react';
import './SVGEditorViewbox.scss';

class SVGEditorViewbox extends React.Component {
  static propTypes = {
    viewboxElements: []
  }

  state = {
    elements: []
  }

  componentDidUpdate(prevProps) {
    if (prevProps.viewboxElements !== this.props.viewboxElements) {
      console.log('component update - elements', this.state.elements);
    }
  }



  render() {
    const buildViewboxElements = this.props.viewboxElements.map( element => {
      console.log('viewboxElements.map', element)
      return element
    })

    return (
      <div className="SVGEditorViewbox rounded">
        <svg width="800" height="500" viewBox="0 0 800 500">
          {buildViewboxElements}
        </svg>
      </div>
    )
  }
}

export default SVGEditorViewbox;
