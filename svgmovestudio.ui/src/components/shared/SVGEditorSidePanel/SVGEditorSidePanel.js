import React from 'react';
import PropTypes from 'prop-types';
import './SVGEditorSidePanel';

import PositionEditor from '../../shared/SVGElementEditors/PositionEditor/PositionEditor';
import ScaleEditor from '../../shared/SVGElementEditors/ScaleEditor/ScaleEditor';
import ColorEditor from '../../shared/SVGElementEditors/ColorEditor/ColorEditor';
import StretchEditor from '../../shared/SVGElementEditors/StretchEditor/StretchEditor';
import DeleteElementEditor from '../../shared/SVGElementEditors/DeleteElementEditor/DeleteElementEditor';

class SVGEditorSidePanel extends React.Component {
  static propTypes = {
    updateElementPosition: PropTypes.func.isRequired,
    updateElementRotation: PropTypes.func.isRequired,
    updateElementScale: PropTypes.func.isRequired,
    updateElementColor: PropTypes.func.isRequired,
    updateElementOpacity: PropTypes.func.isRequired,     
    updateElementSkew: PropTypes.func.isRequired,     
    selectedEditor: PropTypes.string.isRequired,
    selectedElement: PropTypes.object.isRequired,
    deleteSelectedElement: PropTypes.func.isRequired
  }

  render() {
    const { 
      selectedEditor, 
      selectedElement, 
      updateElementPosition,
      updateElementRotation, 
      updateElementScale, 
      updateElementColor,
      updateElementOpacity, 
      updateElementSkew,
      deleteSelectedElement
    } = this.props;

    const showSelectedEditor = () => {
      switch(selectedEditor) {
        case 'position':
          return <PositionEditor 
                    selectedElement={selectedElement} 
                    selectedEditor={selectedEditor} 
                    updateElementPosition={updateElementPosition}
                    updateElementRotation={updateElementRotation}
                  />
        case 'scale':
          return <ScaleEditor 
                    selectedElement={selectedElement} 
                    selectedEditor={selectedEditor} 
                    updateElementScale={updateElementScale}
                  />
        case 'color':
          return <ColorEditor 
                    selectedElement={selectedElement} 
                    selectedEditor={selectedEditor} 
                    updateElementColor={updateElementColor}
                    updateElementOpacity={updateElementOpacity}
                  />
        case 'stretch':
          return <StretchEditor 
                    selectedElement={selectedElement} 
                    selectedEditor={selectedEditor} 
                    updateElementSkew={updateElementSkew}
                  />
        case 'delete':
          return <DeleteElementEditor 
                    selectedElement={selectedElement} 
                    selectedEditor={selectedEditor} 
                    deleteSelectedElement={deleteSelectedElement}
                  />             
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
