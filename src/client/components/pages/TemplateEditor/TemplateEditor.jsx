import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdAdd as AddIcon } from 'react-icons/io';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';
import TemplateForm from '../../organisms/TemplateForm/TemplateForm';
import Button from '../../atoms/Button/Button';
import { setIsAddingField, setEditingTemplate } from '../../../redux/templates/templates.actions';
import { createTemplate, editTemplate } from '../../../redux/templates/templates.actions.requests';

import { templatesManagement } from '../../../routes/paths';

const TemplateEditor = (props) => {
  const { history: { push } } = props;
  const dispatch = useDispatch();

  const goToManagerView = () => {
    dispatch(setEditingTemplate({ editingTemplate: null }));
    push(templatesManagement());
  };

  const { editingTemplate } = useSelector((state) => state.templates);

  const addField = () => dispatch(setIsAddingField({ isAddingField: true }));

  const handleCreateTemplate = (template) => {
    dispatch(createTemplate(template))
      .then(() => {
        push(templatesManagement());
      });
  };

  const handleEditTemplate = (template) => {
    dispatch(editTemplate(template))
      .then(() => {
        goToManagerView();
      });
  };

  const handleOnSubmit = (template) => {
    if (editingTemplate) {
      handleEditTemplate(template);
    } else {
      handleCreateTemplate(template);
    }
  };

  return (
    <FeedbackProvider>
      <NavbarProvider>
        <MainViewProvider
          showBackButton
          title={editingTemplate ? editingTemplate.name : 'Crear plantilla'}
          showBottomLine
          onBackButtonClick={goToManagerView}
          menu={<Button onClick={addField} icon={<AddIcon />}>Nuevo campo</Button>}
        >
          <TemplateForm
            onSubmit={handleOnSubmit}
            submitButtonLabel={editingTemplate ? 'Guardar' : 'Crear'}
          />
        </MainViewProvider>
      </NavbarProvider>
    </FeedbackProvider>
  );
};

TemplateEditor.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default TemplateEditor;
