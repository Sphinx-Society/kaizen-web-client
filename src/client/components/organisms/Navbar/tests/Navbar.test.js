import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import ProviderMock from '../../../../__mocks__/redux/ProviderMock';

import Navbar from '../Navbar';

configure({ adapter: new Adapter() });
const setUp = (store) => {
  const componenttoRender = mount(
    <MemoryRouter>
      <ProviderMock store={store}>
        <Navbar />
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

  test('Should render logo', () => {
    expect(component.find('.navbar__logo').length).toEqual(1);
  });

  test('Should render only two icons when user is not admin', () => {
    const icon = component.find('.navbar__links__link');
    expect(icon.length).toBe(3);
  });
});
