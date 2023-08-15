/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';

import './styles.css';

import { useNavigate } from 'react-router-dom';
import Footer from '../../layout/Footer/Footer';

import camera from '../../assets/icons/camera.png';
import upload from '../../assets/icons/upload.png';
import cam from '../../assets/icons/capture.png';
import back from '../../assets/icons/back.png';

import juntosplus from '../../assets/images/juntosplus.png';

function Upload({
  setImageFile, imageBase64, setImageBase64, language,
}) {
  const [width, setWidth] = useState(window.innerWidth);
  const [next, setNext] = useState(false);
  const [capture, setCapture] = useState(false);
  const navigate = useNavigate();

  const webcamRef = React.useRef(null);

  const handleFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]); // an actual file object
      const reader = new FileReader();
      reader.onload = (event) => setImageBase64(event.target.result); // base 64
      reader.readAsDataURL(e.target.files[0]);
    }
    setNext(true);
  };

  const handleWindowSizeChange = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => window.removeEventListener('resize', handleWindowSizeChange);
  }, []);

  const base64ToFile = (base64String, fileName, mimeType) => {
    const base64Data = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    const binaryData = atob(base64Data);
    const byteArray = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i += 1) {
      byteArray[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: mimeType || 'image/jpeg' });
    return new File([blob], fileName, { type: mimeType || 'image/jpeg' });
  };

  const captureImage = React.useCallback(() => {
    const screenshootBase64 = webcamRef.current.getScreenshot(); // screenshot image in base 64
    setImageBase64(screenshootBase64);
    const file = base64ToFile(screenshootBase64, 'webcam-capture.jpg', 'image/jpeg');
    setImageFile(file);
    setCapture(false);
    setNext(true);
  }, [webcamRef, setImageFile, setImageBase64]);

  return (
    <div className="upload-page">
      <div className="upload-body">
        {
          // logo size
          !capture && !next
            ? <img className="edit-logo" alt="logo" src={juntosplus} />
            : <img className="edit-logo-little" alt="logo" src={juntosplus} />
        }
        {
          // waiting for aproval
          next
            ? (
              <div className="upload-content">
                <div
                  className="uploaded-image-container"
                  style={{
                    backgroundImage: `url(${imageBase64})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="uploaded-buttons">
                  <button type="button" onClick={() => setNext(false)} className="uploaded-buttons-back">{language === 'pt' ? 'Voltar' : 'Regresar'}</button>
                  <button type="button" onClick={() => navigate(`/${language}/edit`)} className="uploaded-buttons-continue">Continuar</button>
                </div>
              </div>
            )
            // not waiting for approval
            : (
              <div className="upload-content">
                {
                  // waiting to capture
                  capture
                    ? (
                      <div className="back-container" role="presentation" onClick={() => setCapture(false)}>
                        <img src={back} className="back-icon" alt="return" />
                      </div>
                    )
                    // not waiting to capture
                    : <p className="upload-title">{language === 'pt' ? 'Tire uma foto ou selecione um arquivo' : 'Toma una foto o sube un archivo'}</p>
                }
                {
                  // waiting to capture
                  capture
                    ? (
                      <div className="webcam-container">
                        <Webcam
                          audio={false}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                        />
                        <div className="webcam-capture-container">
                          <img src={cam} alt="capture" onClick={captureImage} />
                        </div>
                      </div>
                    )
                    // not waiting to capture
                    : (
                      <div className="upload-options-container">
                        {
                          // mobile
                          width <= 768
                            ? (
                              <div className="upload-option-container">
                                <label htmlFor="capture-icon">
                                  <img src={camera} className="upload-icon" alt="camera" />
                                </label>
                                <input accept="image/*" id="capture-icon" type="file" capture="environment" onChange={handleFile} />
                              </div>
                            )
                            : (
                              <div className="upload-option-container">
                                <img src={camera} className="upload-icon" alt="camera" onClick={() => setCapture(true)} />
                              </div>
                            )
                        }
                        <div className="upload-option-container">
                          <label htmlFor="upload-image">
                            <img src={upload} className="upload-icon" alt="upload" />
                          </label>
                        </div>
                        <input type="file" id="upload-image" onChange={handleFile} />
                      </div>
                    )
                  }
              </div>
            )
          }
      </div>
      <Footer language={language} />
    </div>
  );
}

export default Upload;
