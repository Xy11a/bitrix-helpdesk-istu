import React, {useState} from 'react';
import CabinetService from "../../API/CabinetService";

let cabinetsJson = await CabinetService.getAllCabinets()

const RequestCabinetInput = () => {

    const [cabinet, setCabinet] = useState(cabinetsJson[0])
        //TODO узнать почему ломаються объекты

    return (
        <div className='mt-2'>
            <select className='form-select' onChange={(e)=> setCabinet(e.target.value)} >
                {cabinetsJson.map((cabinetOption,index)=> {
                    console.log(cabinetOption)
                    return (
                        <option key={index} value={cabinetOption}>
                            Кабинет: {cabinetOption.number} -- Количество устройств: {cabinetOption.deviceCount}
                        </option>
                    )
                })}
            </select>


            <div>{cabinet.number}</div>
        </div>
    );
};

export default RequestCabinetInput;