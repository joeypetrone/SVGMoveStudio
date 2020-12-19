import React from 'react';
import { Jumbotron, Container, Row } from 'reactstrap';
import './Documents.scss';

class Documents extends React.Component {
  render() {
    return(
      <div className="Documents">
        <Jumbotron className="m-auto bg-white w-100 py-4">
          <h1 className="">Learn about the editor,</h1>
          <h1 className="">take a look at our documents</h1>
          <p className="lead">Here you can find information on various parts of the editor</p>
        </Jumbotron>
        <Container className="documents-body mb-3 rounded">
          <Row className="mt-3">
          </Row> 
        </Container>  
      </div>
    )
  }
}

export default Documents;
