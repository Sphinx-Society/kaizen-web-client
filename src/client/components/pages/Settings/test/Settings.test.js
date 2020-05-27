import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import Settings from '../Settings';

configure({ adapter: new Adapter() });

const setUp = () => {
  const componenttoRender = mount(

    <MemoryRouter>
      <Settings />
    </MemoryRouter>
    ,
  );
  return componenttoRender;
};

describe('Navbar organism', () => {
  let component;
  beforeAll(() => {
    component = setUp();

  });
  test('Should render without errors', () => {
    expect(component.length).toEqual(1);
  });

  test('Should render logo without errors', () => {
    expect(component.find('.settings-container__logo').length).toEqual(1);
  });
  test('Should render profile Link', () => {
    const profile = component.find('#profile-link').hostNodes();
    expect(profile.length).toBe(1);
  });
  test('Should render profile Link', () => {
    const toggle = component.find('#logout').hostNodes();
    expect(toggle.length).toBe(1);
  });
});
