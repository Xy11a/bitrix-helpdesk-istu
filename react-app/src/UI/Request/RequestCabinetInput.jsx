import React, {useState} from 'react';
import CabinetService from "../../API/CabinetService";
import CabinetDeviceLayoutSelect from "../CabinetLayout/CabinetDeviceLayoutSelect";


const RequestCabinetInput = ({cabinets,cabinetsNumbers, cabinet,setCabinet, devices,setDevices, isReadOnly}) => {



    return (
        <div className='mt-2'>
            <h3>Выберете кабинет:</h3>
            <select className='form-select w-25' value={cabinet} onChange={(e)=> setCabinet(e.target.value)} >
                {cabinetsNumbers.map((cabinetOption,index)=> {
                    return (
                        <option key={index}>
                            {cabinetOption}
                        </option>
                    )
                })}
            </select>

            <h4>Выберите ИТ-технику:</h4>
            <div>
                <CabinetDeviceLayoutSelect cabinet={cabinets.find((el)=> el.number === cabinet)} devices={devices} setDevices={setDevices} isReadOnly={isReadOnly} />
            </div>
        </div>
    );
};

export default RequestCabinetInput;