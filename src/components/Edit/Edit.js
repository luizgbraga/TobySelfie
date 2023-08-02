import React, { useEffect } from 'react'; // import useEffect
import axios from 'axios';

import './styles.css';

import Footer from '../../layout/Footer/Footer';

import { useNavigate } from 'react-router-dom';

function Edit({ image, croppedImage, setCroppedImage, loading, setLoading }) {
  const navigate = useNavigate();

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
      console.log(response);
      console.log(response.data);
      console.log(response.data.data.image);
      setCroppedImage(response.data.data.image);
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
    });
  }, [image]);

  return(
    <div className="edit-page">
      <div className="edit-page-body">
        <p className="edit-page-logo">Juntos+</p>
        <div className="edit-page-content">
          {
            loading ?
            <p>Carregando...</p>
            :
            <img src={croppedImage} alt="cropped" />
          }
          <button onClick={() => navigate('/share')}>Continuar</button>
          <button onClick={() => navigate('/upload')}>Voltar</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Edit;
