import React, { useState, useEffect } from 'react';
import Webcam from "react-webcam";

import './styles.css';

import Footer from '../../layout/Footer/Footer';

import camera from '../../assets/icons/camera.png';
import upload from '../../assets/icons/upload.png';
import cam from '../../assets/icons/capture.png';
import back from '../../assets/icons/back.png';

import { useNavigate } from 'react-router-dom';

import juntosplus from '../../assets/images/juntosplus.png';

function Upload({ image, setImage, imagePreview, setImagePreview }) {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [next, setNext] = useState(false);
    const [capture, setCapture] = useState(false);
    const navigate = useNavigate();

    const handleFile = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            console.log(e.target.files[0])
            let reader = new FileReader();
            reader.onload = (e) => {
              setImagePreview(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
          }
        setNext(true);
    }

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    function base64ToFile(base64String, fileName, mimeType) {
        const base64Data = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
        const binaryData = atob(base64Data);

        const byteArray = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          byteArray[i] = binaryData.charCodeAt(i);
        }

        const blob = new Blob([byteArray], { type: mimeType || 'image/jpeg' });
        return new File([blob], fileName, { type: mimeType || 'image/jpeg' });
      }

    const webcamRef = React.useRef(null);
  
    const captureImage = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      const file = base64ToFile(imageSrc, 'myImage.jpg', 'image/jpeg');
      setImagePreview(imageSrc);
      setImage(file);
      setCapture(false);
      setNext(true);
    }, [webcamRef, setImage]);
    
    return(
        <div className="upload-page">
            <div className="upload-body">
                {
                    !capture && !next ?
                    <img className="edit-logo" alt="logo" src={juntosplus} />
                    :
                    <img className="edit-logo-little" alt="logo" src={juntosplus} />
                }
                {
                    next ?
                    <div className="upload-content">
                        <div className="uploaded-image-container" style={{
                            backgroundImage: `url(${imagePreview})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                        </div>
                        <div className="uploaded-buttons">
                            <button onClick={() => setNext(false)} className="uploaded-buttons-back">Voltar</button>
                            <button onClick={() => navigate('/edit')} className="uploaded-buttons-continue">Continuar</button>
                        </div>
                    </div>
                    :
                    <div className="upload-content">
                        {
                            capture ?
                            <div className="back-container" onClick={() => setCapture(false)}>
                                <img src={back} className="back-icon" alt="return" />
                            </div>
                            :
                            <p className="upload-title">Tire uma foto ou faça o upload</p>
                        }
                        {
                            capture ?
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
                            :
                            <div className="upload-options-container">
                                {
                                    width <= 768 ?
                                    <div className="upload-option-container">
                                        <label htmlFor="upload-image">
                                            <img src={camera} className="upload-icon" alt="camera" />
                                        </label>
                                        <input accept='image/*' id='capture-icon' type='file' capture='environment' onChange={handleFile} />
                                    </div>
                                    :
                                    <div className="upload-option-container">
                                        <img src={camera} className="upload-icon" alt="camera" onClick={() => setCapture(true)} />
                                    </div>
                                }
                                <div className="upload-option-container">
                                    <label htmlFor="upload-image">
                                        <img src={upload} className="upload-icon" alt="upload" />
                                    </label>
                                </div>
                                <input type="file" id="upload-image" onChange={handleFile} />
                            </div>
                        }
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}

export default Upload;