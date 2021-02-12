import React from 'react';
import { Jumbotron, Container, Row, Nav, NavItem, NavLink } from 'reactstrap';
import './Documents.scss';

class Documents extends React.Component {
  state = {
    overviewActive: true,
    refereneceActive: false
  }

  overviewClickEvent = (e) => {
    e.preventDefault()
    this.setState({ overviewActive: true, refereneceActive: false})
  }

  referenceClickEvent = (e) => {
    e.preventDefault()
    this.setState({ overviewActive: false, refereneceActive: true})
  }

  render() {
    const { overviewActive, refereneceActive } = this.state;

    return(
      <div className="Documents">
        <Jumbotron className="m-auto bg-white w-100 py-4">
          <h1 className="">Learn about the editor,</h1>
          <h1 className="">take a look at our documents</h1>
          <p className="lead">Here you can find information on various parts of the editor</p>
        </Jumbotron>
        <Container className="documents-body mb-3 p-1 rounded">
          <Nav tabs>
            <NavItem>
              <NavLink className="text-dark" href="#" active={overviewActive} onClick={this.overviewClickEvent}>Overview</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-dark" href="#" active={refereneceActive} onClick={this.referenceClickEvent}>Reference</NavLink>
            </NavItem>
          </Nav>
          <Row className="m-0">
            <div className="documents-navbar bg-white p-1 mb-1 mr-1 rounded border">

            </div>
            <div className="documents-textarea bg-white p-1 mb-1 rounded border">

            </div>
          </Row> 
        </Container>  
      </div>
    )
  }
}

export default Documents;
