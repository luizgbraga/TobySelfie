/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import './styles.css';

import facebook from '../../assets/icons/facebook.png';
import instagram from '../../assets/icons/instagram.png';

function Footer({ language }) {
  return (
    <div className="footer-container">
      <div className="footer-up">
        <div className="footer-links-container">
          <p>Coca-Cola FEMSA</p>
        </div>
        <div className="footer-social-container">
          <img src={facebook} alt="fb-icon" onClick={() => window.open('https://www.facebook.com/cocacolafemsamexico/', '_blank').focus()} />
          <img src={instagram} alt="ig-icon" onClick={() => window.open('https://www.instagram.com/cocacolafemsa_mx/', '_blank').focus()} />
        </div>
      </div>
      <div className="footer-bottom">
        {
          language === 'pt'
            ? <p>Coca-Cola FEMSA. Todos os direitos reservados.</p>
            : <p>Coca-Cola FEMSA. Todos los derechos reservados.</p>
        }
      </div>
    </div>
  );
}

export default Footer;
