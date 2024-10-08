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
import ReactGA4 from 'react-ga4';

import Slider from './Slider';

import './styles.css';

import plus from '../../assets/icons/plus.png';
import minus from '../../assets/icons/minus.png';
import rotateIcon from '../../assets/icons/rotate.png';

import Footer from '../../layout/Footer/Footer';

import juntosplus from '../../assets/images/juntosplus.png';
import arrow from '../../assets/icons/arrow-right.png';
import loader from '../../assets/icons/loader.svg';

import reset from '../../assets/icons/reset.png';

import moveRed from '../../assets/icons/move-red.png';
import moveWhite from '../../assets/icons/move-white.png';
import brushRed from '../../assets/icons/brush-red.png';
import brushWhite from '../../assets/icons/brush-white.png';

import front1Es from '../../assets/images/mockups/spanish/front1.png';
import front2Es from '../../assets/images/mockups/spanish/front2.png';
import front3Es from '../../assets/images/mockups/spanish/front3.png';
import back1Es from '../../assets/images/mockups/spanish/back1.png';
import back2Es from '../../assets/images/mockups/spanish/back2.png';
import back3Es from '../../assets/images/mockups/spanish/back3.png';

import front1Pt from '../../assets/images/mockups/portuguese/front1.png';
import front2Pt from '../../assets/images/mockups/portuguese/front2.png';
import front3Pt from '../../assets/images/mockups/portuguese/front3.png';
import back1Pt from '../../assets/images/mockups/portuguese/back1.png';
import back2Pt from '../../assets/images/mockups/portuguese/back2.png';
import back3Pt from '../../assets/images/mockups/portuguese/back3.png';

function Edit({
  imageFile, croppedImageURL, setCroppedImageURL, loading, setLoading, language,
}) {
  const navigate = useNavigate();
  const [download, setDownload] = useState(false);
  const [resultUrl, setResultUrl] = useState('');
  const [step, setStep] = useState(1);
  const [err, setErr] = useState('');

  const [selectedBack, setSelectedBack] = useState({
    id: 1,
    front: language === 'pt' ? front1Pt : front1Es,
    back: language === 'pt' ? back1Pt : back1Es,
  });

  const backgroundOptionsSpanish = [
    { id: 1, front: front1Es, back: back1Es },
    { id: 2, front: front2Es, back: back2Es },
    { id: 3, front: front3Es, back: back3Es },
  ];

  const backgroundOptionsPortuguese = [
    { id: 1, front: front1Pt, back: back1Pt },
    { id: 2, front: front2Pt, back: back2Pt },
    { id: 3, front: front3Pt, back: back3Pt },
  ];

  const backgroundOptions = language === 'pt' ? backgroundOptionsPortuguese : backgroundOptionsSpanish;

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
        setErr('');
        if (response.status !== 200) {
          setErr(language === 'pt' ? 'Desculpe, ocorreu um erro' : 'Lo siento, ocurrió un error');
        }
      })
      .catch((error) => {
        setLoading(false);
        setErr(error.message);
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
    ReactGA4.send({
      category: 'user',
      action: 'finish_edit_click',
    });
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
          ReactGA4.send({
            category: 'user',
            action: 'download_click_mobile',
          });
        }
      });
  }, [exportRef]);

  if (err) {
    return (
      <div className="edit-page">
        <div className="edit-body">
          <img className="edit-logo-little" alt="logo" src={juntosplus} />
          <p style={{
            padding: '40px 12vw',
            textAlign: 'center',
            fontSize: '5vw',
          }}
          >
            {err}
          </p>
          <button type="button" onClick={() => navigate('/')} className="edit-buttons-back">
            { language === 'pt' ? 'Tirar outra' : 'Tomar otra' }
          </button>
        </div>
      </div>
    );
  }

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
            {
              language === 'pt'
                ? 'Clique e segure na imagem para baixar e compartilhar!'
                : 'Haz clic y mantén presionado en la imagen para compartir o descargar!'
            }
          </p>
          <button type="button" onClick={() => navigate('/')} className="edit-buttons-back">
            { language === 'pt' ? 'Tirar outra' : 'Tomar otra' }
          </button>
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
                        transform: `scale(${zoom[0] / 50}) rotate(${(rotate[0] - 50) * 3.6}deg) scaleX(-1)`,
                        left: '50%',
                        bottom: `calc(20% + ${addTop}px)`,
                        marginLeft: `calc(-35% + ${addRight}px)`,
                        position: 'absolute',
                        zIndex: '2',
                        width: '70%',
                        height: '60%',
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
                        transform: `scale(${zoom[0] / 50}) rotate(${(rotate[0] - 50) * 3.6}deg) scaleX(-1)`,
                        left: '50%',
                        bottom: `calc(15% + ${addTop * 1.8}px)`,
                        marginLeft: `calc(-35% + ${addRight * 1.5}px)`,
                        position: 'absolute',
                        zIndex: '-3',
                        width: '70%',
                        height: '60%',
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
                            <p className="edit-tool-title">
                              {
                                language === 'pt' ? 'Posicione sua selfie' : 'Posiciona tu selfie'
                              }
                              {' '}
                              <img
                                src={reset}
                                alt="undo"
                                className="reset-button"
                                onClick={() => {
                                  setZoom([50]);
                                  setRotate([50]);
                                  setAddRight(0);
                                  setAddTop(0);
                                }}
                              />
                            </p>
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
                            <img src={plus} className="plus-icon" alt="plus" onClick={() => setZoom([zoom[0] + 1])} />
                            <img src={minus} className="minus-icon" alt="minus" onClick={() => setZoom([zoom[0] - 1])} />
                            <img src={rotateIcon} className="rotate-left-icon" alt="rotate" onClick={() => setRotate([rotate[0] - 1])} />
                            <img src={rotateIcon} className="rotate-right-icon" alt="rotate" onClick={() => setRotate([rotate[0] + 1])} />
                            <Slider values={zoom} setValues={setZoom} />
                            <div style={{ height: '32px' }} />
                            <Slider values={rotate} setValues={setRotate} />
                          </div>
                        )
                        : (
                          <div className="edit-position-container">
                            <p className="edit-tool-title">{language === 'pt' ? 'Escolha o fundo' : 'Elige el fondo'}</p>
                            <div className="edit-background-container">
                              {
                                backgroundOptions.map((option) => (
                                  <div
                                    key={option.id}
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
                      <button type="button" onClick={() => navigate(`/${language}/upload`)} className="edit-buttons-back">{language === 'pt' ? 'Voltar' : 'Regresar'}</button>
                      <button type="button" onClick={handleContinue} className="edit-buttons-continue">
                        {
                          isMobile ? 'Siguiente' : 'Descargar'
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
