import React from 'react';
import { configure, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TemplateCard from '../TemplateCard';

configure({ adapter: new Adapter() });

describe('TemplateCard', () => {
  describe('Default Classes', () => {
    const nameMock = 'Blood test';
    const categoryMock = 'Laboratory';
    const creationDateMock = 1234568512;

    test('Should have a class ".exam-card"', () => {
      const templateCard = render(
        <TemplateCard
          name={nameMock}
          category={categoryMock}
          creationDate={creationDateMock}
        />,
      );
      expect(templateCard.hasClass('exam-card')).toBe(true);
    });

    test('TemplateCard props', () => {
      const templateCard = mount(
        <TemplateCard
          name={nameMock}
          category={categoryMock}
          creationDate={creationDateMock}
        />,
      );
      const {
        name,
        category,
        creationDate,
      } = templateCard.find('TemplateCard').props();

      expect(name).toBe(nameMock);
      expect(category).toBe(categoryMock);
      expect(creationDate).toBe(creationDateMock);
    });
  });
});
