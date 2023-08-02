import React from 'react';

import './styles.css';

import Footer from '../../layout/Footer/Footer';

import { useNavigate } from 'react-router-dom';

function Share({ image }) {
    const navigate = useNavigate();
    return(
        <div className="share-page">
            <div className="share-page-body">
                <p className="share-page-logo">Juntos+</p>
                <div className="share-page-content">
                    <button>Compartilhar</button>
                    <button onClick={() => navigate('/upload')}>Tirar outra</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Share;