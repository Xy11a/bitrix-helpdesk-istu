import React from 'react';

const Icon = ({width,height,src, style}) => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <img style={style} width={width} height={height} src={src} ></img>
        </div>
    );
};

export default Icon;