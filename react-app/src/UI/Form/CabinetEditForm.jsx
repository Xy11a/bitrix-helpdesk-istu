import React, {useState} from 'react';

const CabinetEditForm = ({cabinet, updateCabinet }) => {

    const [cabinetNumber,setCabinetNumber] = useState(cabinet.number);
    const [cabinetLink, setCabinetLink] = useState(null)

    return (
        <form onSubmit={(e)=> {submitForm()}} className='border border-black border-opacity-50 rounded-3 px-3 py-2'>
            <h5 className='text-center my-0'>Редактировать кабинет</h5>
            <label>Кабинет:</label>
            <input className=" w-100 rounded-3" type={"text"} name={"cabinet"} value={cabinetNumber} onChange={(e) => setCabinetNumber(e.target.value)}/>

            <label>План SVG:</label>
            <input className='form-control' type={"file"} name={"plan"} onChange={(e) => setCabinetLink(e.target.value)} placeholder="Загрузите SVG"/>

            <input type={"hidden"} name={"id"}/>
            <div className="d-flex w-100 justify-content-center align-items-center mt-2">
                <button className="w-75 btn btn-primary" type={"submit"}>Редактировать</button>
            </div>
        </form>
    );
};

function submitForm(e, cabinet){}

export default CabinetEditForm;