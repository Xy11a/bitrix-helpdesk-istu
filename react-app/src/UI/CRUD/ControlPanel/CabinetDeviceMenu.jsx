import React from 'react';

const CabinetDeviceMenu = ({cabinet}) => {
    return (
        <div className='border border-black border-opacity-50 rounded-3 px-3 py-2'>
            <h5 className='text-center my-0'>Планировка кабинета: {cabinet.number}</h5>
            <div className="d-flex w-100 justify-content-center align-items-center mt-2">
                <button className="w-75 btn btn-primary" type={"submit"}>Открыть планировку</button>
            </div>
        </div>
    );
};

export default CabinetDeviceMenu;