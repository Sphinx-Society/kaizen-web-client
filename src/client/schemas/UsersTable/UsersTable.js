import PropTypes from 'prop-types';

import TableColumnSchema from '../TableColumn/TableColumn';
import TableRowSchema from '../TableRow/TableRow';

export default PropTypes.shape({
  columns: PropTypes.arrayOf(TableColumnSchema),
  rows: PropTypes.arrayOf(TableRowSchema),
});
