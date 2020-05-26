import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaEye as EyeIcon,
  FaTrashAlt as TrashIcon,
} from 'react-icons/fa';
import { IoMdAdd as AddIcon } from 'react-icons/io';
import Table from '../../organisms/Table/Table';
import TemplateCard from '../../organisms/TemplateCard/TemplateCard';
import Button from '../../atoms/Button/Button';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';
import { listTemplates } from '../../../redux/templates/templates.actions.requests';

import { getStringFromDate } from '../../../utils/date';
import { templateEditor } from '../../../routes/paths';

const TemplatesManagement = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const {
    templates,
    currentPage,
    totalTemplates,
    totalPages,
  } = useSelector((state) => state.templates);
  const { isLoading } = useSelector((state) => state.feedback);

  const goToTemplateCreator = () => history.push(templateEditor());

  useEffect(() => {
    if (!templates.length) {
      dispatch(listTemplates());
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

  const editTe = () => {};

  return (
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
                cell: (row) => <span>{getStringFromDate(new Date(row.creationDate))}</span>,
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
                      icon={<EyeIcon />}
                      iconMode='1'
                    />
                    <Button
                      className='--shadowed --spaced'
                      type='icon'
                      icon={<TrashIcon />}
                      iconMode='1'
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
            mobileRow={(row) => <TemplateCard {...row} />}
            onNextPageClick={handleNextPage}
            onPrevPageClick={handlePrevPage}
          />
        </MainViewProvider>
      </NavbarProvider>
    </FeedbackProvider>
  );
};

TemplatesManagement.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default TemplatesManagement;
