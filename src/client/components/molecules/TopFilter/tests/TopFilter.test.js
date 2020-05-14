import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TopFilter from '../TopFilter';

configure({ adapter: new Adapter() });

describe('TopFilter', () => {
  const stringMock = 'Mock';
  const functionMock = jest.fn();

  test('TopFilter have class .top-filter__container', () => {
    const topFilter = shallow(
      <TopFilter
        value={stringMock}
        onChange={functionMock}
      />,
    );
    expect(topFilter.hasClass('top-filter__container')).toBe(true);
  });

  test('TopFilter default props', () => {
    const datepickerDay = mount(
      <TopFilter
        value={stringMock}
        onChange={functionMock}
      />,
    );
    const {
      value,
      onChange,
      placeholder,
    } = datepickerDay.find('TopFilter').props();

    expect(value).toBe('Mock');
    expect(onChange).toBe(functionMock);
    expect(placeholder).toBe('');
  });

  test('TopFilter props with value', () => {
    const datepickerDay = mount(
      <TopFilter
        value={stringMock}
        onChange={functionMock}
        placeholder={stringMock}
      />,
    );
    const {
      value,
      onChange,
      placeholder,
    } = datepickerDay.find('TopFilter').props();

    expect(value).toBe('Mock');
    expect(onChange).toBe(functionMock);
    expect(placeholder).toBe('Mock');
  });

});
