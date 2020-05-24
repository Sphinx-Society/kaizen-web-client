import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import UsersManagementT from '../UsersManagementT';
import UserTableMock from '../../../../__mocks__/components/UserTableMock';

configure({ adapter: new Adapter() });

const linkToViewMore = '/ViewUser';
const linkToEdit = '/EditUser';
function componentRender() {
  return mount(
    <MemoryRouter>
      <UsersManagementT
        isAdminWhoView={true}
        data={UserTableMock}
        linkToViewMore={linkToViewMore}
        linkToEdit={linkToEdit}
        fnUserDelete={() => null}
      />
    </MemoryRouter>,
  );
}

describe('UsersManagementT Template', () => {
  describe('Default clases', () => {
    const usersMgmT = componentRender();
    test('article should have some class "users-management":', () => {
      expect(usersMgmT.find('main').hasClass('users-management')).toBeTruthy();
    });
  });
});
