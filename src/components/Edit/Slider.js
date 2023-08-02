import React from 'react';
import { Range } from "react-range";

function Slider({ values, setValues }) {
    return(
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
              backgroundColor: '#651C32'
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
              backgroundColor: '#E8E8E8'
            }}
          >
            {children}
          </div>
        )}
      />
    )
}

export default Slider;