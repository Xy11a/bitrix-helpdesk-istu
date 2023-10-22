import React from 'react';

const ToolBar = ({children}) => {
    return (
        <div className='d-flex justify-content-between align-items-center flex-wrap'>
            {children}
        </div>
    );
};

export default ToolBar;