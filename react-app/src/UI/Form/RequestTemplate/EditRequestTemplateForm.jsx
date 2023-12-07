import React, {useState} from 'react';
import RequestTemplateService from "../../../API/RequestTemplateService";
let requestTypes = ["Программное обеспечение", "Учетная деятельность", "Техническое обслуживание", "Подключение к системе"]
let canCreate = false

const EditRequestTemplateForm = ({list, selection, setSelection , read}) => {

    const [template, setTemplate] = useState(selection);
    const [successMes, setSuccessMes] = useState(false)

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


    const submitForm = (e) => {
      e.preventDefault();

      setSuccessMes(true);
      RequestTemplateService.addRequestTemplate(template).then(
          ()=> {
              setTimeout(()=> {
                  read();
                  setSuccessMes(false);
                  setSelection("");
              },2500)
          }
      )

    }

    return (
        <div className={'border border-black border-opacity-50 rounded-3 px-2 py-2'}>
            <form className='' onSubmit={(e => submitForm(e))}>
                <h6 className={'text-center'}>Редактировать заявку: "{selection.name}"</h6>
                <label>Название заявки</label>
                <input type='text' value={template.name === "" ? "" : template.name} className='form-control'
                       placeholder="Название заявки"
                       onChange={(e) => setTemplate({...template, name: e.target.value})} required={true}/>
                {checkName(list, template)}
                <label>Тип заявки</label>
                <select className='form-select' value={template.type}
                        onChange={(e) => setTemplate({...template, type: e.target.value})}>
                    {requestTypes.map((reqType, i) => {
                        return <option key={i} value={reqType}>{reqType}</option>
                    })}
                </select>
                <button type={"submit"} className={"btn btn-primary w-100 mt-1"} disabled={!checkNameBool()}>Редактировать шаблон</button>

                {
                    successMes ?
                        <div className={'bg-success text-white p-2 d-flex justify-content-center rounded-3 mt-2'}>Шаблон
                            успешно обновлен</div> : ''
                }
            </form>
        </div>
    );
};

export default EditRequestTemplateForm;