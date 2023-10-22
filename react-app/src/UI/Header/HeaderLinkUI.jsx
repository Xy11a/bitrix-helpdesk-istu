import React from 'react';

const HeaderLinkUI = ({page,className,pageLink,setPage, children}) => {
    return (
        <div className={className} onClick={()=>{setPage(pageLink)}}>
            {page === pageLink ?  <b>{children}</b>: <>{children}</>}
        </div>
    );
};

export default HeaderLinkUI;