import React, {useState} from 'react';
import RequestTemplateService from "../../../API/RequestTemplateService";

let canCreate = true;
let requestTemplate = {
    name: "",
    type: "Программное обеспечение",
    id: null,
    options: {cabinets: false, note: false},
    inputDataProps: []
}

let requestTypes = ["Программное обеспечение", "Учетная деятельность", "Техническое обслуживание", "Подключение к системе"]

const CreateRequestTemplateForm = ({list, read}) => {

    const [template, setTemplate] = useState(requestTemplate);
    const [successMes, setSuccessMes] = useState(false)


    const submitForm = async (e) => {
        e.preventDefault()
        if (checkNameBool()) {
            setSuccessMes(true)
            RequestTemplateService.addRequestTemplate(template).then((res) => {

                setTimeout(() => {
                    setSuccessMes(false);
                    read();
                    setTemplate(requestTemplate)
                }, 2500)
            })
        }

    }

    const checkName = () => {
        if (template.name === "") {
            return ""
        }

        if (list.find((el) => el.name === template.name && el.type === template.type) !== undefined) {
            return <div className='bg-warning w-100 p-2 mt-2 rounded-3'>Уже существует такой шаблон</div>
        } else {
            return ""
        }
    }

    const checkNameBool = () => {
        if (template.name === "") {
            return false
        }

        if (list.find((el) => el.name === template.name && el.type === template.type) !== undefined) {
            return false
        } else {
            return true
        }
    }


    return (
        <form className='border border-black border-opacity-50 rounded-3 px-2 py-2' onSubmit={(e => submitForm(e))}>
            <h5 className={'text-center'}>Создать шаблон заявки</h5>
            <label>Название заявки</label>
            <input type='text' value={template.name === "" ? "" : template.name} className='form-control'
                   placeholder="Название заявки"
                   onChange={(e) => setTemplate({...template, name: e.target.value})} required={true}/>
            <label>Тип заявки</label>
            <select className='form-select' value={template.type}
                    onChange={(e) => setTemplate({...template, type: e.target.value})}>
                {requestTypes.map((reqType, i) => {
                    return <option key={i} value={reqType}>{reqType}</option>
                })}
            </select>
            {checkName(list, template)}
            <button type={"submit"} className={"btn btn-primary w-100 mt-1"} disabled={!checkNameBool()}>Создать</button>

            {
                successMes ?
                    <div className={'bg-success text-white p-2 d-flex justify-content-center rounded-3 mt-2'}>Шаблон
                        успешно создан</div> : ''
            }
        </form>
    );
};




export default CreateRequestTemplateForm;