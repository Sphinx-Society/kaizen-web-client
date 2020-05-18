import React from 'react';
import clsx from 'clsx';
import TopFilter from '../TopFilter/TopFilter';

import './TableMenu.scss';

const TableMenu = (props) => {
  const {
    onFilter,
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
          onChange={onFilter}
          onEnter={onSearch}
          onIconClick={onSearch}
          disableShadow={!isMobile}
        />
      </div>
      {!isMobile && menu}
    </div>
  );
};

export default TableMenu;
