import React, { useState } from 'react';

import './styles.css';

import Footer from '../../layout/Footer/Footer';

import camera from '../../assets/icons/camera.png';
import upload from '../../assets/icons/upload.png';

import { useNavigate } from 'react-router-dom';

function Upload({ image, setImage, imagePreview, setImagePreview }) {
    const [next, setNext] = useState(false);
    const navigate = useNavigate();

    const handleFile = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            let reader = new FileReader();
            reader.onload = (e) => {
              setImagePreview(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
          }
        setNext(true);
    }
    return(
        <div className="upload-page">
            <div className="upload-body">
                <p className="upload-logo">Juntos+ Gerador de Selfies</p>
                {
                    next ?
                    <div className="upload-content">
                        <div className="uploaded-image-container">
                            <img src={imagePreview} alt="preview" />
                        </div>
                        <button onClick={() => navigate('/edit')}>Continuar</button>
                        <button onClick={() => setNext(false)}>Voltar</button>
                    </div>
                    :
                    <div className="upload-content">
                        <p className="upload-title">Tire uma foto ou faça o upload</p>
                        <div className="upload-options-container">
                            <label htmlFor="upload-image">
                                <img src={camera} className="upload-icon" alt="camera" />
                            </label>
                            <input accept='image/*' id='capture-icon' type='file' capture='environment' onChange={handleFile} />
                            <label htmlFor="upload-image">
                                <img src={upload} className="upload-icon" alt="upload" />
                            </label>
                            <input type="file" id="upload-image" onChange={handleFile} />
                        </div>
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}

export default Upload;