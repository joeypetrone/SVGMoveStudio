import React from 'react';
import PropTypes from 'prop-types';
import './SVGEditorSidePanel';

import PositionEditor from '../../shared/SVGElementEditors/PositionEditor/PositionEditor';
import ScaleEditor from '../../shared/SVGElementEditors/ScaleEditor/ScaleEditor';
import ColorEditor from '../../shared/SVGElementEditors/ColorEditor/ColorEditor';
import StretchEditor from '../../shared/SVGElementEditors/StretchEditor/StretchEditor';

class SVGEditorSidePanel extends React.Component {
  static propTypes = {
    updateElementPosition: PropTypes.func.isRequired,
    updateElementColor: PropTypes.func.isRequired, 
    selectedEditor: PropTypes.string.isRequired,
    selectedElement: PropTypes.object.isRequired
  }

  render() {
    const { selectedEditor, selectedElement, updateElementPosition, updateElementColor } = this.props;

    const showSelectedEditor = () => {
      switch(selectedEditor) {
        case 'position':
          return <PositionEditor selectedElement={selectedElement} updateElementPosition={updateElementPosition}/>
        case 'scale':
          return <ScaleEditor />
        case 'color':
          return <ColorEditor selectedElement={selectedElement} updateElementColor={updateElementColor}/>
        case 'stretch':
          return <StretchEditor />          
        default:
          break;  
      }    
     }

    return (
      <div className="SVGEditorSidePanel border bg-light rounded col-3 m-0 pt-2">
        {showSelectedEditor()}    
      </div>
    )
  }
}

export default SVGEditorSidePanel;
