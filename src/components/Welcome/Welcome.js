import React from 'react';

import './styles.css';

import { useNavigate } from 'react-router-dom';
import Footer from '../../layout/Footer/Footer';

import juntosplus from '../../assets/images/juntosplus.png';
import toby from '../../assets/images/toby-bg.svg';

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="welcome-page">
      <div className="welcome-page-body">
        <img className="edit-logo" alt="logo" src={juntosplus} />
        <div className="welcome-page-content">
          <img className="toby" alt="toby" src={toby} />
          <p className="welcome-page-title">Generador de Selfies</p>
          <p className="welcome-page-subtitle">¡Bienvenido! Genera tu selfie con Toby</p>
          <button type="button" className="welcome-page-button" onClick={() => navigate('/upload')}>Iniciar</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Welcome;
