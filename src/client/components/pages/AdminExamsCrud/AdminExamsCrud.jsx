import React from 'react';
import { useSelector } from 'react-redux';
import { IoMdAdd as AddIcon } from 'react-icons/io';
import Table from '../../organisms/Table/Table';
import ExamCard from '../../organisms/ExamCard/ExamCard';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import Button from '../../atoms/Button/Button';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';

const AdminExamsCrud = () => {
  const { exams } = useSelector((state) => state.exams);
  const { isLoading } = useSelector((state) => state.feedback);

  return (
    <MainViewProvider
      title='Examen 1'
      showBottomLine
      moveTitle
      menu={<button>Buton</button>}
    >
      <Table
        isLoading={isLoading}
        columns={[
          {
            header: (col) => <Checkbox />,
            accessor: '',
            cell: (row) => <Checkbox />,
            id: 0,
            width: '30px',
            collapse: true,
          },
          {
            header: 'Name',
            accessor: 'name',
            id: 1,
          },
          {
            header: 'Categoría',
            accessor: 'category',
            id: 2,
          },
          {
            header: 'Fecha de creación',
            accessor: 'creationDate',
            id: 3,
          },
        ]}
        rows={exams}
        totalRows={exams.length}
        page={0}
        menu={<Button icon={<AddIcon />}>Nuevo examen</Button>}
        mobileRow={(row) => <ExamCard {...row} />}
      />
    </MainViewProvider>
  );
};

export default AdminExamsCrud;
