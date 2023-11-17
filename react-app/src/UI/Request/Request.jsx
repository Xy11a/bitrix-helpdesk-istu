import React from 'react';

let customInputTypeList = []

const Request = ({template}) => {
    return (
        <div className='p-2'>
            <div className='d-flex justify-content-center'><h2>{template.type}-{template.name}</h2></div>
            <div className='border border-black border-opacity-50 p-2 rounded-3'>
                <h2>Заполните форму:</h2>
                <ContactsInputs/>
                <CustomInputs inputDataProps={template.inputDataProps}/>
            </div>
        </div>
    );
};


const ContactsInputs = () => {
    return (
        <div>
            <div>
                <div>ФИО заявителя:</div>
                <input className='form-control' type={"text"} name={'fio'} defaultValue={"Иванов И.И."}
                       readOnly={true}/>
            </div>
            <div>
                <div>Номер заявителя:</div>
                <input className='form-control w-25' type={'tel'} name={'telephone'} defaultValue={"+79225777483"}
                       readOnly={true}/>
            </div>
            <div>
                <div>Email заявителя:</div>
                <input className='form-control w-25' type={"text"} name={'mail'} defaultValue={"Ivan.durak@mail.ru"}
                       readOnly={true}/>
            </div>
            <div>
                <div>Должность заявителя:</div>
                <input className='form-control w-25' type={"text"} name={'job'} defaultValue={"Сотрудник ИТ-отдела"}
                       readOnly={true}/>
            </div>
        </div>
    )
}

const CustomInputs = ({inputDataProps}) => {
    return (
        <div>
            {
              inputDataProps === null ? "":   inputDataProps.map((inputElement, index) => {
                    customInputTypeList.push(inputElement.type)

                    switch (inputElement.type) {

                        case "text":
                            return (
                                <div key={index}>
                                    <div key={"label"+index}>{inputElement.label}</div>
                                    <input key={"input"+index} className='form-control' type={inputElement.type} name={inputElement.type+countType(inputElement.type)} placeholder={inputElement.placeholder}/>
                                </div>
                            )
                        case "number":
                            return (
                                <div key={index}>
                                    <div key={"label"+index}>{inputElement.label}</div>
                                    <input key={"input"+index} className='form-control' type={inputElement.type} name={inputElement.type+countType(inputElement.type)} min={inputElement.min} max={inputElement.max}/>
                                </div>
                            )
                        case "date":
                            return (
                                <div key={index}>
                                    <div key={"label"+index}>{inputElement.label}</div>
                                    <input key={"input"+index} className='form-control' type={inputElement.type} name={inputElement.type+countType(inputElement.type)} />
                                </div>
                            )
                        case "checkbox":
                            return (
                                <div className='form-check form-switch mt-1' key={index}>
                                    <input key={"input"+index} className='form-check-input' role='switch' type={inputElement.type} name={inputElement.type+countType(inputElement.type)}/>
                                    <label key={"label"+index}>{inputElement.label}</label>
                                </div>
                            )
                        case "select":
                            return (
                                <div key={index}>
                                    <div key={"label"+index}>{inputElement.label}</div>
                                    <select key={"select"+index} className='form-select' name={inputElement.type+countType(inputElement.type)}>
                                        {
                                            inputElement.selectOptions.map((optionElement,oIndex)=>
                                                <option key={"select"+index+":option"+oIndex} value={"select"+index+":option"+oIndex}>
                                                    {optionElement.value}
                                                </option>
                                            )
                                        }
                                    </select>
                                </div>
                            )


                    }

                })}
        </div>
    )
}

function countType(type) {
   return  customInputTypeList.filter((el)=> el === type).length
}

export default Request;