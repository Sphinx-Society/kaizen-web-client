import React from 'react';
import { create } from 'react-test-renderer';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../Button';

configure({ adapter: new Adapter() });

describe('Button', () => {
  test('Match Snapshot', () => {
    const button = create(<Button onClick={() => null}>Snapshot</Button>);
    expect(button.toJSON()).toMatchSnapshot();
  });

  test('Button have class .btn', () => {
    const button = shallow(<Button onClick={() => null}>Btn</Button>);
    expect(button.hasClass('btn')).toBe(true);
  });

  test('Button have class .btn--primary', () => {
    const button = shallow(<Button onClick={() => null}>Btn</Button>);
    expect(button.hasClass('btn--primary')).toBe(true);
  });

  test('Button have class .btn--secondary', () => {
    const button = shallow(<Button secondary onClick={() => null}>Btn</Button>);
    expect(button.hasClass('btn--secondary')).toBe(true);
  });

  test('Button prop type default', () => {
    const button = shallow(<Button onClick={() => null}>Btn</Button>);
    expect(button.props().type).toBe('button');
  });

  test('Button prop type', () => {
    const button = shallow(<Button type='submit' onClick={() => null}>Btn</Button>);
    expect(button.props().type).toBe('submit');
  });

  test('Button prop onClick', () => {
    const onClick = jest.fn();
    const button = shallow(<Button onClick={onClick}>Btn</Button>);
    expect(button.props().onClick).toBe(onClick);
    button.simulate('click');
    expect(onClick.mock.calls.length).toEqual(1);
  });

  test('Button prop className', () => {
    const button = shallow(<Button className='btn--test' onClick={() => null}>Btn</Button>);
    expect(button.hasClass('btn--test')).toBe(true);
  });

  test('Button prop form', () => {
    const button = shallow(<Button form='test-form' onClick={() => null}>Btn</Button>);
    expect(button.props().form).toBe('test-form');
  });

  test('Button prop disabled', () => {
    const onClick = jest.fn();
    const button = mount(<Button disabled onClick={onClick}>Btn</Button>);
    button.simulate('click');
    expect(onClick.mock.calls.length).toEqual(0);
  });

  test('Button prop children', () => {
    const button = shallow(<Button onClick={() => null}>Btn</Button>);
    expect(button.props().children).toBe('Btn');
  });

});
