import React from 'react';
import Background from '../../../assets/images/fondo.png';
import Vector1 from '../../../assets/images/Vector1.png';
import Vector2 from '../../../assets/images/Vector2.png';
import DoctorVector from '../../../assets/images/doctor-vector.png';

import './ShapesContainer.scss';

const ShapesContainer = () => {
  return (
    <div data-test='shapes-container' className='shapes-container'>
      <img className='login-shape login-shape--background' src={Background} alt='shape-background' />
      <img className='login-shape login-shape--vector1' src={Vector1} alt='vectorform' />
      <img className='login-shape login-shape--vector2' src={Vector2} alt='vectorform' />
      <img className='login-shape login-shape--vector3' src={Vector1} alt='vectorform' />
      <div className='login-banner-container'>
        <h1>
          Gestor de examenes
          <br />
          de Laboratorio
        </h1>
        <img className='login-doctor-vector' src={DoctorVector} alt='DoctorVector' />
      </div>

    </div>
  );
};
export default ShapesContainer;
