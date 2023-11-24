import React, {useState,useEffect} from 'react';
import Block from "../Block/Block";
import Request from "./Request";
import CreateInput from "./CreateInput";
import RequestTemplateService from "../../API/RequestTemplateService";
import DeleteInput from "./DeleteInput";
import ToolBar from "../CRUD/ControlPanel/ToolBar";
import Icon from "../Icon/Icon";


const CreateRequestTemplate = ({template, setSelection, updateRequestTemplate,read}) => {

    const [createInputType, setCreateInputType] = useState("text");
    const [panel,setPanel] = useState("create")

    const updateOptions = (newOptions) => {
        template.options = newOptions
        updateRequestTemplate(template.id,template)
    }

    const submitTemplate = async () => {
      RequestTemplateService.addRequestTemplate(template).then(()=> {read(); setSelection(null)})
    }


    useEffect(() => {

    }, [template])


    const CreateInputsButtons = () => {
        return (
            <div className='border border-black border-opacity-50 mx-2 rounded-3'>
                <h3 className='text-center px-2 mb-0'>Добавить поле ввода</h3>
                <div className='d-flex justify-content-between flex-wrap px-2 pb-2 border-bottom border-black border-opacity-50'>
                    <button className='btn btn-primary mt-2 px-1' onClick={()=> setCreateInputType('text')}>Текст</button>
                    <button className='btn btn-primary mt-2 px-1' onClick={()=> setCreateInputType('date')}>Дата</button>
                    <button className='btn btn-primary mt-2 px-1' onClick={()=> setCreateInputType('number')}>Число</button>
                    <button className='btn btn-primary mt-2 px-1' onClick={()=> setCreateInputType('checkbox')}>Флаг</button>
                    <button className='btn btn-primary mt-2 px-1' onClick={()=> setCreateInputType('select')}>Выбор</button>
                </div>
                <div className='border border-black border-opacity-50 rounded-3 p-2 mx-2 my-1'>
                    <CreateInput type={createInputType} template={template} updateTemplate={updateRequestTemplate} />
                </div>
            </div>
        )
    }

    const RequestOption = () => {
        return (
            <div className='border border-black border-opacity-50 p-2 m-2 rounded-3'>
                <h3 className='text-center'>Опции заявки</h3>
                <div className='d-flex justify-content-between flex-wrap'>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" checked={template.options.cabinets} onChange={(e => updateOptions({...template.options, cabinets: !template.options.cabinets}))} />
                        <label className="form-check-label" >Привязка кабинетов к заявке?</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" checked={template.options.note} onChange={(e => updateOptions({...template.options, note: !template.options.note}))} />
                        <label className="form-check-label" >Добавить примечание?</label>
                    </div>
                </div>
            </div>
        )
    }

    const InputsPanel = () => {
      switch (panel) {
          case "create":
              return <CreateInputsButtons/>
          case "option":
              return <RequestOption/>
          case "delete":
              return <DeleteInput template={template} updateTemplate={updateRequestTemplate}/>
      }
    }


    return (
        <div>
            <div className='d-flex align-items-stretch justify-content-between'>
                <Block className='w-75 border border-dark bg-white rounded-3 overflow-x-hidden'>
                    <Request template={template} isTest={true}/>
                    <div className='px-2 pb-2'><button className='btn btn-primary w-100' onClick={()=>{
                        submitTemplate();
                    }}>Сохранить шаблон</button></div>
                </Block>
                <Block className='w-25 border border-dark bg-white rounded-3 overflow-x-hidden'>
                    <div className='d-flex flex-column'>
                        <div className='d-flex justify-content-center border-bottom border-opacity-50 '><h2>Панель полей ввода</h2></div>

                        <div className='px-2'>
                            <ToolBar>
                                <button className="btn btn-primary my-1" onClick={() => {setPanel("create")}}>
                                    <Icon width={24} height={24} src={"./files/create.svg"}/>
                                </button>
                                <button className="btn btn-primary my-1" onClick={() => {setPanel("option")}}>
                                    <Icon width={24} height={24} src={"./files/gear.svg"}/>
                                </button>
                                <button className="btn btn-primary my-1" onClick={() => {setPanel("delete")}}>
                                    <Icon width={24} height={24} src={"./files/delete.svg"}/>
                                </button>
                            </ToolBar>
                        </div>

                        <InputsPanel/>


                    </div>
                </Block>
            </div>
        </div>
    );
};

export default CreateRequestTemplate;



