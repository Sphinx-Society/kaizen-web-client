import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../atoms/Logo/Logo';
import TableMenu from '../../molecules/TableMenu/TableMenu';
import TableHead from '../../molecules/TableHead/TableHead';
import TableBody from '../../molecules/TableBody/TableBody';
import TablePagination from '../../molecules/TablePagination/TablePagination';

import useWindowDimensions from '../../../hooks/useWindowDimensions/useWindowDimensions';

import TableColumnSchema from '../../../schemas/TableColumn/TableColumn';
import TableRowSchema from '../../../schemas/TableRow/TableRow';

import { breakpointMedium } from './Table.scss';

const Table = (props) => {
  const {
    columns,
    rows,
    totalRows,
    page,
    onFilterChange,
    onNextPageClick,
    onPrevPageClick,
    menu,
    mobileRow,
    isLoading,
    onSearch,
  } = props;

  const { width } = useWindowDimensions();
  const isMobile = width < parseInt(breakpointMedium, 10);

  const Wrapper = ({ children }) => (isMobile ? <div className='table__wrapper'>{children}</div> : <table className={className}>{children}</table>);

  return (
    <div>
      <TableMenu
        isMobile={isMobile}
        onFilterChange={onFilterChange}
        onSearch={onSearch}
        menu={menu}
      />
      <Wrapper>
        {!isMobile && (
          <TableHead columns={columns} />
        )}
        <TableBody
          isLoading={isLoading}
          isMobile={isMobile}
          rows={rows}
          columns={columns}
          mobileRow={mobileRow}
        />
      </Wrapper>
      {isLoading ? (
        <div className='table__loader-container'><Logo isLoading size='100px' /></div>
      ) : (
        <TablePagination
          rows={rows}
          totalRows={totalRows}
          page={page}
          onNextPageClick={onNextPageClick}
          onPrevPageClick={onPrevPageClick}
        />
      )}
    </div>
  );
};

Table.propTypes = {
  /** Columns to use in the table */
  columns: PropTypes.arrayOf(TableColumnSchema).isRequired,
  /** Data to show on the table */
  rows: PropTypes.arrayOf(TableRowSchema).isRequired,
  /** As the table can work with dynamic data and fetch only the actual page it receive the data lenght */
  totalRows: PropTypes.number.isRequired,
  /** Actual page the table is showing */
  page: PropTypes.number.isRequired,
  /** Function to call when filter input is used */
  onFilterChange: PropTypes.func.isRequired,
  /** Function to call when next page button is clicked */
  onNextPageClick: PropTypes.func.isRequired,
  /** Function to call when prev page button is clicked */
  onPrevPageClick: PropTypes.func.isRequired,
  /** It can receive a menu to extend it behavior */
  menu: PropTypes.node,
  /** It can receive a mobile row to replace the desktop rows */
  mobileRow: PropTypes.func,
  /** To render the loading table variant */
  isLoading: PropTypes.bool,
  /** Function to be called when pressing enter or the search button on the filter input */
  onSearch: PropTypes.func.isRequired,
};

Table.defaultProps = {
  menu: null,
  mobileRow: null,
  isLoading: false,
};

export default Table;
