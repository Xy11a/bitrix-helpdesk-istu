import React, {useState} from 'react';
import RequestTemplate from "../../../API/RequestTemplate";

let canCreate = true;
let requestTemplate = {
    name: "",
    type: "Программное обеспечение",
    id: null,
    options: {cabinets: false, note: false},
    inputDataProps: [],
    data: []
}

let requestTypes = ["Программное обеспечение","Учетная деятельность","Техническое обслуживание","Подключение к системе / создание УЗ"]

const CreateRequestTemplateForm = ({list,read}) => {

    const [template, setTemplate] = useState(requestTemplate);

    const submitForm = async (e) => {
        e.preventDefault()
        if(canCreate) {
            RequestTemplate.addRequestTemplate(template).then((res)=> read())
        }

    }




    return (
        <form className='border border-black border-opacity-50 rounded-3 px-2 py-2' onSubmit={(e => submitForm(e))}>
            <h5>Создать шаблон заявки</h5>
            <label>Название заявки</label>
            <input type='text' value={template.name === "" ? "" : template.name} className='form-control'
                   placeholder="Название заявки"
                   onChange={(e) => setTemplate({...template, name: e.target.value})} required={true}/>
            <label>Тип заявки</label>
            <select className='form-select' value={template.type} onChange={(e) => setTemplate({...template, type: e.target.value})}>
                {requestTypes.map((reqType,i)=> {
                   return  <option key={i} value={reqType}>{reqType}</option>
                })}
            </select>
            {checkName(list,template)}
            <button type={"submit"} className={"btn btn-primary w-100 mt-1"}>Создать</button>
        </form>
    );
};


function checkName(list,template) {
    if(template.name === "") return ""

    if(list.find((el) => el.name === template.name && el.type === template.type) !== undefined){
        canCreate = false
        return <div className='bg-warning w-100 p-2 mt-2 rounded-3'>Уже существует такой шаблон</div>
    } else
    {
        canCreate = true
        return ""
    }
}

export default CreateRequestTemplateForm;