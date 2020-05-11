import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Checkbox from '../Checkbox';

configure({ adapter: new Adapter() });

describe('Checkbox', () => {
  describe('There are some default classes', () => {
    const cBox = shallow(
      <Checkbox
        id='my-cBox'
        onChange={() => null}
        checked
      >
        checkbox
      </Checkbox>,
    );

    test('Has a class .checkbox', () => {
      expect(cBox.hasClass('checkbox')).toBe(true);
    });
  });
});
