import React from 'react';
import { Jumbotron, Container, Row, Nav, NavItem, NavLink } from 'reactstrap';
import './Documents.scss';

import DocumentsOverview from '../../shared/DocumentsTabs/DocumentsOverview/DocumentsOverview'
import DocumentsReference from '../../shared/DocumentsTabs/DocumentsReference/DocumentsReference'
import DocumentsOverviewNav from '../../shared/DocumentsSidebarNav/DocmentsOverviewNav/DocumentsOverviewNav'
import DocumentsReferenceNav from '../../shared/DocumentsSidebarNav/DocumentsReferenceNav/DocumentsReferenceNav'

class Documents extends React.Component {
  state = {
    selectedDocument: 'overview'
  }

  overviewClickEvent = (e) => {
    e.preventDefault()
    this.setState({ selectedDocument: 'overview' })
  }

  referenceClickEvent = (e) => {
    e.preventDefault()
    this.setState({ selectedDocument: 'reference' })
  }

  render() {
    const { selectedDocument } = this.state;

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
              <NavLink className="text-dark" href="#" active={selectedDocument === 'overview'} onClick={this.overviewClickEvent}>Overview</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-dark" href="#" active={selectedDocument === 'reference'} onClick={this.referenceClickEvent}>Reference</NavLink>
            </NavItem>
          </Nav>
          <Row className="m-0">
            <div className="documents-navbar bg-white p-1 mb-1 mr-1 rounded border">
              {selectedDocument === 'overview'
              ? <DocumentsOverviewNav />
              : <DocumentsReferenceNav />
              }
            </div>
            <div className="documents-textarea bg-white p-1 mb-1 rounded border">
              {selectedDocument === 'overview'
              ? <DocumentsOverview />
              : <DocumentsReference />
              }
            </div>
          </Row> 
        </Container>  
      </div>
    )
  }
}

export default Documents;
