import React from 'react';
import { configure, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListReadableFields from '../ListReadableFields';

configure({ adapter: new Adapter() });

describe('ListReadableFields molecule', () => {
  describe('Default Classes', () => {
    const extraClass = 'extra-class';
    const listRF = render(
      <ListReadableFields className={extraClass}>
        Child node
      </ListReadableFields>,
    );
    test('should have a default class "list-readable-fields"', () => {
      expect(listRF.hasClass('list-readable-fields')).toBeTruthy();
    });

    test(`should have a extra class "${extraClass}"`, () => {
      expect(listRF.hasClass(extraClass)).toBeTruthy();
    });
  });

  describe('Default Classes', () => {
    const testText = 'Child node';
    const listRF = shallow(
      <ListReadableFields>
        <span>{testText}</span>
      </ListReadableFields>,
    );
    test('should have a default class "list-readable-fields"', () => {
      expect(listRF.children('span').text()).toEqual(testText);
    });
  });
});
