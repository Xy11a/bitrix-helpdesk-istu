import React from 'react';

const Block = ({children, ...props}) => {
    return (
        <div className="my-1 border border-dark bg-white rounded-3" {...props}>
            {children}
        </div>
    );
};

export default Block;