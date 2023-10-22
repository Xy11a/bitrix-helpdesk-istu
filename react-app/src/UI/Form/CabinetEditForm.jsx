import React from 'react';

const CabinetEditForm = ({cabinet}) => {
    return (
        <form className='border border-black border-opacity-50 rounded-3 px-3 py-2'>
            <h5 className='text-center my-0'>Редактировать кабинет</h5>
            <label>Кабинет:</label>
            <input className=" w-100 rounded-3" type={"text"} name={"cabinet"} value={cabinet.number}/>

            <label>План SVG:</label>
            <input className='form-control' type={"file"} name={"plan"} placeholder="Загрузите SVG"/>

            <input type={"hidden"} name={"id"}/>
            <div className="d-flex w-100 justify-content-center align-items-center mt-2">
                <button className="w-75 btn btn-primary" type={"submit"}>Редактировать</button>
            </div>
        </form>
    );
};

export default CabinetEditForm;