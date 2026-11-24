import React from 'react';
import { Container, Row, Button, Col, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

import './SVGEditor.scss';
import userData from '../../../helpers/data/userData';
import svgData from '../../../helpers/data/svgData';
import elementData from '../../../helpers/data/elementData';
import SVGElementToolbox from '../../shared/SVGElementToolbox/SVGElementToolbox';
import SVGEditorViewbox from '../../shared/SVGEditorViewbox/SVGEditorViewbox';

import Rectangle from '../../shared/SVGElements/Rectangle/Rectangle';
import Circle from '../../shared/SVGElements/Circle/Circle';
import Ellipse from '../../shared/SVGElements/Ellipse/Ellipse';
import Polygon from '../../shared/SVGElements/Polygon/Polygon';
import Line from '../../shared/SVGElements/Line/Line';
import Polyline from '../../shared/SVGElements/Polyline/Polyline';
import Path from '../../shared/SVGElements/Path/Path';
import SVGEditorSidePanel from '../../shared/SVGEditorSidePanel/SVGEditorSidePanel';
import SVGEditorNavbar from '../../shared/SVGEditorNavbar/SVGEditorNavbar';
import SVGCodeModal from '../../shared/Modals/SVGCodeModal/SVGCodeModal';
import NameSVGModal from '../../shared/Modals/NameSVGModal/NameSVGModal';
import toast from '../../../helpers/toast';
import getApiErrorMessage from '../../../helpers/apiErrors';

class SVGEditor extends React.Component {
  static  propTypes = {
    authed: PropTypes.bool.isRequired
  }

  state = {
    user: {},
    userSVGs: [],
    userElements: [],
    defaultElements: [],
    viewboxElements: [],    
    selectedEditor: '',
    selectedElement: {},
    currentSvgId: 0,
    renderXML: false,
    codeIsCopiedByUser: false,
    saveButtonIsDisabled: true,
    totalViewboxElementsHistory: 0,
    unSavedChanges: false,
    isNameSvgModalOpen: false,
    isSaving: false
  }

  componentDidMount() {
    if (this.props.authed) {
      this.loadUserSvgs();
    }

    this.disableSaveButtonToggle()

    elementData.getDefaultElements()
      .then(elements => this.setState({ defaultElements: elements }) )
      .catch(error => toast.error(getApiErrorMessage(error, 'Couldn\'t load the toolbox shapes. Refresh the page to try again.')))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.authed !== this.props.authed) {
      this.disableSaveButtonToggle()

      if (this.props.authed) {
        this.loadUserSvgs();
      } else {
        this.setState({ user: {}, userSVGs: [], currentSvgId: 0 })
      }
    }
  }

  loadUserSvgs = () => {
    userData.getUserByFirebasaeUid()
      .then(user => {
        this.setState({ user });
        return svgData.getUserSVGs(user.userId);
      })
      .then(svgs => this.setState({ userSVGs: svgs }))
      .catch(error => {
        if (error && error.response && error.response.status === 404) {
          // Signed in to Firebase, but the API has no profile for this account.
          toast.error('Your SVG Move Studio profile is missing, so saved SVGs can\'t load. Try signing out and back in.');
          return;
        }
        toast.error(getApiErrorMessage(error, 'Couldn\'t load your saved SVGs.'));
      });
  }

  // Saves the canvas. New SVGs ask for a name first. Resolves true when saved.
  saveCurrentSvg = () => {
    const { currentSvgId, viewboxElements } = this.state;

    if (!this.props.authed) {
      toast.error('Sign in to save your SVG.');
      return Promise.resolve(false);
    }

    if (currentSvgId === 0) {
      if (viewboxElements.length === 0) {
        toast.error('Add at least one element before saving.');
        return Promise.resolve(false);
      }
      this.setState({ isNameSvgModalOpen: true });
      return Promise.resolve(false);
    }

    this.setState({ isSaving: true });
    return svgData.saveSvgElements(currentSvgId, viewboxElements)
      .then(() => {
        this.setState({ isSaving: false, unSavedChanges: false });
        const svg = this.state.userSVGs.find(s => s.svgId === currentSvgId);
        toast.success(svg ? `Saved "${svg.svgName}".` : 'SVG saved.');
        return true;
      })
      .catch(error => {
        this.setState({ isSaving: false });
        toast.error(getApiErrorMessage(error, 'Couldn\'t save your SVG. Please try again.'));
        return false;
      });
  }

  saveNewSvg = (svgName) => {
    const { viewboxElements } = this.state;

    this.setState({ isSaving: true });
    svgData.createSvg(svgName, viewboxElements)
      .then(svg => {
        this.setState(({ userSVGs }) => ({
          userSVGs: [...userSVGs, svg],
          currentSvgId: svg.svgId,
          unSavedChanges: false,
          isSaving: false,
          isNameSvgModalOpen: false
        }));
        toast.success(`Saved "${svg.svgName}".`);
      })
      .catch(error => {
        this.setState({ isSaving: false });
        toast.error(getApiErrorMessage(error, 'Couldn\'t save your SVG. Please try again.'));
      });
  }

  toggleNameSvgModal = () => {
    if (!this.state.isSaving) {
      this.setState(({ isNameSvgModalOpen }) => ({ isNameSvgModalOpen: !isNameSvgModalOpen }));
    }
  }

  viewboxElementChange = () => {
    this.setState({ unSavedChanges: true });
    this.forceUpdate();
  }

  loadSelectedSVGElementsToViewbox = (elements, selectedSvgId) => {
    let svgElements = [];
    let count = 0;
    this.setState({ currentSvgId: selectedSvgId, unSavedChanges: false })

    elements.forEach(element => {
      count++;
      element.tempId = count;
      svgElements.push(element);
    })
    this.setState({ 
      viewboxElements : svgElements, 
      totalViewboxElementsHistory: count,
      selectedElement: {}
    })
    this.forceUpdate();
  }

  addToolboxElementToViewbox = (elementId) => {
    const { defaultElements, viewboxElements, totalViewboxElementsHistory } = this.state;
    const elementToAdd = Object.assign({}, defaultElements.find(element => element.elementId === parseInt(elementId)));
    elementToAdd.tempId = totalViewboxElementsHistory + 1;
    const joined = viewboxElements.concat(elementToAdd);
    this.setState({ 
      viewboxElements: joined,
      totalViewboxElementsHistory: totalViewboxElementsHistory + 1,
      unSavedChanges: true
    });
  }

  deleteSelectedElement = (elementTempId) => {
    const { viewboxElements } = this.state;
    if(viewboxElements.length !== 0) {
      viewboxElements.splice(viewboxElements.findIndex(element => element.tempId === elementTempId), 1);
      this.setState({ selectedElement: {} })
      this.viewboxElementChange()
    }
  }

  updateElementPosition = (x_position, y_position) => {
    const { selectedElement } = this.state;
    if (x_position === null) {
      selectedElement.y_Translate = y_position;
      this.viewboxElementChange();
    } else if (y_position === null) {
      selectedElement.x_Translate = x_position;
      this.viewboxElementChange();
    } else {
      selectedElement.x_Translate = x_position;
      selectedElement.y_Translate = y_position;
      this.viewboxElementChange();
    }
  }

  updateElementRotation = (rotation) => {
    const { selectedElement } = this.state;
    selectedElement.rotate = rotation;
    this.viewboxElementChange();
  }

  updateElementScale = (scale, strokeWidth) => {
    const { selectedElement } = this.state;
    if (scale === null) {
      selectedElement.strokeWidth = strokeWidth;
      this.viewboxElementChange();
    } else if (strokeWidth === null) {
      selectedElement.scale = scale;
      this.viewboxElementChange();
    } else {
      selectedElement.scale = scale;
      selectedElement.strokeWidth = strokeWidth;
      this.viewboxElementChange();
    }
  }

  updateElementColor = (fillColor, strokeColor) => {
    const { selectedElement } = this.state;
    if (fillColor === null) {
      selectedElement.stroke = strokeColor;
      this.viewboxElementChange();
    } else if (strokeColor === null) {
      selectedElement.fill = fillColor;
      this.viewboxElementChange();
    } else {
      selectedElement.fill = fillColor;
      selectedElement.stroke = strokeColor;
      this.viewboxElementChange();
    }
  }

  updateElementOpacity = (fillOpacity, strokeOpacity) => {
    const { selectedElement } = this.state;
    if (fillOpacity === null) {
      selectedElement.strokeOpacity = strokeOpacity;
      this.viewboxElementChange();
    } else if (strokeOpacity === null) {
      selectedElement.fillOpacity = fillOpacity;
      this.viewboxElementChange();
    } else {
      selectedElement.fillOpacity = fillOpacity;
      selectedElement.strokeOpacity = strokeOpacity;
      this.viewboxElementChange();
    }
  }

  updateElementSkew = (x_skew, y_skew) => {
    const { selectedElement } = this.state;
    if (x_skew === null) {
      selectedElement.y_Skew = y_skew;
      this.viewboxElementChange();
    } else if (y_skew === null) {
      selectedElement.x_Skew = x_skew;
      this.viewboxElementChange();
    } else {
      selectedElement.x_Skew = x_skew;
      selectedElement.y_Skew = y_skew;
      this.viewboxElementChange();
    }
  }

  openSelectedEditor = (editorName) => {
    this.setState({selectedEditor: editorName})
  }

  setSelectedElement = (element) => {
    this.setState({selectedElement: element});
  }

  renderSVGCode = () => {
    const { renderXML } = this.state;
    this.setState({ renderXML: !renderXML});
  }

  elementChoice = (element) => {
    const { renderXML } = this.state;

    switch(element.elementTypeId) {
      case 1:
        if (element.tempId === undefined) {
          return <Rectangle key={element.elementId} element={element}/>;
        } else {
          return <Rectangle key={element.tempId} element={element}/>;
        }
      case 2: 
        if (element.tempId === undefined) {
          return <Circle key={element.elementId} element={element} renderXML={renderXML}/>;
        } else {
          return <Circle key={element.tempId} element={element} renderXML={renderXML}/>;
        }
      case 3:
        if (element.tempId === undefined) {
          return <Ellipse key={element.elementId} element={element}/>;
        } else {
          return <Ellipse key={element.tempId} element={element}/>;
        }
      case 4:
        if (element.tempId === undefined) {
          return <Polygon key={element.elementId} element={element}/>;
        } else {
          return <Polygon key={element.tempId} element={element}/>;
        }
      case 5:
        if (element.tempId === undefined) {
          return <Line key={element.elementId} element={element}/>;
        } else {
          return <Line key={element.tempId} element={element}/>;
        }
      case 6:
        if (element.tempId === undefined) {
          return <Polyline key={element.elementId} element={element}/>;
        } else {
          return <Polyline key={element.tempId} element={element}/>;
        }
      case 7:
        if (element.tempId === undefined) {
          return <Path key={element.elementId} element={element}/>;
        } else {
          return <Path key={element.tempId} element={element}/>;
        }
      default:
        return element.elementName;
    }
  }

  XMLCopiedAlert = () => {
    this.setState({codeIsCopiedByUser: true})
    setTimeout(this.CloseXMLAlert, 3000)
  }

  CloseXMLAlert = () => {
    this.setState({codeIsCopiedByUser: false})
  }

  disableSaveButtonToggle = () => {
    const { authed } = this.props;

    if (authed) {
      this.setState({saveButtonIsDisabled: false});
    } else {
      this.setState({saveButtonIsDisabled: true});
    }
  }

  render() {
    const { 
      userSVGs,
      defaultElements, 
      viewboxElements, 
      selectedEditor, 
      selectedElement,
      currentSvgId,
      codeIsCopiedByUser,
      saveButtonIsDisabled,
      unSavedChanges,
      isNameSvgModalOpen,
      isSaving
    } = this.state;

    const { authed } = this.props;

    return (
      <div className="SVGEditor">
        <Container className="editor-window mt-3 rounded">
          <SVGEditorNavbar 
            authed={authed}
            openSelectedEditor={this.openSelectedEditor} 
            viewboxElements={viewboxElements} 
            setSelectedElement={this.setSelectedElement}
            userSVGs={userSVGs}
            currentSvgId={currentSvgId}
            unSavedChanges={unSavedChanges}
            loadSelectedSVGElementsToViewbox={this.loadSelectedSVGElementsToViewbox}
            saveCurrentSvg={this.saveCurrentSvg}
          />
          <Row className="mx-0">
            <SVGEditorViewbox 
              defaultElements={defaultElements} 
              selectedElement={selectedElement} 
              viewboxElements={viewboxElements} 
              elementChoice={this.elementChoice}
            />
            <SVGEditorSidePanel 
              selectedEditor={selectedEditor} 
              selectedElement={selectedElement} 
              updateElementPosition={this.updateElementPosition} 
              updateElementRotation={this.updateElementRotation} 
              updateElementScale={this.updateElementScale}
              updateElementColor={this.updateElementColor}
              updateElementOpacity={this.updateElementOpacity}
              updateElementSkew={this.updateElementSkew}
              deleteSelectedElement={this.deleteSelectedElement}
            />
          </Row>
          <Row className="p-2">
            <Col md={6}>
              {codeIsCopiedByUser 
                  ? <Alert className="m-0 py-1 px-2" color="success">SVG code copied to clipboard!</Alert>
                  : ''
              }
            </Col>
            <Col md={6} className="pr-2">
              <Row className="float-right mr-1">
                <SVGCodeModal viewboxElements={viewboxElements} renderSVGCode={this.renderSVGCode} XMLCopiedAlert={this.XMLCopiedAlert}/>
                <Button
                  color="danger"
                  disabled={saveButtonIsDisabled || isSaving}
                  title={saveButtonIsDisabled ? 'Sign in to save your SVG' : undefined}
                  onClick={this.saveCurrentSvg}
                >
                  {isSaving ? 'Saving…' : 'Save SVG'}
                </Button>
              </Row>
            </Col>
          </Row>
        </Container>
        <NameSVGModal
          isOpen={isNameSvgModalOpen}
          isSaving={isSaving}
          toggle={this.toggleNameSvgModal}
          saveNewSvg={this.saveNewSvg}
        />
        <Container className="editor-toolbox my-3 p-2 rounded">
          Toolbox
          <hr/>
          <SVGElementToolbox 
            defaultElements={defaultElements} 
            addToolboxElementToViewbox={this.addToolboxElementToViewbox} 
            elementChoice={this.elementChoice}
          />
        </Container>
      </div>
    )
  }
}

export default SVGEditor;
