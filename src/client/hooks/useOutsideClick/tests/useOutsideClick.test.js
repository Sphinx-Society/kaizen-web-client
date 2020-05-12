import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import useOutsideClick from '../useOutsideClick';
import HookComponentMock from '../../../__mocks__/components/HookComponentMock';

configure({ adapter: new Adapter() });

describe('useOutsideClick hook', () => {
  test('Wrapper should render', () => {
    const wrapper = shallow(<HookComponentMock />);
    expect(wrapper.exists()).toBe(true);
  });

  test('It add the event to window.document', () => {
    const ref = { current: null };
    const callback = jest.fn();
    const wrapper = mount(<HookComponentMock hook={() => useOutsideClick(ref, callback)} />);
    const { hook } = wrapper.find('div').props();
    expect(hook).toEqual('onDocument');
    wrapper.unmount();
  });
});
