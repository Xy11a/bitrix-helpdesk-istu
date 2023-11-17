import React, {useState} from 'react';


const CreateInput = ({type, template, updateTemplate}) => {
    const [selectOptions, setSelectOptions] = useState([])
    let temp = {
        label: "",
        type: type,
        placeholder: "",
        min: "",
        max: "",
        selectOptions: []
    }
    const [inputTemplate, setInputTemplate] = useState(temp);

    const createAndAddInput = () => {
        template.inputDataProps.push({...inputTemplate,selectOptions: selectOptions})
        updateTemplate(template.id,template)
    }

    const textInput = () => {
        return (
            <div>
                <div>Введите заголовок текстового поля ввода:</div>
                <input className='form-control' value={inputTemplate.label} type={"text"}
                       onChange={(e) => setInputTemplate({...inputTemplate, label: e.target.value})} required={true}/>
                <div>Введите подсказку для текстового поля ввода:</div>
                <input className='form-control' value={inputTemplate.placeholder} type={"text"}
                       onChange={(e) => setInputTemplate({...inputTemplate, placeholder: e.target.value})}/>
                <button className='btn btn-primary w-100 p-2 mt-2' onClick={() => createAndAddInput()}>Создать поле
                    ввода
                </button>
            </div>
        )
    }

    const numberInput = () => {
        return (
            <div>
                <div>Введите заголовок числового поля ввода:</div>
                <input className='form-control' value={inputTemplate.label} type={"text"}
                       onChange={(e) => setInputTemplate({...inputTemplate, label: e.target.value})} required={true}/>
                <div>Введите минимальное допустимое значение (Опционально):</div>
                <input className='form-control' value={inputTemplate.min} type={"number"}
                       onChange={(e) => setInputTemplate({...inputTemplate, min: e.target.value})}/>
                <div>Введите максимально допустимое значение (Опционально):</div>
                <input className='form-control' value={inputTemplate.max} type={"number"}
                       onChange={(e) => setInputTemplate({...inputTemplate, max: e.target.value})}/>
                <button className='btn btn-primary w-100 p-2 mt-2' onClick={() => createAndAddInput()}>Создать поле ввода</button>
            </div>
        )
    }

    const dateInput = () => {
        return (
            <div>
                <div>Введите заголовок поля ввода даты:</div>
                <input className='form-control' value={inputTemplate.label} type={"text"}
                       onChange={(e) => setInputTemplate({...inputTemplate, label: e.target.value})} required={true}/>
                <button className='btn btn-primary w-100 p-2 mt-2' onClick={() => createAndAddInput()}>Создать поле ввода</button>
            </div>
        )
    }

    const checkboxInput = () => {
        return (
            <div>
                <div>Введите заголовок поля ввода флаг:</div>
                <input className='form-control' value={inputTemplate.label} type={"text"}
                       onChange={(e) => setInputTemplate({...inputTemplate, label: e.target.value})} required={true}/>
                <button className='btn btn-primary w-100 p-2 mt-2' onClick={() => createAndAddInput()}>Создать поле ввода</button>
            </div>
        )
    }

    const selectInput = () => {

        function addSelectOption() {
            let selectInputAdd = document.getElementById('select-input-add');
            setSelectOptions([...selectOptions, {value: selectInputAdd.value}])
        }

        function removeSelectOption(value) {
            setSelectOptions([...selectOptions.filter((el) => el.value !== value)])
        }

        return (
            <div>
                <div>Введите заголовок поля ввода выбора:</div>
                <input className='form-control' value={inputTemplate.label} type={"text"}
                       onChange={(e) => setInputTemplate({...inputTemplate, label: e.target.value})} required={true}/>
                <div>Добавить выбор:</div>
                <div className='d-flex justify-content-between'>
                    <input id={'select-input-add'} className='form-control' type={"text"}/>
                    <button className='btn btn-primary' type={"button"} onClick={() => addSelectOption()}><img
                        width={24} height={24} src={'./files/create.svg'}/></button>
                </div>
                <div>
                    {selectOptions.map((el, index) =>
                        <div key={index} className='border border-black mt-1 rounded-3 p-2'>
                            <div>Выбор</div>
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex align-items-center'>{el.value}</div>
                                <div className='btn btn-primary' onClick={() => removeSelectOption(el.value)}>
                                    <img width={24} height={24} src={'./files/delete.svg'}/>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <button className='btn btn-primary w-100 p-2 mt-2' onClick={() => createAndAddInput()}>Создать поле ввода</button>
            </div>
        )
    }


    switch (type) {
        case "text":
            return textInput()
        case "number":
            return numberInput()
        case "date":
            return dateInput()
        case "checkbox":
            return checkboxInput()
        case "select":
            return selectInput()
    }

};


export default CreateInput;