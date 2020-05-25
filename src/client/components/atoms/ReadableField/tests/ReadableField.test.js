import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReadableField from '../ReadableField';

configure({ adapter: new Adapter() });

describe('ReadableField', () => {
  describe('Default Classes', () => {
    const title = 'Name';
    const description = 'Bruce Wayne';
    const readField = render(
      <ReadableField title={title} description={description} />,
    );

    test('should have a class "readable-field"', () => {
      expect(readField.hasClass('readable-field')).toBeTruthy();
    });

    test('Child "dt" should have a class "readable-field__dt"', () => {
      expect(readField.find('dt').hasClass('readable-field__dt')).toBeTruthy();
    });

    test('Child "dt" should have a class "readable-field__dd"', () => {
      expect(readField.find('dd').hasClass('readable-field__dd')).toBeTruthy();
    });
  });
});
