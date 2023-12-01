import React, {useState} from 'react';
import CabinetService from "../../API/CabinetService";
import CabinetDeviceLayoutSelect from "../CabinetLayout/CabinetDeviceLayoutSelect";

let cabinetsJson = await CabinetService.getAllCabinets()
let getCabinetsNumbers = () => {
    let arr = []
    cabinetsJson.forEach((el)=> arr.push(el.number))
    return arr
}
let cabinets = getCabinetsNumbers()
const RequestCabinetInput = () => {

    const [cabinet, setCabinet] = useState(cabinets[0])



    return (
        <div className='mt-2'>
            <h3>Выберете кабинет:</h3>
            <select className='form-select w-25' value={cabinet} onChange={(e)=> setCabinet(e.target.value)} >
                {cabinets.map((cabinetOption,index)=> {
                    return (
                        <option key={index}>
                            {cabinetOption}
                        </option>
                    )
                })}
            </select>

            <h4>Выберите ИТ-технику:</h4>
            <div>
                <CabinetDeviceLayoutSelect cabinet={cabinetsJson.find((el)=> el.number === cabinet)} />
            </div>
        </div>
    );
};

export default RequestCabinetInput;