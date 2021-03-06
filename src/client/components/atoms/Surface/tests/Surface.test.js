import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Surface from '../Surface';

configure({ adapter: new Adapter() });

describe('Surface', () => {
  test('Surface have class .surface__container', () => {
    const surface = shallow(<Surface>Surface</Surface>);
    expect(surface.hasClass('surface__container')).toBe(true);
  });

  test('Surface prop className', () => {
    const surface = shallow(<Surface className='surface--test'>Surface</Surface>);
    expect(surface.hasClass('surface--test')).toBe(true);
  });

  test('Surface prop children', () => {
    const surface = shallow(<Surface>Surface</Surface>);
    expect(surface.props().children).toBe('Surface');
  });

});
