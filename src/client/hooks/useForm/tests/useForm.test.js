import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import useForm from '../useForm';
import HookComponentMock from '../../../__mocks__/components/HookComponentMock';

configure({ adapter: new Adapter() });

const initialStateMock = { name: 'bruce', lastName: 'wayne' };

describe('useForm hook', () => {
  test('Wrapper should render', () => {
    const wrapper = shallow(<HookComponentMock />);
    expect(wrapper.exists()).toBe(true);
  });

  test('It returns the correct data with the correct values', () => {
    const wrapper = mount(<HookComponentMock hook={() => useForm(initialStateMock)} />);
    const { hook } = wrapper.find('div').props();
    expect(hook[0]).toEqual(initialStateMock);
  });
});
