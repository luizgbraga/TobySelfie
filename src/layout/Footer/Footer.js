import React from 'react';

import './styles.css';

import facebook from '../../assets/icons/facebook.png';
import instagram from '../../assets/icons/instagram.png';

function Footer() {
    return(
        <div className="footer-container">
            <div className="footer-up">
                <div className="footer-links-container">
                    <p>Política de Privacidade</p>
                    <p>Termos de Uso</p>
                    <p>Gerenciar Preferências</p>
                </div>
                <div className="footer-social-container">
                    <img src={facebook} alt="fb-icon" />
                    <img src={instagram} alt="ig-icon" />
                </div>
            </div>
            <div className="footer-bottom">
                <p>Coca-Cola FEMSA. Todos direitos reservados</p>
            </div>
        </div>
    )
}

export default Footer;