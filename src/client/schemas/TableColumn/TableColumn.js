import PropTypes from 'prop-types';

export default PropTypes.shape({
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  accessor: PropTypes.string.isRequired,
  cell: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  width: PropTypes.string,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  collapse: PropTypes.bool,
});
