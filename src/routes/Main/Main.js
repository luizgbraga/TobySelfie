import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ReactGA4 from 'react-ga4';
import Welcome from '../../components/Welcome/Welcome';
import Upload from '../../components/Upload/Upload';
import Edit from '../../components/Edit/Edit';

function Main() {
  const { step, language } = useParams();

  useEffect(() => {
    ReactGA4.send({
      hitType: 'pageview',
      page: window.location.pathname,
    });
  }, []);

  const [imageFile, setImageFile] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [croppedImageURL, setCroppedImageURL] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!step) {
    return <Welcome language={language} />;
  }

  if (step === 'upload') {
    return (
      <Upload
        setImageFile={setImageFile}
        imageBase64={imageBase64}
        setImageBase64={setImageBase64}
        language={language}
      />
    );
  }
  if (step === 'edit') {
    return (
      <Edit
        imageFile={imageFile}
        croppedImageURL={croppedImageURL}
        setCroppedImageURL={setCroppedImageURL}
        loading={loading}
        setLoading={setLoading}
        language={language}
      />
    );
  }
  return (
    <div />
  );
}

export default Main;
