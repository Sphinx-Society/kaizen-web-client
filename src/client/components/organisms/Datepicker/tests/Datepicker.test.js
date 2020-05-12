import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Datepicker from '../Datepicker';

configure({ adapter: new Adapter() });

describe('Datepicker', () => {
  test('Datepicker have class .datepicker__container', () => {
    const datepicker = shallow(<Datepicker />);
    const container = datepicker.find('div').at(0);
    expect(container.hasClass('datepicker__container')).toBe(true);
  });

  test('Datepicker input container have class .datepicker__input__container', () => {
    const datepicker = shallow(<Datepicker />);
    const container = datepicker.find('div').at(1);
    expect(container.hasClass('datepicker__input__container')).toBe(true);
  });

  test('Datepicker default props', () => {
    const datepicker = mount(<Datepicker />);
    const {
      initialMonth,
      initialYear,
      weekDays,
      months,
      value,
      onChange,
      placeholder,
    } = datepicker.props();
    expect(initialMonth).toBe(new Date().getMonth());
    expect(initialYear).toBe(new Date().getFullYear());
    expect(weekDays).toStrictEqual(['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sab']);
    expect(months).toStrictEqual(['January', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']);
    expect(value).toBe(new Date().setHours(0, 0, 0, 0));
    expect(typeof onChange).toBe('function');
    expect(placeholder).toBe('Fecha');
  });

  test('Datepicker props with value', () => {
    const onChangeMock = jest.fn();
    const datepicker = mount(
      <Datepicker
        initialMonth={1}
        initialYear={1}
        weekDays={['a', 'b', 'c']}
        months={['c', 'b', 'a']}
        value={256}
        onChange={onChangeMock}
        placeholder='Birthday'
      />,
    );
    const {
      initialMonth,
      initialYear,
      weekDays,
      months,
      value,
      onChange,
      placeholder,
    } = datepicker.props();
    expect(initialMonth).toBe(1);
    expect(initialYear).toBe(1);
    expect(weekDays).toStrictEqual(['a', 'b', 'c']);
    expect(months).toStrictEqual(['c', 'b', 'a']);
    expect(value).toBe(256);
    expect(onChange).toBe(onChangeMock);
    expect(placeholder).toBe('Birthday');
  });

});
