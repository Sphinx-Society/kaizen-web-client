import React from 'react';
import PropTypes from 'prop-types';
import TopFilter from '../TopFilter/TopFilter';

import './TableMenu.scss';

const TableMenu = (props) => {
  const {
    onFilterChange,
    onSearch,
    isMobile,
    menu,
  } = props;

  return (
    <div className='table-menu'>
      <div className='table-menu__input'>
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
  /** Function to call when filter input is used */
  onFilterChange: PropTypes.func.isRequired,
  /** Function to be called when pressing enter or the search button on the filter input */
  onSearch: PropTypes.func.isRequired,
  /** To render the mobile version of the table menu */
  isMobile: PropTypes.bool.isRequired,
  /** It can receive a menu to extend it behavior */
  menu: PropTypes.node,
};

TableMenu.defaultProps = {
  menu: null,
};

export default TableMenu;
