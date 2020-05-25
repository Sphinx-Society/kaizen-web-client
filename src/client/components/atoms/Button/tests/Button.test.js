import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../Button';

configure({ adapter: new Adapter() });

describe('Button', () => {
  test('Button have class .btn', () => {
    const button = mount(<Button>Btn</Button>);
    expect(button.find('button').hasClass('btn')).toBe(true);
  });

  test('Button have class .btn--primary', () => {
    const button = mount(<Button color='primary'>Btn</Button>);
    expect(button.find('button').hasClass('btn--primary')).toBe(true);
  });

  test('Button have class .btn--secondary', () => {
    const button = mount(<Button color='secondary'>Btn</Button>);
    expect(button.find('button').hasClass('btn--secondary')).toBe(true);
  });

  test('Button prop type default', () => {
    const button = mount(<Button>Btn</Button>);
    expect(button.props().type).toBe('button');
  });

  test('Button prop type', () => {
    const button = mount(<Button type='submit'>Btn</Button>);
    expect(button.props().type).toBe('submit');
  });

  test('Button prop onClick', () => {
    const onClick = jest.fn();
    const button = mount(<Button onClick={onClick}>Btn</Button>);
    expect(button.props().onClick).toBe(onClick);
    button.simulate('click');
    expect(onClick.mock.calls.length).toEqual(1);
  });

  test('Button prop className', () => {
    const button = mount(<Button className='btn--test'>Btn</Button>);
    expect(button.find('button').hasClass('btn--test')).toBe(true);
  });

  test('Button prop form', () => {
    const button = mount(<Button form='test-form'>Btn</Button>);
    expect(button.props().form).toBe('test-form');
  });

  test('Button prop disabled', () => {
    const onClick = jest.fn();
    const button = mount(<Button disabled onClick={onClick}>Btn</Button>);
    button.simulate('click');
    expect(onClick.mock.calls.length).toEqual(0);
  });

  test('Button prop children', () => {
    const button = mount(<Button>Btn</Button>);
    expect(button.props().children).toBe('Btn');
  });

});
