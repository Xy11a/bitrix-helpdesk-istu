import React, {useState} from 'react';
import CanvasDeviceLayout from "./CanvasDeviceLayout";
import CanvasCabinetLayout from "./CanvasCabinetLayout";
import Block from "../Block/Block";


const CabinetLayout = ({selectedCabinet, updateCabinets}) => {

    const [planMode, setPlanMode] = useState("device-layout")

    return ( selectedCabinet ?
        <div>
            <Block>
                <div className="p-2">
                    <h2 className="text-center">Планировка кабинета {selectedCabinet.number}</h2>

                    <label>Выберите редактор</label>
                    <select  className="form-select bg-primary bg-opacity-25" onChange={(e)=> {setPlanMode(e.target.value)}}>
                        <option value={"device-layout"}>Редактор ИТ-техники в кабинете</option>
                        <option value={"cabinet-layout"}>Редактор планировки кабинета</option>
                    </select>
                </div>
            </Block>

            {createCanvas(planMode,selectedCabinet,updateCabinets)}

        </div> : <Block><h2 className="text-center">Выберите кабинет</h2></Block>
    );
};

function createCanvas(planMode, selectedCabinet,updateCabinets) {
    switch (planMode){
        case "device-layout":
            return <CanvasDeviceLayout cabinet={selectedCabinet} updateCabinets={updateCabinets} />
        case "cabinet-layout":
            return <CanvasCabinetLayout cabinet={selectedCabinet} updateCabinets={updateCabinets}/>
    }



}

export default CabinetLayout;