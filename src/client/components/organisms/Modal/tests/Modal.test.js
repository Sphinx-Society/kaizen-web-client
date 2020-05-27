import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Modal from '../Modal';

configure({ adapter: new Adapter() });

function componentRender(type = 'confirm') {
  const message = 'Message of test';
  const modal = shallow(
    <Modal
      type={type}
      message={message}
      mainFn={() => null}
      onClose={() => null}
    />,
  );

  return { modal, message };
}

describe('Modal', () => {
  describe('Default Classes', () => {
    const { modal } = componentRender('confirm');

    test('should have a class "modal":', () => {
      expect(modal.find('.modal')).toBeTruthy();
    });

    test('should have a class "modal__close" the first direct child:', () => {
      expect(modal.find('.modal').children().at(0).hasClass('modal__close')).toBeTruthy();
    });

    test('should have a class "modal__message" the second direct child:', () => {
      expect(modal.find('.modal').children().at(1).hasClass('modal__message')).toBeTruthy();
    });

    test('should have a class "modal__actions" the last direct child:', () => {
      expect(modal.find('.modal').children().at(2).hasClass('modal__actions')).toBeTruthy();
    });

    test('should have a class "modal__actions-btn-close" the button "Cancelar":', () => {
      expect(modal.find('.modal__actions-btn-close').render().text()).toBe('Cancelar');
    });
  });

  describe('Test some props', () => {
    const { modal, message } = componentRender('delete');

    test('mainAction Button should have prop "icon" equal to "warning":', () => {
      expect(modal.find('.modal__actions').children().at(0).prop('color')).toBe('warning');
    });

    test('should have a message:', () => {
      expect(modal.find('.modal__message').at(0).text()).toBe(message);
    });

    test('should have a message:', () => {
      const classNameTest = { className: 'textOfTest' };
      modal.setProps(classNameTest);
      expect(modal.hasClass(`${classNameTest.className}`)).toBeTruthy();
    });
  });
});
