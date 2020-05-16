import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TextInput from '../../atoms/TextInput/TextInput';

import './Table.scss';

const renderCell = (row, col) => {
  const styles = clsx({
    'table_span': true,
    '--collapse': col.collapse,
  });

  if (col.cell) {
    return (
      <span className={styles}>
        {col.cell(row)}
      </span>
    );
  }

  return (
    <span className={styles}>
      {row[col.accessor]}
    </span>
  );
};

const renderFilter = (col) => {
  const styles = clsx({
    'table_span': true,
    '--filter': true,
    '--collapse': col.collapse,
  });

  if (col.filter) {
    return (
      <span className={styles}>
        {col.filter(col)}
      </span>
    );
  }

  if (!col.noFilter) {
    return (
      <span className={styles}>
        <TextInput />
      </span>
    );
  }
  return null;
};

const renderHead = (col) => {
  const styles = clsx({
    'table_span': true,
    '--head': true,
    '--collapse': col.collapse,
  });

  return (
    <span
      className={styles}
      style={{
        width: col.width,
        maxWidth: col.maxWidth,
        minWidth: col.minWidth,
      }}
    >
      {typeof col.header === 'function' ? col.header(col) : col.header}
    </span>
  );
};

const Table = (props) => {
  const {
    columns,
    data,
  } = props;

  return (
    <div>
      <table className='table__table'>
        <thead>
          <tr>
            {columns.map((col) => <th key={col.id}>{renderHead(col)}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className='table__row'
            >
              {columns.map((col) => {
                return (
                  <td
                    key={col.id}
                    className='--bottom-bordered'
                  >
                    {renderCell(row, col)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div />
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    accessor: PropTypes.string.isRequired,
    cell: PropTypes.func,
    filter: PropTypes.func,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    noFilter: PropTypes.bool,
    width: PropTypes.string,
    minWidth: PropTypes.string,
    maxWidth: PropTypes.string,
    collapse: PropTypes.bool,
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })).isRequired,
};

export default Table;
