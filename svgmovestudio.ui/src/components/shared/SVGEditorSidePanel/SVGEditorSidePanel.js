import React from 'react';
import PropTypes from 'prop-types';
import './SVGEditorSidePanel';

import PositionEditor from '../../shared/SVGElementEditors/PositionEditor/PositionEditor';
import ScaleEditor from '../../shared/SVGElementEditors/ScaleEditor/ScaleEditor';

class SVGEditorSidePanel extends React.Component {
  static propTypes = {
    createMoveElementObject: PropTypes.func.isRequired, 
    selectedEditor: PropTypes.string.isRequired
  }

  render() {
    const { selectedEditor, createMoveElementObject } = this.props;

    const showSelectedEditor = () => {
      switch(selectedEditor) {
        case 'position':
          return <PositionEditor createMoveElementObject={createMoveElementObject}/>
        case 'scale':
          return <ScaleEditor />
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
