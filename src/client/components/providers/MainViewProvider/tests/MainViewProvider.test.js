import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MainViewProvider from '../MainViewProvider';

configure({ adapter: new Adapter() });

describe('MainViewProvider', () => {
  const titleMock = 'title';
  const onBackButtonClickMock = jest.fn();
  const ChildrenMock = () => <p>content</p>;
  const MenuMock = () => <button type='button'>menu button</button>;

  const mainViewProviderMount = mount(
    <MainViewProvider
      title={titleMock}
      showBottomLine
      moveTitle
    >
      <ChildrenMock />
    </MainViewProvider>,
  );

  test('should have class ".main-view-provider":', () => {
    expect(mainViewProviderMount.find('div').at(1).hasClass('main-view-provider')).toBe(true);
  });

  test('should have class ".main-view-provider--title-moved":', () => {
    expect(mainViewProviderMount.find('div').at(1).hasClass('main-view-provider--title-moved')).toBe(true);
  });

  test('head should have class ".main-view-provider__head":', () => {
    expect(mainViewProviderMount.find('div').at(2).hasClass('main-view-provider__head')).toBe(true);
  });

  test('head should have class ".main-view-provider__head--bottom-line":', () => {
    expect(mainViewProviderMount.find('div').at(2).hasClass('main-view-provider__head--bottom-line')).toBe(true);
  });

  test('default props":', () => {
    const mainViewProviderDefaultProps = mount(
      <MainViewProvider
        title={titleMock}
      >
        <ChildrenMock />
      </MainViewProvider>,
    );

    const {
      menu,
      showBackButton,
      showBottomLine,
      moveTitle,
      onBackButtonClick,
    } = mainViewProviderDefaultProps.find('MainViewProvider').props();
    expect(menu).toBe(null);
    expect(showBackButton).toBe(false);
    expect(showBottomLine).toBe(false);
    expect(moveTitle).toBe(false);
    expect(typeof onBackButtonClick).toBe('function');
  });

  test('props values":', () => {
    const mainViewProviderDefaultProps = mount(
      <MainViewProvider
        title={titleMock}
        showBackButton
        showBottomLine
        moveTitle
        menu={<MenuMock />}
        onBackButtonClick={onBackButtonClickMock}
      >
        <ChildrenMock />
      </MainViewProvider>,
    );

    const {
      menu,
      showBackButton,
      showBottomLine,
      moveTitle,
      title,
      children,
      onBackButtonClick,
    } = mainViewProviderDefaultProps.find('MainViewProvider').props();

    expect(menu).toStrictEqual(<MenuMock />);
    expect(showBackButton).toBe(true);
    expect(showBottomLine).toBe(true);
    expect(moveTitle).toBe(true);
    expect(title).toBe(titleMock);
    expect(children).toStrictEqual(<ChildrenMock />);
    expect(onBackButtonClick).toStrictEqual(onBackButtonClickMock);
  });
});
