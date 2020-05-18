import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from '../Navbar';

configure({ adapter: new Adapter() });

describe('Navbar', () => {
  describe('There are some things by default, in static HTML', () => {
    const navbar = mount(
      <Navbar
        onClickSearch={() => null}
        onClickProfile={() => null}
        onClickSettings={() => null}
      />,
    );

    describe('Default classes', () => {
      test('Navbar has a "class" equal to ".navbar":', () => {
        expect(navbar.find('nav').hasClass('navbar')).toBe(true);
      });

      test('Container logo has a "class" equal to ".navbar__logo":', () => {
        expect(navbar.find('nav > div').at(0).hasClass('navbar__logo')).toBe(true);
      });

      test('Container buttons has a "class" equal to ".navbar__buttons":', () => {
        expect(navbar.find('nav > div').at(1).hasClass('navbar__buttons')).toBe(true);
      });
    });

    describe('Default props in actions buttons', () => {
      test('have a "type" equal to "icon":', () => {
        const btn = navbar.find('Button');
        expect(btn.at(0).prop('type')).toBe('icon');
        expect(btn.at(1).prop('type')).toBe('icon');
        expect(btn.at(2).prop('type')).toBe('icon');
      });

      test('have a prop "icon":', () => {
        const btn = navbar.find('Button');
        expect(btn.at(0).prop('icon')).toBeTruthy();
        expect(btn.at(1).prop('icon')).toBeTruthy();
        expect(btn.at(2).prop('icon')).toBeTruthy();
      });
    });
  });

  describe('Click event activated', () => {
    function eventOnClickSetup() {
      const onClickFn = jest.fn();
      return {
        onClickFn,
        'navbar': mount(
          <Navbar
            onClickSearch={onClickFn}
            onClickProfile={onClickFn}
            onClickSettings={onClickFn}
          />,
        ),
      };
    }

    test('should execute a function by first button:', () => {
      const { navbar, onClickFn } = eventOnClickSetup();
      navbar.find('Button').at(0).simulate('click');
      expect(onClickFn.mock.calls.length).toEqual(1);
    });

    test('should execute a function by middle button:', () => {
      const { navbar, onClickFn } = eventOnClickSetup();
      navbar.find('Button').at(1).simulate('click');
      expect(onClickFn.mock.calls.length).toEqual(1);
    });

    test('should execute a function by last button:', () => {
      const { navbar, onClickFn } = eventOnClickSetup();
      navbar.find('Button').at(2).simulate('click');
      expect(onClickFn.mock.calls.length).toEqual(1);
    });
  });
});
