import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  FaEye as EyeIcon,
  FaPen as PenIcon,
  FaTrashAlt as TrashIcon,
} from 'react-icons/fa';
import { IoMdAdd as AddIcon } from 'react-icons/io';
import Table from '../../organisms/Table/Table';
import TemplateCard from '../../organisms/TemplateCard/TemplateCard';
import Button from '../../atoms/Button/Button';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';

import { getStringFromDate } from '../../../utils/date';

import { templateEditor } from '../../../routes/paths';

const TemplatesManagement = (props) => {
  const { history } = props;
  const { templates } = useSelector((state) => state.templates);
  const { isLoading } = useSelector((state) => state.feedback);

  const goToTemplateCreator = () => history.push(templateEditor());

  return (
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
                    icon={<PenIcon />}
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
          totalRows={templates.length}
          page={0}
          mobileRow={(row) => <TemplateCard {...row} />}
        />
      </MainViewProvider>
    </NavbarProvider>
  );
};

TemplatesManagement.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default TemplatesManagement;
