import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import './styles.css';

import Welcome from '../../components/Welcome/Welcome';
import Upload from '../../components/Upload/Upload';
import Edit from '../../components/Edit/Edit';
import Share from '../../components/Share/Share';

function Main() {
    const { step } = useParams();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);
    if (!step) {
        return <Welcome />
    }
    if (step === 'upload') {
        return <Upload image={image} setImage={setImage} imagePreview={imagePreview} setImagePreview={setImagePreview} />
    }
    if (step === 'edit') {
        return <Edit image={image} croppedImage={croppedImage} setCroppedImage={setCroppedImage} loading={loading} setLoading={setLoading} />
    }
    if (step === 'share') {
        return <Share image={image} />
    }
    return(
        <div />
    )
}

export default Main;