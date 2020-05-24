import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import TemplateForm from '../../organisms/TemplateForm/TemplateForm';
import Button from '../../atoms/Button/Button';
import { setIsAddingField, setTemplates } from '../../../redux/templates/templates.actions';

const ExamCreator = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const goToManagerView = () => history.push('/templates-management');

  const templates = useSelector((state) => state.templates.templates);

  const addField = () => dispatch(setIsAddingField({ isAddingField: true }));

  const addTemplate = (template) => dispatch(setTemplates({ templates: [...templates, template] }));

  return (
    <NavbarProvider>
      <MainViewProvider
        showBackButton
        title='Crear examen'
        showBottomLine
        onBackButtonClick={goToManagerView}
        menu={(
          <>
            <Button className='--spaced'>Eliminar</Button>
            <Button className='--spaced'>Editar</Button>
          </>
        )}
      >
        <TemplateForm
          onSubmit={addTemplate}
        />
      </MainViewProvider>
    </NavbarProvider>
  );
};

ExamCreator.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExamCreator;
