import React from 'react';

import './styles.css';

import Footer from '../../layout/Footer/Footer';

import { useNavigate } from 'react-router-dom';

function Welcome() {
    const navigate = useNavigate();
    return(
        <div className="welcome-page">
            <div className="welcome-page-body">
                <p className="welcome-page-logo">Juntos+</p>
                <div className="welcome-page-content">
                    <p className="welcome-page-title">Gerador de Selfies</p>
                    <p className="welcome-page-subtitle">Bem-vindo! Gere sua selfie com o Toby</p>
                    <button className="welcome-page-buton" onClick={() => navigate('/upload')}>Iniciar</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Welcome;