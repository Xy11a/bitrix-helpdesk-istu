import React, {useState} from 'react';
import CabinetService from "../../API/CabinetService";

let cabinetsJson = await CabinetService.getAllCabinets()
let getCabinetsNumbers = () => {
    let arr = []
    cabinetsJson.forEach((el)=> arr.push(el.number))
    return arr
}
let cabinets = getCabinetsNumbers()
const RequestCabinetInput = () => {

    const [cabinet, setCabinet] = useState(cabinets[0])
        //TODO узнать почему ломаються объекты

    return (
        <div className='mt-2'>
            <select className='form-select' value={cabinet} onChange={(e)=> setCabinet(e.target.value)} >
                {cabinets.map((cabinetOption,index)=> {
                    return (
                        <option key={index}>
                            {cabinetOption}
                        </option>
                    )
                })}
            </select>


            <div>{cabinet}</div>
        </div>
    );
};

export default RequestCabinetInput;