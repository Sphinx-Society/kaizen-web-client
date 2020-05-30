import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import NavbarProvider from '../NavbarProvider';
import ProviderMock from '../../../../__mocks__/redux/ProviderMock';

configure({ adapter: new Adapter() });
const setUp = (store) => {
  const componenttoRender = mount(
    <MemoryRouter>
      <ProviderMock store={store}>
        <NavbarProvider />
      </ProviderMock>
    </MemoryRouter>
    ,
  );
  return componenttoRender;
};

describe('Navbar organism', () => {
  let component;
  beforeEach(() => {
    const myStore = { user: { user: { role: 'admin' } } };
    component = setUp(myStore);
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
