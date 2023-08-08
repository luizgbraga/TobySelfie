/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import { toJpeg } from 'html-to-image';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Slider from './Slider';

import './styles.css';

import Footer from '../../layout/Footer/Footer';

import juntosplus from '../../assets/images/juntosplus.png';
import front from '../../assets/images/front.png';
import back from '../../assets/images/back.png';
import arrow from '../../assets/icons/arrow-right.png';
import loader from '../../assets/icons/loader.svg';

import moveRed from '../../assets/icons/move-red.png';
import moveWhite from '../../assets/icons/move-white.png';
import brushRed from '../../assets/icons/brush-red.png';
import brushWhite from '../../assets/icons/brush-white.png';

import front1 from '../../assets/images/mockups/front1.png';
import front2 from '../../assets/images/mockups/front2.png';
import front3 from '../../assets/images/mockups/front3.png';
import back1 from '../../assets/images/mockups/back1.png';
import back2 from '../../assets/images/mockups/back2.png';
import back3 from '../../assets/images/mockups/back3.png';

function Edit({
  imageFile, croppedImageURL, setCroppedImageURL, loading, setLoading,
}) {
  const navigate = useNavigate();
  const [download, setDownload] = useState(false);
  const [resultUrl, setResultUrl] = useState('');
  const [step, setStep] = useState(1);

  const [selectedBack, setSelectedBack] = useState({ id: 1, front: front1, back: back1 });

  const backgroundOptions = [
    { id: 1, front: front1, back: back1 },
    { id: 2, front: front2, back: back2 },
    { id: 3, front: front3, back: back3 },
  ];

  const exportRef = useRef();
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // API call
  useEffect(() => {
    setLoading(true);
    const formData = new FormData();
    formData.append('sync', '1');
    formData.append('image_file', imageFile);

    axios.post('https://techhk.aoscdn.com/api/tasks/visual/segmentation', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-API-KEY': 'wxx8eihu38em53y9v',
      },
    })
      .then((response) => {
        setCroppedImageURL(response.data.data.image); // URL
        setLoading(false);
      });
  }, [imageFile, setCroppedImageURL, setLoading]);

  const [zoom, setZoom] = useState([50]);
  const [rotate, setRotate] = useState([50]);
  const [addRight, setAddRight] = useState(0);
  const [addTop, setAddTop] = useState(0);

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

  const handleContinue = useCallback(() => {
    toJpeg(exportRef.current, { cacheBust: true })
      .then((dataBase64) => {
        if (isMobile) {
          setDownload(true);
          const file = base64ToFile(dataBase64, 'you-and-toby.jpg', 'image/jpeg');
          const url = URL.createObjectURL(file);
          setResultUrl(url);
        } else {
          const link = document.createElement('a');
          link.href = dataBase64;
          link.download = 'you-and-toby.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      });
  }, [exportRef]);

  if (download) {
    return (
      <div className="edit-page">
        <div className="edit-body">
          <img className="edit-logo-little" alt="logo" src={juntosplus} />
          <div className="edit-content">
            <div>
              <img src={resultUrl} className="your-image-container" alt="result" />
            </div>
          </div>
          <p style={{
            padding: '40px 12vw',
            textAlign: 'center',
            fontSize: '5vw',
          }}
          >
            Clique e segure na imagem para compartilhar ou baixar!
          </p>
          <button type="button" onClick={() => navigate('/')} className="edit-buttons-back">Tirar outra</button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-page">
      <div className="edit-body">
        <img className="edit-logo-little" alt="logo" src={juntosplus} />
        <div className="edit-content">
          {
            loading
              ? <img src={loader} style={{ width: '140px' }} alt="loading" />
              : (
                <div className="edit-your-image-container">
                  <div
                    className="your-image-container"
                    style={{
                      backgroundImage: `url(${selectedBack.back})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      position: 'relative',
                    }}
                  >
                    <div
                      className="your-pic-container"
                      style={{
                        backgroundImage: `url(${croppedImageURL})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transform: `scale(${zoom[0] / 50}) rotate(${(rotate[0] - 50) * 3.6}deg)`,
                        left: '50%',
                        bottom: `calc(20% + ${addTop}px)`,
                        marginLeft: `calc(-35% + ${addRight}px)`,
                        position: 'absolute',
                        zIndex: '2',
                        width: '70%',
                        height: '70%',
                      }}
                    />
                    <img src={selectedBack.front} alt="front" className="front-part" />
                  </div>
                  <div
                    className="your-image-container-download"
                    ref={exportRef}
                    style={{
                      backgroundImage: `url(${selectedBack.back})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      position: 'absolute',
                      left: '0',
                      top: '0',
                      zIndex: '-5',
                    }}
                  >
                    <div
                      className="your-pic-container-download"
                      style={{
                        backgroundImage: `url(${croppedImageURL})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transform: `scale(${zoom[0] / 50}) rotate(${(rotate[0] - 50) * 3.6}deg)`,
                        left: '50%',
                        bottom: `calc(15% + ${addTop}px)`,
                        marginLeft: `calc(-35% + ${addRight}px)`,
                        position: 'absolute',
                        zIndex: '-3',
                        width: '70%',
                        height: '70%',
                      }}
                    />
                    <img src={selectedBack.front} alt="front" className="front-part-download" />
                  </div>
                  <div className="edit-tools-container">
                    {
                      step === 1
                        ? (
                          <div className="edit-tools-steps-container">
                            <div className="edit-tool-step-container-selected">
                              <img src={moveWhite} alt="selected-move-icon" className="step-icon" />
                            </div>
                            <div className="edit-tool-step-container" onClick={() => setStep(2)}>
                              <img src={brushRed} alt="selected-move-icon" className="step-icon" />
                            </div>
                          </div>
                        )
                        : (
                          <div className="edit-tools-steps-container">
                            <div className="edit-tool-step-container" onClick={() => setStep(1)}>
                              <img src={moveRed} alt="selected-move-icon" className="step-icon" />
                            </div>
                            <div className="edit-tool-step-container-selected">
                              <img src={brushWhite} alt="selected-move-icon" className="step-icon" />
                            </div>
                          </div>
                        )
                    }
                    {
                      step === 1
                        ? (
                          <div className="edit-position-container">
                            <p className="edit-tool-title">Reposicione sua selfie</p>
                            <div className="edit-position-buttons-container">
                              <div className="up-and-down">
                                <img src={arrow} alt="arrow-up" className="arrow-up" onClick={() => setAddTop(addTop + 2)} />
                                <img src={arrow} alt="arrow-down" className="arrow-down" onClick={() => setAddTop(addTop - 2)} />
                              </div>
                              <div className="left-and-right">
                                <img src={arrow} alt="arrow-left" className="arrow-left" onClick={() => setAddRight(addRight - 2)} />
                                <img src={arrow} alt="arrow-right" className="arrow-right" onClick={() => setAddRight(addRight + 2)} />
                              </div>
                            </div>
                            <Slider values={zoom} setValues={setZoom} />
                            <div style={{ height: '32px' }} />
                            <Slider values={rotate} setValues={setRotate} />
                          </div>
                        )
                        : (
                          <div className="edit-position-container">
                            <p className="edit-tool-title">Escolha o fundo</p>
                            <div className="edit-background-container">
                              {
                                backgroundOptions.map((option) => (
                                  <div
                                    className="your-image-container-option"
                                    style={{
                                      backgroundImage: `url(${option.back})`,
                                      backgroundSize: 'contain',
                                      backgroundPosition: 'center',
                                      position: 'relative',
                                    }}
                                    onClick={() => {
                                      if (option.id !== selectedBack.id) {
                                        setSelectedBack(option);
                                      }
                                    }}
                                  >
                                    <img src={option.front} alt="front" className="front-part-option" />
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        )
                    }
                    <div className="edit-buttons-container">
                      <button type="button" onClick={() => navigate('/upload')} className="edit-buttons-back">Voltar</button>
                      <button type="button" onClick={handleContinue} className="edit-buttons-continue">
                        {
                          isMobile ? 'Próximo' : 'Baixar'
                        }
                      </button>
                    </div>
                  </div>
                </div>
              )
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Edit;
