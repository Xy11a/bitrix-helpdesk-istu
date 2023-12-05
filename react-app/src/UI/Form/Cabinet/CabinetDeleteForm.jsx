import React, {useState} from 'react';
import CabinetService from "../../../API/CabinetService";

const CabinetDeleteForm = ({selection,deleteFunction, setSelection}) => {
    const [message, setMessage] = useState(false)

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            deleteFunction(selection)
            CabinetService.deleteCabinet({number: selection.number, cabinetLink: selection.cabinetLink}).then(
                ()=> {
                    setMessage(true)
                    setTimeout(() => {
                        setMessage(false);
                        setSelection("")
                    }, 3000)
                }
            )




        }} className='border border-black border-opacity-50 rounded-3 px-2 py-2'>
            <div>
                <h5 className='text-center p-1 rounded-3'>
                     <div className='bg-danger text-white rounded-3'>Внимание!</div>
                     <div>Вы точно хотите удалить кабинет {selection.number}?</div>
                </h5>
            </div>

            <div className="d-flex w-100 justify-content-center align-items-center mt-2">
                <button className="w-100 btn btn-danger" type={"submit"} disabled={message}>Удалить</button>
            </div>
            {message ? <div className='bg-warning text-white w-100 mt-2 p-2 d-flex justify-content-center rounded-3'>Кабинет был удален</div> : ""}
        </form>
    );
};

export default CabinetDeleteForm;