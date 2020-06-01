import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Table from '../Table';

import data from '../../../../__mocks__/components/UserTableMock';

configure({ adapter: new Adapter() });

function componentRender(propData = {}) {
  const { columns, rows } = propData;
  return mount(
    <Table
      columns={columns || data.columns}
      rows={rows || data.rows}
      totalRows={rows ? rows.length : data.rows.length}
      totalPages={2}
      page={1}
      isLoading={propData.isLoadingMock}
      onNextPageClick={propData.onNextPageClickMock || (() => null)}
      onPrevPageClick={propData.onPrevPageClickMock || (() => null)}
      onSearch={propData.onSearchMock || (() => null)}
      mobileRow={propData.mobileRowMock || (() => null)}
    />,
  );
}
describe('Table', () => {
  describe('Some default requirements', () => {
    test('should renderizar:', () => {
      const table = componentRender();
      expect(table.length).toBeTruthy();
    });

    test('should be exist un top menu input:', () => {
      const table = componentRender();
      expect(table.find('div.table__menu__input').length).toBe(1);
    });

    test('should be exist un top menu input:', () => {
      const table = componentRender({ isLoadingMock: true });
      expect(table.find('.table__loader-container').length).toBe(1);
    });
  });

  describe('Events onClick', () => {
    test('should   onNextPageClick:', () => {
      const onNextPageClickMock = jest.fn();
      const table = componentRender({ onNextPageClickMock });
      table.find('TablePagination').prop('onNextPageClick')();
      expect(onNextPageClickMock.mock.calls.length).toBe(1);
    });

    test('should throw the onPrevPageClick:', () => {
      const onPrevPageClickMock = jest.fn();
      const table = componentRender({ onPrevPageClickMock });
      table.find('TablePagination').prop('onPrevPageClick')();
      expect(onPrevPageClickMock.mock.calls.length).toBe(1);
    });

    test('should throw the mobileRow:', () => {
      const mobileRowMock = jest.fn();
      const table = componentRender({ mobileRowMock });
      table.find('TableBody').prop('mobileRow')();
      expect(mobileRowMock.mock.calls.length).toBe(1);
    });

    test('should throw the onSearch:', () => {
      const onSearchMock = jest.fn();
      const table = componentRender({ onSearchMock });
      table.find('TopFilter').prop('onEnter')();
      expect(onSearchMock.mock.calls.length).toBe(1);
    });
  });
});
