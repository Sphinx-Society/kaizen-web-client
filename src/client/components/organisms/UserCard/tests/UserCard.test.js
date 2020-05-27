import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import UserCard from '../UserCard';

configure({ adapter: new Adapter() });

const onClickFn = jest.fn();

function componentRender() {
  return mount(
    <UserCard
      isAdminWhoView={true}
      data={[
        { title: 'First Name', description: 'name' },
        { title: 'Last Name', description: 'lastname' },
        { title: 'id', description: '1234' },
      ]}
      onEditClick={() => onClickFn}
      onClickDelete={onClickFn}
    />,
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
      expect(userCard.find('Button').length).toEqual(2);
    });
  });

  describe('Default clases', () => {
    const userCard = componentRender();

    test('article should have some class "user-card" and "--surface-card"', () => {
      expect(userCard.find('article').hasClass('user-card')).toBeTruthy();
      expect(userCard.find('article').hasClass('--surface-card')).toBeTruthy();
    });

    test('ListReadableFields should have a class "user-card__info"', () => {
      expect(userCard.find('ListReadableFields').hasClass('user-card__info')).toBeTruthy();
    });

    test('should exist a div with a class "user-card__actions"', () => {
      expect(userCard.find('.user-card > div').hasClass('user-card__actions')).toBeTruthy();
    });

    test('should exist 3 Buttons with a class "--boxShadow"', () => {
      expect(userCard.find('Button').at(0).hasClass('--boxShadow')).toBeTruthy();
      expect(userCard.find('Button').at(1).hasClass('--boxShadow')).toBeTruthy();
    });
  });

  test('should excute the action delete:', () => {
    const userCard = mount(
      <UserCard
        isAdminWhoView={true}
        data={[
          { title: 'First Name', description: 'name' },
          { title: 'Last Name', description: 'lastname' },
          { title: 'id', description: '1234' },
        ]}
        onEditClick={() => onClickFn}
        onClickDelete={onClickFn}
      />,
    );

    // Simulate other clicks null in the first buttons
    userCard.find('Button').at(0).simulate('click');
    expect(onClickFn.mock.calls.length).toEqual(1);

    // userCard.find('Button').at(1).simulate('click');
  });
});
