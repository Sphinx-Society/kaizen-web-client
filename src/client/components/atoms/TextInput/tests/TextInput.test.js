import React from 'react';
import { shallow, configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextInput from '../TextInput';

configure({ adapter: new Adapter() });

describe('TextInput', () => {
  const stringMock = 'mock';
  const functionMock = jest.fn();

  test('TextInput have class .text-input__container', () => {
    const textInput = shallow(
      <TextInput
        value={stringMock}
        onChange={functionMock}
        placeholder={stringMock}
        id={stringMock}
      />,
    );
    expect(textInput.hasClass('text-input__container')).toBe(true);
  });

  test('TextInput label have class .text-input__label', () => {
    const textInput = render(
      <TextInput
        value={stringMock}
        onChange={functionMock}
        placeholder={stringMock}
        id={stringMock}
      />,
    );
    expect(textInput.find('label').hasClass('text-input__label')).toBe(true);
  });

  test('TextInput label have class .text-input__label--collected', () => {
    const textInput = render(
      <TextInput
        value={stringMock}
        onChange={functionMock}
        placeholder={stringMock}
        id={stringMock}
      />,
    );
    expect(textInput.find('label').hasClass('text-input__label--collected')).toBe(true);
  });

  test('TextInput label have class .text-input__label--collected only on value', () => {
    const textInput = render(
      <TextInput
        value=''
        onChange={functionMock}
        placeholder={stringMock}
        id={stringMock}
      />,
    );
    expect(textInput.find('label').hasClass('text-input__label--collected')).toBe(false);
  });

  test('TextInput input have class .text-input__input', () => {
    const textInput = render(
      <TextInput
        value={stringMock}
        onChange={functionMock}
        placeholder={stringMock}
        id={stringMock}
      />,
    );
    expect(textInput.find('input').hasClass('text-input__input')).toBe(true);
  });

  test('TextInput input have class .text-input__input--primary', () => {
    const textInput = render(
      <TextInput
        value={stringMock}
        onChange={functionMock}
        placeholder={stringMock}
        id={stringMock}
      />,
    );
    expect(textInput.find('input').hasClass('text-input__input--primary')).toBe(true);
  });

  test('TextInput input have class .text-input__input--secondary with secondary color variant', () => {
    const textInput = render(
      <TextInput
        value={stringMock}
        onChange={functionMock}
        placeholder={stringMock}
        id={stringMock}
        color='secondary'
      />,
    );
    expect(textInput.find('input').hasClass('text-input__input--secondary')).toBe(true);
  });

  test('TextInput default props', () => {
    const datepickerCarousel = mount(
      <TextInput
        value={stringMock}
        onChange={functionMock}
        placeholder={stringMock}
        id={stringMock}
      />,
    );
    const {
      containerClassName,
      labelClassName,
      inputClassName,
      required,
      disabled,
      color,
      value,
      onChange,
      placeholder,
      id,
    } = datepickerCarousel.props();
    expect(value).toBe('mock');
    expect(onChange).toBe(functionMock);
    expect(placeholder).toBe('mock');
    expect(id).toBe('mock');
    expect(containerClassName).toBe('');
    expect(labelClassName).toBe('');
    expect(inputClassName).toBe('');
    expect(required).toBe(false);
    expect(disabled).toBe(false);
    expect(color).toBe('primary');
  });

  test('TextInput props with value', () => {
    const datepickerCarousel = mount(
      <TextInput
        value={stringMock}
        onChange={functionMock}
        placeholder={stringMock}
        id={stringMock}
        containerClassName='container__cn__test'
        labelClassName='label__cn__test'
        inputClassName='input__cn__test'
        required={true}
        disabled={true}
        color='secondary'
      />,
    );
    const {
      value,
      onChange,
      placeholder,
      id,
      containerClassName,
      labelClassName,
      inputClassName,
      required,
      disabled,
      color,
    } = datepickerCarousel.props();
    expect(value).toBe('mock');
    expect(onChange).toBe(functionMock);
    expect(placeholder).toBe('mock');
    expect(id).toBe('mock');
    expect(containerClassName).toBe('container__cn__test');
    expect(labelClassName).toBe('label__cn__test');
    expect(inputClassName).toBe('input__cn__test');
    expect(required).toBe(true);
    expect(disabled).toBe(true);
    expect(color).toBe('secondary');
  });

});
