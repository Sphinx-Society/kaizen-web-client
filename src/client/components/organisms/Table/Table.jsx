import React from 'react';
import PropTypes from 'prop-types';

import './Table.scss';

const Table = (props) => {
  const {
    columns,
    data,
  } = props;

  return (
    <table className='table__table'>
      <thead>
        <tr className='table__row'>
          {columns.map((col) => {
            return (
              <th key={col.id}>
                <span className='table_span'>
                  {typeof col.header === 'function' ? col.header() : col.header}
                </span>
              </th>
            );
          })}
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
                  className='table__cell--bordered'
                >
                  <span className='table_span'>
                    {row[col.accessor]}
                  </span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    header: PropTypes.oneOfType([PropTypes.string, PropType.func]).isRequired,
    accessor: PropTypes.string.isRequired,
    cell: PropTypes.func,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })).isRequired,
};

export default Table;
