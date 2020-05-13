import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Checkbox from '../Checkbox';

configure({ adapter: new Adapter() });

describe('Checkbox', () => {
  describe('There are some things by default, in static HTML', () => {
    const id = 'my-cBox';
    const cBox = render(<Checkbox id={id} onChange={() => null}>checkbox</Checkbox>);

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
        <Checkbox id={id} onChange={() => null} size={size} disabled>
          checkbox
        </Checkbox>,
      );

      test(`size equal to "${size}"`, () => {
        expect(cBox.find('svg').prop('width')).toBe(size);
      });

      test('disabled equal to "true"', () => {
        expect(cBox.find('input').prop('disabled')).toBe(true);
      });
    });
  });
});
