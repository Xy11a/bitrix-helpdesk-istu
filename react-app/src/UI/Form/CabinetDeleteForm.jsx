import React from 'react';
import CabinetService from "../../API/CabinetService";

const CabinetDeleteForm = ({selection,deleteFunction}) => {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            deleteFunction(selection)
            CabinetService.deleteCabinet({number: selection.number, cabinetLink: selection.cabinetLink})




        }} className='border border-black border-opacity-50 rounded-3 px-2 py-2'>
            <div>
                <h5 className='text-center p-1 rounded-3'>
                    <span className='bg-danger text-white'>Внимание!</span>Вы точно хотите удалить кабинет {selection.number}?
                </h5>
            </div>

            <div className="d-flex w-100 justify-content-center align-items-center mt-2">
                <button className="w-75 btn btn-danger" type={"submit"}>Удалить</button>
            </div>
        </form>
    );
};

export default CabinetDeleteForm;