import React from 'react';
import { Card, Spinner } from 'reactstrap';


import './ElementToolboxPlaceholder.scss';

class ElementToolboxPlaceholder extends React.Component {
  render() {
    return(
      <div className="ElementToolboxPlaceholder">
        <Card className="toolbox-placeholder-card">
          <Spinner className="m-auto" color="secondary"/>
        </Card>
      </div>
    )
  }
}

export default ElementToolboxPlaceholder;
