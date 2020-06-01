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
        onInputChange={() => null}
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
        onInputChange={() => null}
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
        onInputChange={() => null}
      />,
    );
    const {
      onPrevClick,
      onNextClick,
      value,
      isYearly,
    } = datepickerCarousel.props();
    expect(onPrevClick).toBe(onPrevClickMock);
    expect(onNextClick).toBe(onNextClickMock);
    expect(value).toBe('January');
    expect(isYearly).toBe(true);
  });

  test('should throw onInputChange event:', () => {
    const datepickerCarousel = mount(
      <DatepickerCarousel
        onPrevClick={() => null}
        onNextClick={() => null}
        value='January'
        isYearly
        onInputChange={onInputChangeMock}
      />,
    );
    datepickerCarousel.find('.datepicker-carousel__input').simulate('change');
    expect(onInputChangeMock.mock.calls.length).toBe(1);
  });

  test('should throw onPrevClick event:', () => {
    const datepickerCarousel = mount(
      <DatepickerCarousel
        onPrevClick={onPrevClickMock}
        onNextClick={() => null}
        value='January'
        isYearly
        onInputChange={() => null}
      />,
    );
    datepickerCarousel.find('button').at(0).simulate('click');
    expect(onPrevClickMock.mock.calls.length).toBe(1);
  });

  test('should throw onNextClick event:', () => {
    const datepickerCarousel = mount(
      <DatepickerCarousel
        onPrevClick={() => {}}
        onNextClick={onNextClickMock}
        value='January'
        isYearly
        onInputChange={() => null}
      />,
    );
    datepickerCarousel.find('button').at(1).simulate('click');
    expect(onNextClickMock.mock.calls.length).toBe(1);
  });
});
