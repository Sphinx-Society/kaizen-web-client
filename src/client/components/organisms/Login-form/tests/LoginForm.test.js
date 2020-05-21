import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProviderMock from '../../../../__mocks__/redux/ProviderMock';
import LoginForm from '../LoginForm';

configure({ adapter: new Adapter() });

describe('LoginForm', () => {
  const loginForm = shallow(
    <ProviderMock>
      <LoginForm />
    </ProviderMock>,
  );
  test('Should render without errors', () => {
    expect(loginForm.length).toEqual(1);
  });
  test('Should render without errors', () => {
    const loginForm = mount(
      <ProviderMock>
        <LoginForm />
      </ProviderMock>,
    );
    expect(loginForm.find('.form-container').length).toEqual(1);
  });
});
