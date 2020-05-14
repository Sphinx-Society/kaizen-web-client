import React from 'react';
import { configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Toggle from '../Toggle';

configure({ adapter: new Adapter() });

describe('Toggle', () => {
  describe('There are some things by default, in static HTML', () => {
    const id = 'my-toggle';
    const toggle = render(<Toggle id={id} onChange={() => null} />);

    describe('In component Toggle (label):', () => {
      test(`Has a "for" (htmlFor) equal to "${id}"`, () => {
        expect(toggle.prop('for')).toBe(id);
      });

      test('Has a "class" equal to ".toggle"', () => {
        expect(toggle.prop('class')).toBe('toggle');
      });
    });

    describe('In child type "input":', () => {
      test(`Has a "id" equal to "${id}"`, () => {
        expect(toggle.find('[type=checkbox]').prop('id')).toBe(id);
      });

      test('Has a "class" equal to ".toggle__input"', () => {
        expect(toggle.find('input').hasClass('toggle__input')).toBe(true);
      });

      test('Has a prop "hidden"', () => {
        expect(toggle.find('input').prop('hidden')).toBe(true);
      });

      test('Has a prop "disabled" equal to "false"', () => {
        expect(toggle.find('input').prop('disabled')).toBe(false);
      });
    });

    describe('In child type "svg" (react-icon):', () => {
      test('Has a prop "width" (size) equal to "1em"', () => {
        expect(toggle.find('svg').prop('width')).toBe('1em');
      });

      test('Has a "class" equal to "hidden"', () => {
        expect(toggle.find('svg').hasClass('toggle__cicle')).toBe(true);
      });
    });

    describe('When "props" are passed size and disabled:', () => {
      const size = '2.8em';
      const toggle = render(
        <Toggle id={id} onChange={() => null} size={size} disabled />,
      );

      test(`size equal to "${size}"`, () => {
        expect(toggle.find('svg').prop('width')).toBe(size);
      });

      test('disabled equal to "true"', () => {
        expect(toggle.find('input').prop('disabled')).toBe(true);
      });
    });
  });

  describe('When it is clicked', () => {
    describe('If, it is enable to check', () => {
      const onChangeFn = jest.fn().mockReturnValue(100);
      const toggle = mount(<Toggle id='id100' onChange={onChangeFn} />);

      toggle.simulate('change');

      test('should be able to verify:', () => {
        expect(toggle.find('FaCircle').hasClass('toggle__cicle--on')).toBe(true);
      });

      test('should be executed the function as parameter by onChange:', () => {
        expect(onChangeFn.mock.calls.length).toBe(1);
      });
    });

    describe('If, it is disabled', () => {
      const onChangeFn = jest.fn().mockReturnValue(200);
      const toggle = mount(<Toggle disabled id='id200' onChange={onChangeFn} />);

      toggle.simulate('change');

      test('should be NOT able to verify:', () => {
        expect(onChangeFn.mock.calls.length).toEqual(0);
        expect(toggle.find('label').prop('className')).toBe('toggle toggle--disabled');
      });
    });
  });
});
