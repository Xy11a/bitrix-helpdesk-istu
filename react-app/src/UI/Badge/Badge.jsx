import React from 'react';



const Badge = ({children,badgeContent,badgeColor,translateMiddle}) => {
    return (
        <div className={"d-flex"}>
            <div className='position-relative'>
                <div>{children}</div>
                <div className={createBadgeClassName(badgeColor,translateMiddle)}>{badgeContent}</div>
            </div>

        </div>
    );
};

function createBadgeClassName(color,translate) {
    let badgeClassName = 'position-absolute px-1 badge badge-pill'
    if(color) badgeClassName += " "+color
        else badgeClassName += " bg-primary"
    if(translate) badgeClassName+= " top-0 start-100 translate-middle"
        else badgeClassName += " top-0 end-0"
    return badgeClassName
}

export default Badge;