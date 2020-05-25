import React from 'react';
import { configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Select from '../Select';

configure({ adapter: new Adapter() });

describe('Select', () => {
  const id = 'my-select';
  const placeholder = 'Five Options';
  const valueInitial = '';
  const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];

  describe('There are some things by default, in static HTML', () => {
    const select = render(
      <Select
        name={id}
        id={id}
        placeholder={placeholder}
        value={valueInitial}
        onChange={() => console.info('Select activated')}
        options={options}
      />,
    );

    describe('In component Select (div):', () => {
      test('Has a "class" equal to ".select"', () => {
        expect(select.prop('class')).toBe('select');
      });

      test('Has a prop "disabled" equal to "false"', () => {
        expect(select.prop('disabled')).toBeFalsy();
      });
    });

    describe('In child type "label":', () => {
      test(`Has a "for" (htmlFor) equal to "${id}"`, () => {
        expect(select.find('label').prop('for')).toBe(id);
      });

      test('Has a "class" equal to ".select__label"', () => {
        expect(select.find('label').prop('class')).toBe('select__label');
      });

      test('Has a placeholder equal to ".select__label"', () => {
        expect(select.find('label').text()).toBe(placeholder);
      });
    });

    describe('In child type "select":', () => {
      test(`Has a "id" equal to "${id}"`, () => {
        expect(select.find('select').prop('id')).toBe(id);
      });

      test('Has a "class" equal to ".select__select"', () => {
        expect(select.find('select').hasClass('select__select')).toBe(true);
      });

      test('Has a prop "disabled" equal to "false"', () => {
        expect(select.find('select').prop('disabled')).toBe(false);
      });

      test('In the first children <option> value equal to empty string', () => {
        expect(select.find('option')[2].attribs.value).toBe(options[1]);
      });
    });

    describe('In child type "svg" (react-icon):', () => {
      test('Has a prop "width" (size) equal to "1.5em"', () => {
        expect(select.find('svg').prop('width')).toBe('1.5em');
      });
    });

    describe('If it is disabled', () => {
      const select = render(
        <Select
          disabled
          name={id}
          id={id}
          placeholder={placeholder}
          value={valueInitial}
          onChange={() => console.info('Select disabled')}
          options={options}
        />,
      );

      test('should have a prop "disabled":', () => {
        expect(select.find('select').prop('disabled')).toBeTruthy();
      });
    });
  });

  describe('When it is changed the value', () => {
    describe('If it is possible to choose', () => {
      let valueTest = '';
      const onChangeFn = (newValue) => { valueTest = newValue; };
      const select = mount(
        <Select
          name={id}
          id={id}
          placeholder={placeholder}
          value={valueTest}
          onChange={onChangeFn}
          options={options}
        />,
      );

      select.find('select').simulate('change', { target: { value: options[2] } });
      select.setProps({ value: valueTest });

      test('should have changed the value of "valueTest":', () => {
        expect(valueTest).toEqual(options[2]);
      });

      test('should be added a new class:', () => {
        expect(select.children().find('label').prop('className')).toEqual('select__label select__label--value');
      });
    });
  });
});
