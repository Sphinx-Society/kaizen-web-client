import React from 'react';
import clsx from 'clsx';
import TableColumnSchema from '../../../schemas/TableColumn/TableColumn';
import TableRowSchema from '../../../schemas/TableRow/TableRow';

import './TableCell.scss';

const TableCell = (props) => {
  const {
    col,
    row,
    isHead,
  } = props;

  const className = clsx({
    'table-cell__content': true,
    'table-cell__content--head': isHead,
    'table-cell__content--collapse': col.collapse,
  });

  const cellClassName = clsx({ 'table-cell--bottom-bordered': true });

  const { width, maxWidth, minWidth } = col;

  const CellType = ({ children }) => (
    isHead ? <th>{children}</th> : <td className={cellClassName}>{children}</td>
  );

  const Wrapper = ({ children }) => (
    <CellType>
      <span
        className={className}
        style={{ width, maxWidth, minWidth }}
      >
        {children}
      </span>
    </CellType>
  );

  if (isHead) {
    return (
      <Wrapper>
        {typeof col.header === 'function' ? col.header(col) : col.header}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {typeof col.cell === 'function' ? col.cell(row) : row[col.accessor]}
    </Wrapper>
  );
};

TableCell.propTypes = {
  row: TableRowSchema,
  col: TableColumnSchema.isRequired,
};

export default TableCell;
