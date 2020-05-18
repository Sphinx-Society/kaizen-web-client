import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '../../atoms/TableCell/TableCell';

import TableColumnSchema from '../../../schemas/TableColumn/TableColumn';

const TableHead = (props) => {
  const {
    columns,
  } = props;

  return (
    <thead>
      <tr>
        {columns.map((col) => <TableCell key={col.id} isHead col={col} />)}
      </tr>
    </thead>
  );
};

TableHead.propTypes = {
  /**
   * The columns to render inside each row
   */
  columns: PropTypes.arrayOf(TableColumnSchema).isRequired,
};

export default TableHead;
