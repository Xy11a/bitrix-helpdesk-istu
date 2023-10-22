import React from 'react';
import cl from './ModalFrame.module.css'

const ModalFrame = ({children, visible, setVisible}) => {

    const rootClasses = [cl.modalFrame];
    if (visible) {
        rootClasses.push(cl.active)
    }

    return (
        <div className={rootClasses.join(" ")} onClick={()=> setVisible(false)} >
            <div className={cl.modalFrameContent} onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ModalFrame;