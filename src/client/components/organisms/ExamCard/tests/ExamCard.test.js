import React from 'react';
import { configure, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ExamCard from '../ExamCard';

configure({ adapter: new Adapter() });

describe('ExamCard', () => {
  describe('Default Classes', () => {
    const nameMock = 'Blood test';
    const categoryMock = 'Laboratory';
    const creationDateMock = 1234568512;

    test('Should have a class ".exam-card"', () => {
      const examCard = render(
        <ExamCard
          name={nameMock}
          category={categoryMock}
          creationDate={creationDateMock}
        />,
      );
      expect(examCard.hasClass('exam-card')).toBe(true);
    });

    test('ExamCard props', () => {
      const examCard = mount(
        <ExamCard
          name={nameMock}
          category={categoryMock}
          creationDate={creationDateMock}
        />,
      );
      const {
        name,
        category,
        creationDate,
      } = examCard.find('ExamCard').props();

      expect(name).toBe(nameMock);
      expect(category).toBe(categoryMock);
      expect(creationDate).toBe(creationDateMock);
    });
  });
});
