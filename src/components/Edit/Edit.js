/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import { toPng } from 'html-to-image';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as htmlToImage from 'html-to-image';

import Slider from './Slider';

import './styles.css';

import Footer from '../../layout/Footer/Footer';

import juntosplus from '../../assets/images/juntosplus.png';
import front from '../../assets/images/front.png';
import back from '../../assets/images/back.png';
import arrow from '../../assets/icons/arrow-right.png';
import loader from '../../assets/icons/loader.svg';

function Edit({
  imageFile, croppedImageURL, setCroppedImageURL, loading, setLoading,
}) {
  const navigate = useNavigate();
  const [download, setDownload] = useState(false);
  const [resultUrl, setResultUrl] = useState('');

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

  const handleContinue = () => {
    htmlToImage.toCanvas(document.getElementById('your-image-download'))
      .then((canvas) => {
        setDownload(true);
        document.body.appendChild(canvas);
      });
  };

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
                      backgroundImage: `url(${back})`,
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
                    <img src={front} alt="front" className="front-part" />
                  </div>
                  <div
                    id="your-image-download"
                    className="your-image-container-download"
                    ref={exportRef}
                    style={{
                      backgroundImage: `url(${back})`,
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
                    <img src={front} alt="front" className="front-part-download" />
                  </div>
                  <div className="edit-tools-container">
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
