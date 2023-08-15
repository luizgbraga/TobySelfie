/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Language({ changeTo }) {
  const navigate = useNavigate();
  return (
    <div className="language-container" onClick={() => navigate(`/${changeTo}`)}>
      <p>{changeTo === 'pt' ? 'Mudar para português' : 'Cambiar para español'}</p>
    </div>
  );
}

export default Language;
