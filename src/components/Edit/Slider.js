/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Range } from 'react-range';

function Slider({ values, setValues }) {
  return (
    <Range
      step={0.1}
      min={0}
      max={100}
      values={values}
      onChange={(vals) => setValues(vals)}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: '16px',
            width: '16px',
            borderRadius: '50%',
            backgroundColor: '#651C32',
          }}
        />
      )}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: '4px',
            width: '100%',
            backgroundColor: 'rgba(218, 41, 28, 0.3)',
          }}
        >
          {children}
        </div>
      )}
    />
  );
}

export default Slider;
