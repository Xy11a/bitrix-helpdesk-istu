import React, {useState} from 'react';
import Icon from "../../Icon/Icon";
import ToolBar from "./ToolBar";
import CabinetEditForm from "../../Form/CabinetEditForm";
import CabinetCreateForm from "../../Form/CabinetCreateForm";
import CabinetDeleteForm from "../../Form/CabinetDeleteForm";
import CabinetDeviceMenu from "./CabinetDeviceMenu";
import {Tooltip} from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'


const ControlPanel = ({cabinet, allCabinets, setCabinetData}) => {

    let style = {filter: "invert(100%) sepia(0%) saturate(25%) hue-rotate(70deg) brightness(108%)"}

    const [panel, setPanel] = useState('empty');

    return (
        <div className='p-2'>
            <ToolBar>
                <button data-tooltip-id="tooltip-device" data-tooltip-content="Планировка кабинета" data-tooltip-place="top" className="btn btn-primary my-1" onClick={() => {setPanel("device")}}>
                    <Tooltip id='tooltip-device'/>
                    <Icon style={style} width={24} height={24} src={"./files/devices.svg"}/>
                </button>
                <button data-tooltip-id="tooltip-create" data-tooltip-content="Добавить новый кабинет" data-tooltip-place="top" className="btn btn-primary my-1" onClick={() => {setPanel("create")}}>
                    <Tooltip id='tooltip-create'/>
                    <Icon style={style} width={24} height={24} src={"./files/create.svg"}/>
                </button>
                <button data-tooltip-id="tooltip-edit" data-tooltip-content="Редактировать кабинет" data-tooltip-place="top" className="btn btn-primary my-1" onClick={() => {setPanel("edit")}}>
                    <Tooltip id='tooltip-edit'/>
                    <Icon style={style} width={24} height={24} src={"./files/edit.svg"}/>
                </button>
                <button data-tooltip-id="tooltip-delete" data-tooltip-content="Удалить кабинет" data-tooltip-place="top" className="btn btn-primary my-1" onClick={() => {setPanel("delete")}}>
                    <Tooltip id='tooltip-delete'/>
                    <Icon style={style} width={24} height={24} src={"./files/delete.svg"}/>
                </button>
            </ToolBar>

            <div className=' w-100 h-100'>
                {setCurrentPanel(panel, cabinet, allCabinets, setCabinetData)}
            </div>
        </div>
    );
};


function setCurrentPanel(panel, cabinet, allCabinets, setCabinetData) {


    switch (panel) {
        case "device":
            return cabinet !== "" ? <CabinetDeviceMenu cabinet={cabinet}/> : <div>Выберите кабинет</div>
        case "create":
            return <CabinetCreateForm allCabinets={allCabinets}/>
        case "edit":
            return cabinet !== "" ? <CabinetEditForm cabinet={cabinet}/> : <div>Выберите кабинет</div>
        case "delete":
            return cabinet !== "" ?
                <CabinetDeleteForm cabinet={cabinet} allCabinets={allCabinets} setCabinetData={setCabinetData}/> :
                <div>Выберите кабинет</div>
        case "empty":
            return <div>Выберите кабинет</div>
    }


}

export default ControlPanel;