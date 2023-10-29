import React from 'react';
import Block from "../Block/Block";
import CRUD from "../CRUD/CRUD";

const CreateRequestTemplate = ({template}) => {
    return (
        <div>
            <Block>
                <h3 className='text-center'>Опции заявки</h3>
                <div className='d-flex justify-content-between flex-wrap'>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" checked={template.options.cabinets} />
                        <label className="form-check-label" >Привязка кабинетов к заявке?</label>
                    </div>
                    <div className="form-check form-switch">
                        {template.options.cabinets
                            ? <input className="form-check-input" type="checkbox" role="switch" checked={template.options.interactiveCabinets} />
                            : <input className="form-check-input" type="checkbox" role="switch" checked={false} disabled={true} /> }
                        <label className="form-check-label" >Включить интерактивные кабинеты</label>
                    </div>
                </div>
            </Block>
            {/*<CRUD/>*/}
        </div>
    );
};

export default CreateRequestTemplate;