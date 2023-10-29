import React, {useState} from 'react';
import Icon from "../../Icon/Icon";
import ToolBar from "./ToolBar";
import CabinetEditForm from "../../Form/CabinetEditForm";
import CabinetCreateForm from "../../Form/CabinetCreateForm";
import CabinetDeleteForm from "../../Form/CabinetDeleteForm";
import CabinetDeviceMenu from "./CabinetDeviceMenu";
import {Tooltip} from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'


const ControlPanel = ({CRUDToolBarFunction}) => {

    const [panel, setPanel] = useState('create');

    return (
        <div className='p-2'>
            <ToolBar>
                <button data-tooltip-id="tooltip-create" data-tooltip-content="Добавить новый элемент"
                        data-tooltip-place="top" className="btn btn-primary my-1" onClick={() => {
                    setPanel("create")
                }}>
                    <Tooltip id='tooltip-create'/>
                    <Icon width={24} height={24} src={"./files/create.svg"}/>
                </button>
                <button data-tooltip-id="tooltip-edit" data-tooltip-content="Редактировать элемент"
                        data-tooltip-place="top" className="btn btn-primary my-1" onClick={() => {
                    setPanel("update")
                }}>
                    <Tooltip id='tooltip-edit'/>
                    <Icon width={24} height={24} src={"./files/edit.svg"}/>
                </button>
                <button data-tooltip-id="tooltip-delete" data-tooltip-content="Удалить элемент" data-tooltip-place="top"
                        className="btn btn-primary my-1" onClick={() => {
                    setPanel("delete")
                }}>
                    <Tooltip id='tooltip-delete'/>
                    <Icon width={24} height={24} src={"./files/delete.svg"}/>
                </button>
            </ToolBar>

            <div className=' w-100 h-100'>
                {CRUDToolBarFunction(panel)}
            </div>
        </div>
    );
};


export default ControlPanel;