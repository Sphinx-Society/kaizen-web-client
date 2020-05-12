import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DatepickerCarousel from '../DatepickerCarousel';

configure({ adapter: new Adapter() });

describe('DatepickerCarousel', () => {
  const onPrevClickMock = jest.fn();
  const onNextClickMock = jest.fn();
  const onInputChangeMock = jest.fn();

  test('DatepickerCarousel have class .datepicker-carousel__container', () => {
    const datepickerCarousel = shallow(
      <DatepickerCarousel
        onPrevClick={onPrevClickMock}
        onNextClick={onNextClickMock}
        value={15}
      />,
    );
    expect(datepickerCarousel.hasClass('datepicker-carousel__container')).toBe(true);
  });

  test('DatepickerCarousel default props', () => {
    const datepickerCarousel = mount(
      <DatepickerCarousel
        onPrevClick={onPrevClickMock}
        onNextClick={onNextClickMock}
        value={15}
      />,
    );
    const {
      onPrevClick,
      onNextClick,
      value,
      isYearly,
      onInputChange,
    } = datepickerCarousel.props();
    expect(onPrevClick).toBe(onPrevClickMock);
    expect(onNextClick).toBe(onNextClickMock);
    expect(value).toBe(15);
    expect(isYearly).toBe(false);
    expect(typeof onInputChange).toBe('function');
  });

  test('DatepickerCarousel props with value', () => {
    const datepickerCarousel = mount(
      <DatepickerCarousel
        onPrevClick={onPrevClickMock}
        onNextClick={onNextClickMock}
        value='January'
        isYearly
        onInputChange={onInputChangeMock}
      />,
    );
    const {
      onPrevClick,
      onNextClick,
      value,
      isYearly,
      onInputChange,
    } = datepickerCarousel.props();
    expect(onPrevClick).toBe(onPrevClickMock);
    expect(onNextClick).toBe(onNextClickMock);
    expect(value).toBe('January');
    expect(isYearly).toBe(true);
    expect(onInputChange).toBe(onInputChangeMock);
  });

});
