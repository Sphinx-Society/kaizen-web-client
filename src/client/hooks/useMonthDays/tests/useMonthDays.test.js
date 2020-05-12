import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import useMonthDays from '../useMonthDays';
import useMonthDaysMock from '../../../__mocks__/hooks/useMonthDaysMock';
import HookComponentMock from '../../../__mocks__/components/HookComponentMock';

configure({ adapter: new Adapter() });

describe('useMonthDays hook', () => {
  test('Wrapper should render', () => {
    const wrapper = shallow(<HookComponentMock />);
    expect(wrapper.exists()).toBe(true);
  });

  test('It returns the correct data with the correct values', () => {
    const wrapper = mount(<HookComponentMock hook={() => useMonthDays(4, 2020)} />);
    const { hook } = wrapper.find('div').props();
    expect(hook).toEqual(useMonthDaysMock);
  });

  test('It returns an empty array with different than number', () => {
    const wrapper = mount(<HookComponentMock hook={() => useMonthDays('4', '2020')} />);
    const { hook } = wrapper.find('div').props();
    expect(hook).toEqual([]);
  });

  test('It returns an empty array with floating numbers', () => {
    const wrapper = mount(<HookComponentMock hook={() => useMonthDays(4.0, 20.20)} />);
    const { hook } = wrapper.find('div').props();
    expect(hook).toEqual([]);
  });
});
