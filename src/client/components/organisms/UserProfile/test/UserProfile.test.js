import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import UserProfile from '../UserProfile';

configure({ adapter: new Adapter() });

function componentRender() {
  return mount(
    <MemoryRouter>
      <UserProfile />
    </MemoryRouter>,
  );
}
describe('UserProfile organism', () => {
  test('should reender without errors', () => {
    const userCard = componentRender();
    expect(userCard.find('.user-profile').length).toBe(1);
  });
  describe('The components "Link"', () => {
    test('should have a Link', () => {
      const userCard = componentRender();
      expect(userCard.find('Link').length).toBe(1);
    });

    test('should have a prop "to":', () => {
      const userCard = componentRender();
      expect(userCard.find('Link').prop('to')).toBe('/');
    });
  });
  describe('Profile Info', () => {
    test('should have 8 readableField components', () => {
      const userCard = componentRender();
      expect(userCard.find('ReadableField').length).toBe(8);
    });
    test('should have title prop with "Nombre" value', () => {
      const userCard = componentRender();
      expect(userCard.find('ReadableField').at(0).prop('title')).toBe('Nombre');
    });
    test('should have title prop with "Apellido" value', () => {
      const userCard = componentRender();
      expect(userCard.find('ReadableField').at(1).prop('title')).toBe('Apellido');
    });
    test('should have title prop with "País" value', () => {
      const userCard = componentRender();
      expect(userCard.find('ReadableField').at(2).prop('title')).toBe('País');
    });
    test('should have title prop with "Documento" value', () => {
      const userCard = componentRender();
      expect(userCard.find('ReadableField').at(3).prop('title')).toBe('Documento');
    });
    test('should have title prop with "Fecha de nacimiento" value', () => {
      const userCard = componentRender();
      expect(userCard.find('ReadableField').at(4).prop('title')).toBe('Fecha de nacimiento');
    });
    test('should have title prop with "Género" value', () => {
      const userCard = componentRender();
      expect(userCard.find('ReadableField').at(5).prop('title')).toBe('Género');
    });
    test('should have title prop with "Correo electrónico" value', () => {
      const userCard = componentRender();
      expect(userCard.find('ReadableField').at(6).prop('title')).toBe('Correo electrónico');
    });
    test('should have title prop with "Nombre" value', () => {
      const userCard = componentRender();
      expect(userCard.find('ReadableField').at(7).prop('title')).toBe('Teléfono');
    });
  });
});
