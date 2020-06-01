import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import ProviderMock from '../../../../__mocks__/redux/ProviderMock';
import Settings from '../Settings';

configure({ adapter: new Adapter() });

const setUp = () => {
  const myStore = { user: { user: { role: 'admin', id: '2' } } };
  document.cookie = 'token=1';
  document.cookie = 'uid=2';
  document.cookie = 'role=admin';

  const componenttoRender = mount(
    shallow(
      <MemoryRouter>
        <ProviderMock store={myStore}>
          <Settings history={{}} />
        </ProviderMock>
      </MemoryRouter>,
    ).get(0),
  );
  return componenttoRender;
};

describe('Settings organism', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  test('Should render without errors', () => {
    expect(component.length).toEqual(1);
  });

  test('Should render logo without errors', () => {
    component = setUp();
    expect(component.find('.settings-container__logo').length).toEqual(1);
  });
});
