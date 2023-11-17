import React, {useState,useEffect} from 'react';
import Block from "../Block/Block";
import Request from "./Request";
import CreateInput from "./CreateInput";


const CreateRequestTemplate = ({template,updateRequestTemplate}) => {

    const [options, setOptions] = useState(template.options);
    const [createInputType, setCreateInputType] = useState("text");

    useEffect(() => {
        setOptions(template.options)
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
                        <input className="form-check-input" type="checkbox" role="switch" checked={options.cabinets} onChange={(e => setOptions({...options, cabinets: !options.cabinets}))} />
                        <label className="form-check-label" >Привязка кабинетов к заявке?</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" checked={options.note} onChange={(e => setOptions({...options, note: !options.note}))} />
                        <label className="form-check-label" >Добавить примечание?</label>
                    </div>
                </div>
            </div>
        )
    }



    return (
        <div>
            <div className='d-flex align-items-stretch justify-content-between'>
                <Block className='w-75 border border-dark bg-white rounded-3 overflow-x-hidden'>
                    <Request template={template}/>
                </Block>
                <Block className='w-25 border border-dark bg-white rounded-3 overflow-x-hidden'>
                    <div className='d-flex flex-column'>
                        <div className='d-flex justify-content-center border-bottom border-opacity-50 '><h2>Панель полей ввода</h2></div>
                        <RequestOption/>
                        <CreateInputsButtons/>
                    </div>
                </Block>
            </div>
        </div>
    );
};

export default CreateRequestTemplate;



