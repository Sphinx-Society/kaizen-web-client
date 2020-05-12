import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DatepickerDay from '../DatepickerDay';

configure({ adapter: new Adapter() });

describe('DatepickerDay', () => {
  const onClickMock = jest.fn();

  test('DatepickerDay have class .datepicker-day__container', () => {
    const datepickerDay = shallow(
      <DatepickerDay
        onClick={onClickMock}
        isOtherMonth={false}
        selectedDay={15}
        day={15}
      />,
    );
    expect(datepickerDay.hasClass('datepicker-day__container')).toBe(true);
  });

  test('DatepickerDay have class .datepicker-day__container--otherMonth', () => {
    const datepickerDay = shallow(
      <DatepickerDay
        onClick={onClickMock}
        isOtherMonth={true}
        selectedDay={15}
        day={15}
      />,
    );
    expect(datepickerDay.hasClass('datepicker-day__container--otherMonth')).toBe(true);
  });

  test('DatepickerDay have class .datepicker-day__container--selected', () => {
    const datepickerDay = shallow(
      <DatepickerDay
        onClick={onClickMock}
        isOtherMonth={true}
        selectedDay={15}
        day={15}
      />,
    );
    expect(datepickerDay.hasClass('datepicker-day__container--selected')).toBe(true);
  });

  test('DatepickerDay props with value', () => {
    const datepickerDay = mount(
      <table>
        <tbody>
          <tr>
            <DatepickerDay
              onClick={onClickMock}
              isOtherMonth={true}
              selectedDay={15}
              day={15}
            />
          </tr>
        </tbody>
      </table>,
    );
    const {
      isOtherMonth,
      onClick,
      selectedDay,
      day,
    } = datepickerDay.find('DatepickerDay').props();
    expect(isOtherMonth).toBe(true);
    expect(onClick).toBe(onClickMock);
    expect(selectedDay).toBe(15);
    expect(day).toBe(15);
  });

});
