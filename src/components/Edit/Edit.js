import React, { useEffect, useState, useRef } from 'react'; // import useEffect
import axios from 'axios';

import PulseLoader from "react-spinners/PulseLoader";
import Slider from './Slider';

import './styles.css';

import Footer from '../../layout/Footer/Footer';

import { useNavigate } from 'react-router-dom';

import juntosplus from '../../assets/images/juntosplus.png';
import front from '../../assets/images/front.png';
import back from '../../assets/images/back.png';
import arrow from '../../assets/icons/arrow-right.png';

function Edit({ image, croppedImage, setCroppedImage, loading, setLoading }) {
  const navigate = useNavigate();

  const exportRef = useRef();

  useEffect(() => {
    setLoading(true);
    const formData = new FormData();
    formData.append('sync', '1');
    formData.append('image_file', image);

    axios.post('https://techhk.aoscdn.com/api/tasks/visual/segmentation', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-API-KEY': 'wxx8eihu38em53y9v'
      }
    })
    .then(response => {
      setCroppedImage(response.data.data.image);
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
    });
  }, [image]);

  const [zoom, setZoom] = useState([50]);
  const [rotate, setRotate] = useState([50]);
  const [addRight, setAddRight] = useState(0);
  const [addTop, setAddTop] = useState(0);

  const handleContinue = () => {
    navigate('/share');
  }

  return(
    <div className="edit-page">
      <div className="edit-body">
        <img className="edit-logo" alt="logo" src={juntosplus} />
        <div className="edit-content">
          {
            loading ?
            <PulseLoader
              color={'#651C32'}
              loading={loading}
              size={32}
              speedMultiplier={0.5}
            />
            :
            <div className="edit-your-image-container">
              <div className="your-image-container" style={{
                backgroundImage: `url(${back})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div className="your-pic-container" ref={exportRef} style={{
                  backgroundImage: `url(${croppedImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: `scale(${zoom[0]/50}) rotate(${(rotate[0] - 50) * 3.6}deg)`,
                  left: '50%',
                  bottom: `calc(15% + ${addTop}px)`,
                  marginLeft: `calc(-35% + ${addRight}px)`,
                  position: 'absolute',
                  zIndex: '2',
                  width: '70%',
                  height: '70%'
                }} />
                <img src={front} alt="front" className="front-part" />
              </div>
              <div className="edit-tools-container">
                <div className="edit-position-container">
                  <p className="edit-tool-title">Reposicione sua selfie</p>
                  <div className="edit-position-buttons-container">
                    <div className="up-and-down">
                      <img src={arrow} alt='arrow-up' className="arrow-up" onClick={() => setAddTop(addTop + 2)} />
                      <img src={arrow} alt='arrow-down' className="arrow-down" onClick={() => setAddTop(addTop - 2)} />
                    </div>
                    <div className="left-and-right">
                      <img src={arrow} alt='arrow-left' className="arrow-left" onClick={() => setAddRight(addRight - 2)} />
                      <img src={arrow} alt='arrow-right' className="arrow-right" onClick={() => setAddRight(addRight + 2)} />
                    </div>
                  </div>
                  <Slider values={zoom} setValues={setZoom} />
                  <div style={{ height: '32px' }} />
                  <Slider values={rotate} setValues={setRotate} />
                </div>
                <div className="edit-buttons-container">
                  <button onClick={() => navigate('/upload')} className="edit-buttons-back">Voltar</button>
                  <button onClick={handleContinue} className="edit-buttons-continue">Continuar</button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Edit;
