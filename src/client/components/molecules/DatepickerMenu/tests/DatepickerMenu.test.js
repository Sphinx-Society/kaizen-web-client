import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DatepickerMenu from '../DatepickerMenu';

configure({ adapter: new Adapter() });

describe('DatepickerMenu', () => {
  const onPrevMonthClickMock = jest.fn();
  const onNextMonthClickMock = jest.fn();
  const onPrevYearClickMock = jest.fn();
  const onNextYearClickMock = jest.fn();
  const onYearChangeMock = jest.fn();

  test('DatepickerMenu have class .datepicker-menu__container', () => {
    const datepickerDay = shallow(
      <DatepickerMenu
        month={4}
        year={2005}
        onPrevMonthClick={onPrevMonthClickMock}
        onNextMonthClick={onNextMonthClickMock}
        onNextYearClick={onNextYearClickMock}
        onPrevYearClick={onPrevYearClickMock}
        onYearChange={onYearChangeMock}
      />,
    );
    expect(datepickerDay.hasClass('datepicker-menu__container')).toBe(true);
  });

  test('DatepickerMenu props with value', () => {
    const datepickerDay = mount(
      <DatepickerMenu
        month={4}
        year={2005}
        onPrevMonthClick={onPrevMonthClickMock}
        onNextMonthClick={onNextMonthClickMock}
        onNextYearClick={onNextYearClickMock}
        onPrevYearClick={onPrevYearClickMock}
        onYearChange={onYearChangeMock}
      />,
    );
    const {
      month,
      year,
      onPrevMonthClick,
      onNextMonthClick,
      onNextYearClick,
      onPrevYearClick,
      onYearChange,
    } = datepickerDay.find('DatepickerMenu').props();
    expect(month).toBe(4);
    expect(year).toBe(2005);
    expect(onPrevMonthClick).toBe(onPrevMonthClickMock);
    expect(onNextMonthClick).toBe(onNextMonthClickMock);
    expect(onNextYearClick).toBe(onNextYearClickMock);
    expect(onPrevYearClick).toBe(onPrevYearClickMock);
    expect(onYearChange).toBe(onYearChangeMock);
  });

});
