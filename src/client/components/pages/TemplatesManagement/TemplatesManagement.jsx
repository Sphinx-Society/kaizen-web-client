import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaPen as PenIcon,
  FaTrashAlt as TrashIcon,
} from 'react-icons/fa';
import { IoMdAdd as AddIcon } from 'react-icons/io';
import Table from '../../organisms/Table/Table';
import TemplateCard from '../../organisms/TemplateCard/TemplateCard';
import Button from '../../atoms/Button/Button';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';
import ModalProvider from '../../providers/ModalProvider/ModalProvider';
import { listTemplates, deleteTemplate } from '../../../redux/templates/templates.actions.requests';
import { setEditingTemplate } from '../../../redux/templates/templates.actions';

import { templateEditor } from '../../../routes/paths';

const TemplatesManagement = (props) => {
  const { history: { push } } = props;
  const dispatch = useDispatch();
  const {
    templates,
    currentPage,
    totalTemplates,
    totalPages,
  } = useSelector((state) => state.templates);
  const { isLoading } = useSelector((state) => state.feedback);
  const { editingTemplate } = useSelector((state) => state.templates);

  const goToTemplateCreator = () => push(templateEditor());

  useEffect(() => {
    if (!templates.length) {
      dispatch(listTemplates());
    }

    if (editingTemplate) {
      dispatch(setEditingTemplate({ editingTemplate: null }));
    }
  }, []);

  const handleNextPage = () => {
    const page = currentPage + 1;
    if (page <= totalPages) {
      dispatch(listTemplates(page));
    }
  };

  const handlePrevPage = () => {
    const page = currentPage - 1;
    if (page >= 1) {
      dispatch(listTemplates(page));
    }
  };

  const searchForTemplates = (query) => dispatch(listTemplates(1, query));

  const handleEditTemplate = (editingTemplate) => () => {
    dispatch(setEditingTemplate({ editingTemplate }));
    goToTemplateCreator();
  };

  const handleDeleteTemplate = (id) => () => dispatch(deleteTemplate(id));

  return (
    <ModalProvider>
      <FeedbackProvider>
        <NavbarProvider>
          <MainViewProvider
            title='Plantillas'
            showBottomLine
            moveTitle
            menu={<Button onClick={goToTemplateCreator} icon={<AddIcon />}>Nueva plantilla</Button>}
          >
            <Table
              isLoading={isLoading}
              columns={[
                {
                  header: 'Name',
                  accessor: 'name',
                  id: 1,
                },
                {
                  header: 'Categoría',
                  accessor: 'type',
                  id: 2,
                },
                {
                  header: 'Fecha de creación',
                  accessor: 'creationDate',
                  id: 3,
                },
                {
                  header: '',
                  accessor: '',
                  cell: (row) => (
                    <div className='horizontal-flex-container'>
                      <Button
                        className='--shadowed --spaced'
                        type='icon'
                        icon={<PenIcon />}
                        iconMode='1'
                        onClick={handleEditTemplate(row)}
                      />
                      <Button
                        className='--shadowed --spaced'
                        type='icon'
                        icon={<TrashIcon />}
                        iconMode='1'
                        onClick={handleDeleteTemplate(row.id)}
                      />
                    </div>
                  ),
                  id: 4,
                },
              ]}
              rows={templates}
              totalRows={totalTemplates}
              page={currentPage}
              totalPages={totalPages}
              mobileRow={(row) => (
                <TemplateCard
                  {...row}
                  onDelete={handleDeleteTemplate(row.id)}
                  onView={handleEditTemplate(row)}
                />
              )}
              onNextPageClick={handleNextPage}
              onPrevPageClick={handlePrevPage}
              onSearch={searchForTemplates}
            />
          </MainViewProvider>
        </NavbarProvider>
      </FeedbackProvider>
    </ModalProvider>
  );
};

TemplatesManagement.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default TemplatesManagement;
