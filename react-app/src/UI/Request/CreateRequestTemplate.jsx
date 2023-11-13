import React, {useState,useEffect} from 'react';
import Block from "../Block/Block";
import Request from "./Request";


const CreateRequestTemplate = ({template,updateRequestTemplate}) => {

    const [options, setOptions] = useState(template.options);

    useEffect(() => {
        setOptions(template.options)
    }, [template])



    return (
        <div>
            <Block>
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
            </Block>

            <div className='d-flex align-items-stretch justify-content-between'>
                <Block className='w-75 border border-dark bg-white rounded-3 overflow-x-hidden'>
                    <Request template={template}/>
                </Block>
                <Block className='w-25 border border-dark bg-white rounded-3 overflow-x-hidden'>
                    <div className='d-flex flex-column'>
                        <div className='d-flex justify-content-center border-bottom border-opacity-50'><h2>Панель полей ввода</h2></div>
                        <div className='p-2'>
                            <button className='btn btn-primary px-2 w-100'>Поле ввода - Строка/Текст</button>
                            <button className='btn btn-primary mt-2 px-2 w-100'>Поле ввода - Число</button>
                            <button className='btn btn-primary mt-2 px-2 w-100'>Поле ввода - Дата</button>
                            <button className='btn btn-primary mt-2 px-2 w-100'>Поле ввода - Флаг</button>
                            <button className='btn btn-primary mt-2 px-2 w-100'>Поле ввода - Выбор</button>
                        </div>
                    </div>
                </Block>
            </div>


        </div>
    );
};

export default CreateRequestTemplate;