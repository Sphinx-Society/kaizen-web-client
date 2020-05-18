import React from 'react';
import TableCell from '../../atoms/TableCell/TableCell';

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

export default TableHead;
