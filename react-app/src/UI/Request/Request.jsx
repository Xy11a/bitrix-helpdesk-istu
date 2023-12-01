import React, {useState} from 'react';
import RequestCabinetInput from "./RequestCabinetInput";
import RequestService from "../../API/RequestService";

let customInputTypeList = []

const Request = ({template,setTemplate, isReadOnly, isTest}) => {

    const [message, setMessage] = useState(false)

    const submitRequest = (e) => {
        e.preventDefault();
        let dataObj = []
        let inputs = [...e.target]
        inputs.pop()

        inputs.forEach((dataElem) => {
            dataObj.push(dataElem.value)
        })

        if (isTest) {
            alert(dataObj)
        } else {
            RequestService.addRequest({
                id: null,
                templateId: template.id,
                data: dataObj,
                createDate: new Date().toLocaleDateString('en-CA'),
                status: "Новая"
            }).then(()=>{
                setMessage(true)
                setTimeout(()=>{
                    setMessage(false);
                    setTemplate(null);
                }, 3000)
            })
        }
    }


    return (
        <div className='p-2'>
            <div className='d-flex justify-content-center'><h2>{template.type}-{template.name}</h2></div>
            <form className='border border-black border-opacity-50 p-2 rounded-3'
                  onSubmit={(e) => submitRequest(e, isTest)}>
                <h2>Заполните форму:</h2>
                <ContactsInputs/>
                <CustomInputs inputDataProps={template.inputDataProps}/>
                {template.options.note ? <AddNote/> : ""}
                {template.options.cabinets ? <RequestCabinetInput/> : ""}
                <button className='btn btn-primary w-100 mt-2'>
                    {isTest ? "Протестировать форму" : "Отправить заявку"}
                </button>
                {message ? <div className='bg-success text-white w-100 mt-2 p-2 d-flex justify-content-center rounded-3'>Заявка успешно отправлена</div> : ""}
            </form>
        </div>
    );
};


const ContactsInputs = () => {
    return (
        <div>
            <div className='d-flex mt-1 align-items-center'>
                <label>ФИО заявителя:</label>
                <input className='form-control w-25' type={"text"} name={'fio'} defaultValue={"Иванов И.И."}
                       readOnly={true}/>
            </div>
            <div className='d-flex mt-1 align-items-center'>
                <label>Номер заявителя:</label>
                <input className='form-control w-25' type={'tel'} name={'telephone'} defaultValue={"+79225777483"}
                       readOnly={true}/>
            </div>
            <div className='d-flex mt-1 align-items-center'>
                <label>Email заявителя:</label>
                <input className='form-control w-25' type={"text"} name={'mail'} defaultValue={"Ivan.durak@mail.ru"}
                       readOnly={true}/>
            </div>
            <div className='d-flex mt-1 align-items-center'>
                <label>Должность заявителя:</label>
                <input className='form-control w-25' type={"text"} name={'job'} defaultValue={"Сотрудник ИТ-отдела"}
                       readOnly={true}/>
            </div>
        </div>
    )
}

const AddNote = () => {
    return (
        <div>
            <div>Примечание(500 символов):</div>
            <textarea className='w-100' style={{height: "200px"}} maxLength={500}/>
        </div>
    )
}

const CustomInputs = ({inputDataProps}) => {
    return (
        <div>
            {
                inputDataProps === null ? "" : inputDataProps.map((inputElement, index) => {
                    customInputTypeList.push(inputElement.type)

                    switch (inputElement.type) {

                        case "text":
                            return (
                                <div key={index} className='d-flex mt-1 align-items-center' >
                                    <div key={"label" + index}>{inputElement.label}</div>
                                    <input key={"input" + index} className='form-control' type={inputElement.type}
                                           name={inputElement.type + countType(inputElement.type)}
                                           placeholder={inputElement.placeholder} required={true}/>
                                </div>
                            )
                        case "number":
                            return (
                                <div key={index} className='d-flex mt-1 align-items-center'>
                                    <div key={"label" + index}>{inputElement.label}</div>
                                    <input key={"input" + index} className='form-control' type={inputElement.type}
                                           name={inputElement.type + countType(inputElement.type)}
                                           min={inputElement.min} max={inputElement.max} required={true}/>
                                </div>
                            )
                        case "date":
                            return (
                                <div key={index} className='d-flex mt-1 align-items-center'>
                                    <div key={"label" + index}>{inputElement.label}</div>
                                    <input key={"input" + index} className='form-control w-25' type={inputElement.type}
                                           name={inputElement.type + countType(inputElement.type)} required={true}/>
                                </div>
                            )
                        case "checkbox":
                            return (
                                <div className='form-check form-switch mt-1' key={index}>
                                    <input key={"input" + index} className='form-check-input' role='switch'
                                           type={inputElement.type}
                                           name={inputElement.type + countType(inputElement.type)} required={true}/>
                                    <label key={"label" + index}>{inputElement.label}</label>
                                </div>
                            )
                        case "select":
                            return (
                                <div key={index} className='d-flex mt-1 align-items-center'>
                                    <div key={"label" + index}>{inputElement.label}</div>
                                    <select key={"select" + index} className='form-select'
                                            name={inputElement.type + countType(inputElement.type)} required={true}>
                                        {
                                            inputElement.selectOptions.map((optionElement, oIndex) =>
                                                <option key={"select" + index + ":option" + oIndex}
                                                        value={"select" + index + ":option" + oIndex}>
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
    return customInputTypeList.filter((el) => el === type).length
}

export default Request;