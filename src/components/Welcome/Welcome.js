import React from 'react';

import './styles.css';

import { useNavigate } from 'react-router-dom';
import Footer from '../../layout/Footer/Footer';
import Language from './Language';

import juntosplus from '../../assets/images/juntosplus.png';
import toby from '../../assets/images/toby-bg.svg';

function Welcome({ language }) {
  const navigate = useNavigate();
  return (
    <div className="welcome-page">
      <Language changeTo={language === 'pt' ? 'es' : 'pt'} />
      <div className="welcome-page-body">
        <img className="edit-logo" alt="logo" src={juntosplus} />
        <div className="welcome-page-content">
          <img className="toby" alt="toby" src={toby} />
          <p className="welcome-page-title">{language === 'pt' ? 'Gerador de Selfies' : 'Generador de Selfies'}</p>
          <p className="welcome-page-subtitle">{language === 'pt' ? 'Bem-vindo! Gere sua selfie com Toby' : '¡Bienvenido! Genera tu selfie con Toby'}</p>
          <button type="button" className="welcome-page-button" onClick={() => navigate(`/${language || 'es'}/upload`)}>Iniciar</button>
        </div>
      </div>
      <Footer language={language} />
    </div>
  );
}

export default Welcome;
