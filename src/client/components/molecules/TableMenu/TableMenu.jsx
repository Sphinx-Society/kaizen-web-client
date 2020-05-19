import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TopFilter from '../TopFilter/TopFilter';

import './TableMenu.scss';

const TableMenu = (props) => {
  const {
    onFilterChange,
    onSearch,
    isMobile,
    menu,
  } = props;

  const className = clsx({ 'table-menu': true });

  const inputClassName = clsx({ 'table-menu__input': true });

  return (
    <div className={className}>
      <div className={inputClassName}>
        <TopFilter
          placeholder='Buscar...'
          onChange={onFilterChange}
          onEnter={onSearch}
          onIconClick={onSearch}
          disableShadow={!isMobile}
        />
      </div>
      {!isMobile && menu}
    </div>
  );
};

TableMenu.propTypes = {
  /**
   * Function to call when filter input is used
   */
  onFilterChange: PropTypes.func.isRequired,
  /**
   * Function to be called when pressing enter or the search button on the filter input
   */
  onSearch: PropTypes.func.isRequired,
  /**
   * To render the mobile version of the table menu
   */
  isMobile: PropTypes.bool.isRequired,
  /**
   * It can receive a menu to extend it behavior
   */
  menu: PropTypes.node,
};

TableMenu.defaultProps = {
  menu: null,
};

export default TableMenu;
