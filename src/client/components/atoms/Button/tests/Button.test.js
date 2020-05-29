import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../Button';

configure({ adapter: new Adapter() });

describe('Button', () => {
  describe('Some default details than the Button should have', () => {
    const button = mount(<Button>Btn</Button>);

    test('a prop children', () => {
      expect(button.props().children).toBe('Btn');
    });

    test('a class .btn', () => {
      expect(button.find('button').hasClass('btn')).toBe(true);
    });

    test('a prop type default', () => {
      expect(button.find('button').prop('type')).toBe('button');
    });
  });

  describe('If the color prop is changed', () => {
    test('should have a class .btn--primary', () => {
      const button = mount(<Button color='primary'>Btn</Button>);
      expect(button.find('button').hasClass('btn--primary')).toBe(true);
    });

    test('should have a class .btn--secondary', () => {
      const button = mount(<Button color='secondary'>Btn</Button>);
      expect(button.find('button').hasClass('btn--secondary')).toBe(true);
    });
  });

  describe('test mapping other properties', () => {
    test('should have a prop type', () => {
      const button = mount(<Button type='submit'>Btn</Button>);
      expect(button.props().type).toBe('submit');
    });

    test('should have a prop className', () => {
      const button = mount(<Button className='btn--test'>Btn</Button>);
      expect(button.find('button').hasClass('btn--test')).toBe(true);
    });

    test('should have a prop form', () => {
      const button = mount(<Button form='test-form'>Btn</Button>);
      expect(button.find('button').props().form).toBe('test-form');
    });
  });

  describe('If there is text and an icon', () => {
    test('the icon should be on the left by default:', () => {
      const button = mount(<Button icon={<h1>Icon</h1>}>Btn</Button>);
      expect(button.find('.btn__content').childAt(0).hasClass('btn__container--icon')).toBe(true);
    });

    test('the icon should be on the right by default:', () => {
      const button = mount(<Button icon={<h1>Icon</h1>} iconRight={true}>Btn</Button>);
      expect(button.find('.btn__content').childAt(1).hasClass('btn__container--icon')).toBe(true);
    });
  });

  describe('onClick event in different cases', () => {
    test('should execute onClick function:', () => {
      const onClick = jest.fn();
      const button = mount(<Button onClick={onClick}>Btn</Button>);

      button.find('button').simulate('click');
      expect(onClick.mock.calls.length).toEqual(1);
    });

    test('should not execute onClick function for disabled prop:', () => {
      const onClick = jest.fn();
      const button = mount(<Button disabled onClick={onClick}>Btn</Button>);

      button.find('button').simulate('click');
      expect(onClick.mock.calls.length).toEqual(0);
    });
  });

});
