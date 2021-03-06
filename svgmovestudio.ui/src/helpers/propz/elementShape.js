
import PropTypes from 'prop-types';

const elementShape = PropTypes.shape({
  elementId: PropTypes.number.isRequired,
  svgId: PropTypes.number.isRequired,
  elementTypeId: PropTypes.number.isRequired,
  elementName: PropTypes.string.isRequired,
  arrangeNumber: PropTypes.number.isRequired,
  fill: PropTypes.string,
  fillOpacity: PropTypes.number,
  opacity: PropTypes.number,
  stroke: PropTypes.string,
  stokeWidth: PropTypes.number,
  stokeOpacity: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  x_CoordinateStart: PropTypes.number,
  y_CoordinateStart: PropTypes.number,
  x_CoordinateEnd: PropTypes.number,
  y_CoordinateEnd: PropTypes.number,
  x_Radius: PropTypes.number,
  y_Radius: PropTypes.number,
  points: PropTypes.string,
  pathShape: PropTypes.string,
  pathLength: PropTypes.number,
  x_Translate: PropTypes.number,
  y_Translate: PropTypes.number,
  rotate: PropTypes.number,
  scale: PropTypes.number,
  x_Skew: PropTypes.number,
  y_Skew: PropTypes.number,
  isDefault: PropTypes.bool.isRequired
});

export default { elementShape };
