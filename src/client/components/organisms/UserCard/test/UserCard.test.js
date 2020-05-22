import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import UserCard from '../UserCard';

configure({ adapter: new Adapter() });

const linkToViewMore = '/ViewUser';
const linkToEdit = '/EditUser';

function componentRender() {
  return mount(
    <MemoryRouter>
      <UserCard
        isAdminWhoView={true}
        data={[
          { title: 'First Name', description: 'name' },
          { title: 'Last Name', description: 'lastname' },
          { title: 'id', description: '1234' },
        ]}
        linkToViewMore={linkToViewMore}
        linkToEdit={linkToEdit}
        onClickDelete={() => null}
      />
    </MemoryRouter>,
  );
}

describe('UserCard organism', () => {

  test('should have a prop isAdminWhoView in "true":', () => {
    const userCard = componentRender();
    expect(userCard.find('UserCard').prop('isAdminWhoView')).toBe(true);
  });

  describe('Some internal elements', () => {
    const userCard = componentRender();

    test('should exist 3 children into "ListReadableFiled":', () => {
      expect(userCard.find('ReadableField').length).toEqual(3);
    });

    test('should exist 3 children into "div.user-card__actions":', () => {
      expect(userCard.find('Button').length).toEqual(3);
    });
  });

  describe('Default clases', () => {
    const userCard = componentRender();

    test('article should have some class "user-card" and "surface--card"', () => {
      expect(userCard.find('article').hasClass('user-card')).toBeTruthy();
      expect(userCard.find('article').hasClass('surface--card')).toBeTruthy();
    });

    test('ListReadableFields should have a class "user-card__info"', () => {
      expect(userCard.find('ListReadableFields').hasClass('user-card__info')).toBeTruthy();
    });

    test('should exist a div with a class "user-card__actions"', () => {
      expect(userCard.find('.user-card > div').hasClass('user-card__actions')).toBeTruthy();
    });

    test('should exist 3 Buttons with a class "ssk--boxShadow"', () => {
      expect(userCard.find('Button').at(0).hasClass('ssk--boxShadow')).toBeTruthy();
      expect(userCard.find('Button').at(1).hasClass('ssk--boxShadow')).toBeTruthy();
      expect(userCard.find('Button').at(2).hasClass('ssk--boxShadow')).toBeTruthy();
    });
  });

  describe('The components "Link"', () => {
    test('should have two Link:', () => {
      const userCard = componentRender();
      expect(userCard.find('Link').length).toEqual(2);
    });

    test('should have a prop "to":', () => {
      const userCard = componentRender();
      expect(userCard.find('Link').at(0).prop('to')).toBe(linkToViewMore);
      expect(userCard.find('Link').at(1).prop('to')).toBe(linkToEdit);
    });
  });

  test('should excute the action delete:', () => {
    const onClickFn = jest.fn();
    const userCard = mount(
      <MemoryRouter>
        <UserCard
          isAdminWhoView={true}
          data={[
            { title: 'First Name', description: 'name' },
            { title: 'Last Name', description: 'lastname' },
            { title: 'id', description: '1234' },
          ]}
          linkToViewMore={linkToViewMore}
          linkToEdit={linkToEdit}
          onClickDelete={onClickFn}
        />
      </MemoryRouter>,
    );

    // Simulate other clicks null in the first buttons
    userCard.find('Button').at(0).simulate('click');
    userCard.find('Button').at(1).simulate('click');

    // The real action by external function
    userCard.find('Button').at(2).simulate('click');
    expect(onClickFn.mock.calls.length).toEqual(1);
  });
});
