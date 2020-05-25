import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import UsersManagementT from '../UsersManagementT';
import data from '../../../../__mocks__/components/UserTableMock';

configure({ adapter: new Adapter() });

const linkToViewUser = '/ViewUser';
const linkToEditUser = '/EditUser';
const linkToCreateNewUser = '/CreateUser';

function componentRender(data, fnImport, fnDel) {
  return mount(
    <MemoryRouter>
      <UsersManagementT
        isAdminWhoView={true}
        data={data || { columns: [], rows: [] }}
        linkToCreateNewUser={linkToCreateNewUser}
        fnImportUsers={fnImport || function () { return null; }}
        linkToViewUser={linkToViewUser}
        linkToEditUser={linkToEditUser}
        fnDeleteUser={fnDel || function () { return null; }}
      />
    </MemoryRouter>,
  );
}

describe('UsersManagementT Template', () => {
  describe('Default clases', () => {
    const usersMgmT = componentRender(data);
    test('article should have some class "users-management":', () => {
      expect(usersMgmT.find('main').hasClass('users-management')).toBeTruthy();
    });
  });
});
