import React from 'react';

import './styles.css';

import { useNavigate } from 'react-router-dom';
import Footer from '../../layout/Footer/Footer';

import juntosplus from '../../assets/images/juntosplus.png';

function Share() {
  const navigate = useNavigate();
  return (
    <div className="share-page">
      <div className="share-page-body">
        <img className="edit-logo" alt="logo" src={juntosplus} />
        <div className="share-page-content">
          <div className="share-buttons-container">
            <button type="button" className="share-buttons-back" onClick={() => navigate('/upload')}>Tirar outra</button>
            <button type="button" className="share-buttons-continue">Compartilhar</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Share;
