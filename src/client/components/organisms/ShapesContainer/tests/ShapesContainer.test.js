import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ShapesContainer from '../ShapesContainer';
import findByTestAttr from '../../../../utils/tests/testFuntions';

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const componentToRender = shallow(<ShapesContainer {...props} />);
  return componentToRender;
};

describe('Login', () => {
  let component;
  beforeEach(() => {
    component = setUp();

  });
  test('Should render without errors', () => {
    const container = findByTestAttr(component, 'shapes-container');
    expect(container.length).toBe(1);
  });
});
