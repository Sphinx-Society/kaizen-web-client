import React from 'react';
import { configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Checkbox from '../Checkbox';

configure({ adapter: new Adapter() });

describe('Checkbox', () => {
  describe('There are some things by default, in static HTML', () => {
    const id = 'my-cBox';
    const cBox = render(<Checkbox id={id} onChange={() => null} />);

    describe('In component Checkbox (label):', () => {
      test(`Has a "for" (htmlFor) equal to "${id}"`, () => {
        expect(cBox.prop('for')).toBe(id);
      });

      test('Has a "class" equal to ".checkbox"', () => {
        expect(cBox.prop('class')).toBe('checkbox');
      });
    });

    describe('In child type "input":', () => {
      test(`Has a "id" equal to "${id}"`, () => {
        expect(cBox.find('[type=checkbox]').prop('id')).toBe(id);
      });

      test('Has a "class" equal to ".checkbox__input"', () => {
        expect(cBox.find('input').hasClass('checkbox__input')).toBe(true);
      });

      test('Has a prop "hidden"', () => {
        expect(cBox.find('input').prop('hidden')).toBe(true);
      });

      test('Has a prop "disabled" equal to "false"', () => {
        expect(cBox.find('input').prop('disabled')).toBe(false);
      });
    });

    describe('In child type "svg" (react-icon):', () => {
      test('Has a prop "width" (size) equal to "1em"', () => {
        expect(cBox.find('svg').prop('width')).toBe('1em');
      });

      test('Has a "class" equal to "hidden"', () => {
        expect(cBox.find('svg').prop('class')).toBe('hidden');
      });
    });

    describe('When "props" are passed size and disabled:', () => {
      const size = '2.8em';
      const cBox = render(
        <Checkbox id={id} onChange={() => null} size={size} disabled />,
      );

      test(`size equal to "${size}"`, () => {
        expect(cBox.find('svg').prop('width')).toBe(size);
      });

      test('disabled equal to "true"', () => {
        expect(cBox.find('input').prop('disabled')).toBe(true);
      });
    });
  });

  describe('When it is clicked', () => {
    describe('If, it is enable to check', () => {
      const onChangeFn = jest.fn().mockReturnValue(100);
      const cBox = mount(<Checkbox id='id100' onChange={onChangeFn} />);
      cBox.simulate('change');

      test('should be able to verify:', () => {
        expect(cBox.find('label').hasClass('checkbox checkbox--on')).toBe(true);
      });

      test('should not have classes on the icon:', () => {
        expect(cBox.find('FaCheck').prop('className')).toBeFalsy();
      });

      test('should be executed the function as parameter by onChange:', () => {
        expect(onChangeFn.mock.calls.length).toBe(1);
      });
    });

    describe('If, it is disabled', () => {
      const onChangeFn = jest.fn().mockReturnValue(200);
      const cBox = mount(<Checkbox disabled id='id200' onChange={onChangeFn} />);
      cBox.simulate('change');

      test('should be NOT able to verify:', () => {
        expect(onChangeFn.mock.calls.length).toEqual(0);
        expect(cBox.find('label').prop('className')).toBe('checkbox checkbox--disabled');
      });
    });
  });
});
