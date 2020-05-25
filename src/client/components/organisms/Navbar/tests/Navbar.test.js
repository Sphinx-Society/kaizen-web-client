import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import ProviderMock from '../../../../__mocks__/redux/ProviderMock';

import Navbar from '../Navbar';

configure({ adapter: new Adapter() });
const setUp = () => {
  const componenttoRender = mount(

    <MemoryRouter>
      <ProviderMock>
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
    component = setUp();

  });
  test('Should render without errors', () => {
    expect(component.length).toEqual(1);
  });

  test('Should render logo', () => {
    expect(component.find('.navbar__logo').length).toEqual(1);
  });
  test('Should render only two icons when user is not admin', () => {
    const icon = component.find('.button--container');
    expect(icon.length).toBe(2);
  });
});
