import reducer, { initialState } from './templates.reducer';
import {
  setTemplates,
  setIsAddingField,
  setEditingField,
  setIsEditingTemplate,
  setEditingTemplate,
} from './templates.actions';

const templatesMock = { templates: ['templates', 'bruce'] };
const editingFieldMock = { editingField: { name: 'test' } };
const editingTemplateMock = { editingTemplate: { name: 'test' } };

describe('Templates Reducer', () => {
  test('Should return default state', () => {
    const newState = reducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  test('TEMPLATES/SET_TEMPLATES', () => {
    const newState = reducer(initialState, setTemplates(templatesMock));
    expect(newState.templates.includes('templates')).toBe(true);
  });

  test('TEMPLATES/SET_IS_ADDING_FIELD', () => {
    const newState = reducer(initialState, setIsAddingField({ isAddingField: true }));
    expect(newState.isAddingField).toEqual(true);
  });

  test('TEMPLATES/SET_EDITING_FIELD', () => {
    const newState = reducer(initialState, setEditingField(editingFieldMock));
    expect(newState.editingField.name).toEqual('test');
  });

  test('TEMPLATES/SET_EDITING_TEMPLATE', () => {
    const newState = reducer(initialState, setEditingTemplate(editingTemplateMock));
    expect(newState.editingTemplate.name).toEqual('test');
  });
});
