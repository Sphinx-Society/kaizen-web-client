import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import NavbarProvider from '../NavbarProvider';

configure({ adapter: new Adapter() });
const setUp = () => {
  const componenttoRender = mount(

    <MemoryRouter>
      <NavbarProvider />
    </MemoryRouter>
    ,
  );
  return componenttoRender;
};

describe('Navbar organism', () => {
  let component;
  beforeEach(() => {
    component = setUp();

  });
  test('Should render without errors', () => {
    expect(component.length).toEqual(1);
  });

  test('Should render navbar-provider', () => {
    expect(component.find('.navbar-provider').length).toEqual(1);
  });
  test('Should render Navbar component', () => {
    const navbar = component.find('Navbar');
    expect(navbar.length).toBe(1);
  });
});
