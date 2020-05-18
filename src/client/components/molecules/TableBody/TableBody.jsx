import React from 'react';
import clsx from 'clsx';
import TableCell from '../../atoms/TableCell/TableCell';

import './TableBody.scss';

const TableBody = (props) => {
  const {
    isLoading,
    isMobile,
    rows,
    columns,
    mobileRow,
  } = props;

  const rowClassName = clsx({ 'table-body__row': true });

  const Wrapper = ({ children }) => (isMobile ? <div>{children}</div> : <tbody>{children}</tbody>);

  const RowWrapper = ({ children, row }) => {
    if (isMobile && typeof mobileRow === 'function') {
      return mobileRow(row);
    }

    return (
      <tr className={rowClassName}>{children}</tr>
    );
  };

  return (
    <Wrapper>
      {!isLoading && rows.map((row) => (
        <RowWrapper key={row.id} row={row}>
          {columns.map((col) => <TableCell key={col.id} col={col} row={row} />)}
        </RowWrapper>
      ))}
    </Wrapper>
  );
};

export default TableBody;
