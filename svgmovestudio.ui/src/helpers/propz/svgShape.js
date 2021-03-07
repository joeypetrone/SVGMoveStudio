import PropTypes from 'prop-types';

const svgShape = PropTypes.shape({
  svgId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  svgName: PropTypes.string.isRequired,
  isAnimation: PropTypes.bool.isRequired
})

export default { svgShape };
