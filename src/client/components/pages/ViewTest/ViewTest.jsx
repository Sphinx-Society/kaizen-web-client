import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';
import withUserData from '../../hocs/withUserData';
import withAuth from '../../hocs/withAuth';
import ReadableField from '../../atoms/ReadableField/ReadableField';
import ListReadableFields from '../../molecules/ListReadableFields/ListReadableFields';
import { testsHistory, patientTests } from '../../../routes/paths';

import './ViewTest.scss';

const ViewTest = (props) => {
  const { history: { push } } = props;
  const { editingTest, user } = useSelector((state) => state.user);

  const isDoctor = user.role === 'doctor';

  const goToLastView = () => {
    if (isDoctor) {
      push(patientTests());
    } else {
      push(testsHistory());
    }
  };

  if (!editingTest) {
    let path = '';

    if (isDoctor) {
      path = patientTests();
    } else {
      path = testsHistory();
    }

    return (
      <Redirect to={path} />
    );
  }

  return (
    <NavbarProvider>
      <FeedbackProvider>
        <MainViewProvider
          showBackButton={true}
          onBackButtonClick={goToLastView}
          title={editingTest.name}
          showBottomLine
          moveTitle
        >
          <ListReadableFields className='view-test__list'>
            {editingTest.results.map((result) => {
              const {
                value,
                name,
                min,
                max,
                unit,
              } = result;
              let description = value;
              if (unit) {
                description = `${description} ${unit}`;
              }
              if (min) {
                description = `${description} (Límites - ${min} / ${max})`;
              }
              return (
                <ReadableField
                  key={JSON.stringify(result)}
                  title={name}
                  description={description}
                />
              );
            })}
          </ListReadableFields>
        </MainViewProvider>
      </FeedbackProvider>
    </NavbarProvider>
  );
};

ViewTest.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withUserData(withAuth(ViewTest));
