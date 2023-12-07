import React, {useState} from 'react';
import RequestCabinetInput from "./RequestCabinetInput";
import RequestService from "../../API/RequestService";
import deleteInput from "./DeleteInput";
import CabinetService from "../../API/CabinetService";

let customInputTypeList = []

let cabinetsJson = await CabinetService.getAllCabinets()
let getCabinetsNumbers = () => {
    let arr = []
    cabinetsJson.forEach((el)=> arr.push(el.number))
    return arr
}
let cabinets = getCabinetsNumbers();

const Request = ({template,setTemplate, isReadOnly, isTest, updateTemplate, data}) => {

    const [message, setMessage] = useState(false)
    const [usedDevicesList,setUsedDevicesList] = useState(isReadOnly ? data.deviceData.devices : [])
    const [cabinet, setCabinet] = useState(isReadOnly ? data.deviceData.cabinet : cabinets[0])

    const submitRequest = (e) => {
        e.preventDefault();
        let customInputs = []
        let inputs = [...e.target]
        let note = inputs.find((el)=> el.name==="textarea")
        inputs.pop();
        for (let i = 4; i < inputs.length; i++) {
            if(inputs[i].name === "customInputEnd") break;
            if(inputs[i].value === '') continue;
            customInputs.push(inputs[i].value)
        }

        let data = {
            userData: {fio: inputs[0].value, number: inputs[1].value, email:inputs[2].value, job:inputs[3].value},
            customInputData: customInputs,
            deviceData: {cabinet: template.options.cabinets ? cabinet : null, devices:usedDevicesList},
            note: note === undefined ? null : note.value
        }



        if (isTest) {
            console.log(data)
           // alert(data)
        } else {
            RequestService.addRequest({
                id: null,
                templateId: template.id,
                data: data,
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

    const deleteInputFromInputs = (label) => {
        template.inputDataProps = template.inputDataProps.filter((el) => el.label !== label)
        updateTemplate(template.id,template)
    }


    return (
        <div className='p-2'>
            <div className='d-flex justify-content-center'><h2>{template.name}</h2></div>
            <form className='border border-black border-opacity-50 p-2 rounded-3'
                  onSubmit={(e) => submitRequest(e, isTest)}>
                <h2>Заполните форму:</h2>
                <ContactsInputs/>
                <CustomInputs inputDataProps={template.inputDataProps} isTest={isTest} deleteInput={deleteInputFromInputs} isReadOnly={isReadOnly} data={data ? data.customInputData : null}/>
                <input type={"hidden"} name={'customInputEnd'}/>
                {template.options.note ? <AddNote isReadOnly={isReadOnly} value={data ? data.note : null}/> : ""}
                {template.options.cabinets ? <RequestCabinetInput
                    cabinets={cabinetsJson}
                    cabinetsNumbers={cabinets}
                    devices={usedDevicesList}
                    setDevices={setUsedDevicesList}
                    isReadOnly={isReadOnly}
                    cabinet={cabinet}
                    setCabinet={setCabinet}
                /> : ""}
                {
                    isReadOnly ? "" :
                        <button className='btn btn-primary w-100 mt-2'>
                            {isTest ? "Протестировать форму" : "Отправить заявку"}
                        </button>
                }
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

const AddNote = ({isReadOnly,value}) => {
    return (
        <div>
            <div>Примечание(500 символов):</div>
            {isReadOnly ? <textarea className='w-100' style={{height: "200px"}} name={'textarea'} defaultValue={value} readOnly={true} maxLength={500}/> :
                <textarea className='w-100' style={{height: "200px"}} name={'textarea'}  maxLength={500}/>}

        </div>
    )
}

const CustomInputs = ({inputDataProps, isTest, deleteInput, isReadOnly, data}) => {

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
                                           placeholder={inputElement.placeholder} readOnly={isReadOnly} defaultValue={isReadOnly ? data[index] : ""} required={inputElement.required}/>
                                    {
                                        isTest ? <button className={'btn btn-danger text-white d-flex justify-content-center align-items-center'}
                                         onClick={()=> {deleteInput(inputElement.label)} } type={"button"}>
                                            <img src={'./files/delete.svg'} width={24} height={24}/>
                                        </button> : ""
                                    }
                                </div>
                            )
                        case "number":
                            return (
                                <div key={index} className='d-flex mt-1 align-items-center'>
                                    <div key={"label" + index}>{inputElement.label}</div>
                                    <input key={"input" + index} className='form-control' type={inputElement.type}
                                           name={inputElement.type + countType(inputElement.type)}
                                           min={inputElement.min} max={inputElement.max}  readOnly={isReadOnly} defaultValue={isReadOnly ? data[index] : ""} required={inputElement.required}/>
                                    {
                                        isTest ? <button className={'btn btn-danger text-white d-flex justify-content-center align-items-center'}
                                                         onClick={()=> {deleteInput(inputElement.label)} } type={"button"}>
                                            <img src={'./files/delete.svg'} width={24} height={24}/>
                                        </button> : ""
                                    }
                                </div>
                            )
                        case "date":
                            return (
                                <div key={index} className='d-flex mt-1 align-items-center'>
                                    <div key={"label" + index}>{inputElement.label}</div>
                                    <input key={"input" + index} className='form-control w-25' type={inputElement.type}
                                           name={inputElement.type + countType(inputElement.type)}  readOnly={isReadOnly} defaultValue={isReadOnly ? data[index] : ""} required={inputElement.required}/>
                                    {
                                        isTest ? <button className={'btn btn-danger text-white d-flex justify-content-center align-items-center'}
                                                         onClick={()=> {deleteInput(inputElement.label)} } type={"button"}>
                                            <img src={'./files/delete.svg'} width={24} height={24}/>
                                        </button> : ""
                                    }
                                </div>
                            )
                        case "checkbox":
                            return (
                                <div className='form-check form-switch mt-1' key={index}>
                                    <input key={"input" + index} className='form-check-input' role='switch'
                                           type={inputElement.type}
                                           name={inputElement.type + countType(inputElement.type)}  readOnly={isReadOnly} defaultValue={isReadOnly ? data[index] : ""} required={inputElement.required}/>
                                    <label key={"label" + index}>{inputElement.label}</label>
                                    {
                                        isTest ? <button className={'btn btn-danger text-white d-flex justify-content-center align-items-center'}
                                                         onClick={()=> {deleteInput(inputElement.label)} } type={"button"}>
                                            <img src={'./files/delete.svg'} width={24} height={24}/>
                                        </button> : ""
                                    }
                                </div>
                            )
                        case "select":
                            return (
                                <div key={index} className='d-flex mt-1 align-items-center'>
                                    <div key={"label" + index}>{inputElement.label}</div>
                                    <select key={"select" + index} className='form-select'
                                            name={inputElement.type + countType(inputElement.type)} defaultValue={isReadOnly ? data[index] : ""} required={inputElement.required}>
                                        {
                                            inputElement.selectOptions.map((optionElement, oIndex) =>
                                                <option key={"select" + index + ":option" + oIndex}
                                                        value={"select" + index + ":option" + oIndex}>
                                                    {optionElement.value}
                                                </option>
                                            )
                                        }
                                    </select>
                                    {
                                        isTest ? <button className={'btn btn-danger text-white d-flex justify-content-center align-items-center'}
                                                         onClick={()=> {deleteInput(inputElement.label)} } type={"button"}>
                                            <img src={'./files/delete.svg'} width={24} height={24}/>
                                        </button> : ""
                                    }
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