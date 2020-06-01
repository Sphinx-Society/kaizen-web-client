import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TemplateCard from '../TemplateCard';

configure({ adapter: new Adapter() });

const nameMock = 'Blood test';
const categoryMock = 'Laboratory';
const creationDateMock = '1234568512';

function componentRender(onViewMock, onDeleteMock) {
  return mount(
    <TemplateCard
      name={nameMock}
      category={categoryMock}
      creationDate={creationDateMock}
      onView={onViewMock || (() => null)}
      onDelete={onDeleteMock || (() => null)}
    />,
  );
}

describe('TemplateCard', () => {
  describe('Default props', () => {
    test('Should have a class ".template-card"', () => {
      const templateCard = componentRender();
      expect(templateCard.find('Surface').hasClass('template-card')).toBe(true);
    });

    test('TemplateCard props name, category and creationDate', () => {
      const {
        name,
        category,
        creationDate,
      } = componentRender().find('TemplateCard').props();

      expect(name).toBe(nameMock);
      expect(category).toBe(categoryMock);
      expect(creationDate).toBe(creationDateMock);
    });
  });
});
