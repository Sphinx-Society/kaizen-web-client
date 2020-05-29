import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  FaCheck as CheckIcon,
  FaExclamationTriangle as WarningIcon,
  FaExclamationCircle as ErrorIcon,
} from 'react-icons/fa';

import Alert from '../Alert';

configure({ adapter: new Adapter() });

function componentRender(type, message, onClose, closeTime) {
  return mount(
    <Alert
      type={type}
      message={message}
      onClose={onClose || (() => null)}
      closeTime={closeTime}
    />,
  );
}

describe('Alert', () => {
  const alertSuccess = componentRender('success');
  const alertWarning = componentRender('warning');
  const alertError = componentRender('error');
  const alertId = '#feedback-alert-container';

  describe('Close feedback message', () => {
    test('should close if it was clicked on CloseIcon:', () => {
      const onCloseFn = jest.fn();
      const alertOnClick = componentRender('error', 'Message', onCloseFn);
      alertOnClick.find(alertId).childAt(2).simulate('click');
      expect(onCloseFn.mock.calls.length).toEqual(1);
    });

    test('should close if timer finished:', () => {
      const onCloseFn = jest.fn();
      jest.useFakeTimers();
      componentRender('error', 'Message', onCloseFn);
      expect(jest.getTimerCount()).toEqual(1);
      jest.runAllTimers();
      expect(jest.getTimerCount()).toEqual(0);
      expect(onCloseFn).toBeCalled();
    });

    test('should execute clearTimeout if it is unmount:', () => {
      jest.useFakeTimers();
      const alertOnClick = componentRender();
      expect(jest.getTimerCount()).toEqual(1);
      alertOnClick.unmount();
      expect(jest.getTimerCount()).toEqual(0);
    });
  });

  describe('Some default classess', () => {
    test('should exist ".alert":', () => {
      expect(alertSuccess.find(alertId).hasClass('alert')).toBeTruthy();
    });

    test('should exist ".alert__icon":', () => {
      expect(alertSuccess.find(alertId).childAt(0).hasClass('alert__icon')).toBeTruthy();
    });

    test('should exist ".alert__text":', () => {
      expect(alertSuccess.find(alertId).childAt(1).hasClass('alert__text')).toBeTruthy();
    });

    test('should exist ".alert__close":', () => {
      expect(alertSuccess.find(alertId).childAt(2).hasClass('alert__close')).toBeTruthy();
    });
  });

  describe('When de alert is the type = success', () => {
    test('should have a class "alert--success":', () => {
      expect(alertSuccess.find(alertId).hasClass('alert--success')).toBe(true);
    });

    test('should have a child <CheckIcon />:', () => {
      expect(alertSuccess.containsMatchingElement(<CheckIcon />)).toBe(true);
      expect(alertSuccess.containsMatchingElement(<ErrorIcon />)).toBe(false);
    });
  });

  describe('When de alert is the type = warning', () => {
    test('should have a class "alert--warning":', () => {
      expect(alertWarning.find(alertId).hasClass('alert--warning')).toBe(true);
    });

    test('should have a child <WarningIcon />:', () => {
      expect(alertWarning.containsMatchingElement(<WarningIcon />)).toBe(true);
      expect(alertWarning.containsMatchingElement(<ErrorIcon />)).toBe(false);
    });
  });

  describe('When de alert is the type = error', () => {
    test('should have a class "alert--error":', () => {
      expect(alertError.find(alertId).hasClass('alert--error')).toBe(true);
    });

    test('should have a child <ErrorIcon />:', () => {
      expect(alertError.containsMatchingElement(<ErrorIcon />)).toBe(true);
      expect(alertError.containsMatchingElement(<WarningIcon />)).toBe(false);
    });
  });
});
