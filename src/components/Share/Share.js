import React from 'react';

import './styles.css';

import Footer from '../../layout/Footer/Footer';

import { useNavigate } from 'react-router-dom';

import juntosplus from '../../assets/images/juntosplus.png';

function Share({ image }) {
    const navigate = useNavigate();
    return(
        <div className="share-page">
            <div className="share-page-body">
                <img className="edit-logo" alt="logo" src={juntosplus} />
                <div className="share-page-content">
                    <img src={image} />
                    <button>Compartilhar</button>
                    <button onClick={() => navigate('/upload')}>Tirar outra</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Share;