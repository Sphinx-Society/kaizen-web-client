import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdAdd as AddIcon } from 'react-icons/io';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import TemplateForm from '../../organisms/TemplateForm/TemplateForm';
import Button from '../../atoms/Button/Button';
import { setIsAddingField, setTemplates } from '../../../redux/templates/templates.actions';

import { templatesManagement } from '../../../routes/paths';

const TemplateEditor = (props) => {
  const { history: { push } } = props;
  const dispatch = useDispatch();

  const goToManagerView = () => push(templatesManagement());

  const { templates, editingTemplate } = useSelector((state) => state.templates);

  const addField = () => dispatch(setIsAddingField({ isAddingField: true }));

  const addTemplate = (template) => {
    dispatch(setTemplates({ templates: [...templates, template] }));
    push(templatesManagement());
  };

  return (
    <NavbarProvider>
      <MainViewProvider
        showBackButton
        title={editingTemplate ? editingTemplate.name : 'Crear plantilla'}
        showBottomLine
        onBackButtonClick={goToManagerView}
        menu={<Button onClick={addField} icon={<AddIcon />}>Nuevo campo</Button>}
      >
        <TemplateForm
          onSubmit={addTemplate}
        />
      </MainViewProvider>
    </NavbarProvider>
  );
};

TemplateEditor.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default TemplateEditor;
