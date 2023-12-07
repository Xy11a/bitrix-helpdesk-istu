import React, {useState} from 'react';


const CreateInput = ({type, template, updateTemplate}) => {
    const [selectOptions, setSelectOptions] = useState([])
    let temp = {
        label: "",
        type: type,
        placeholder: "",
        min: "",
        max: "",
        selectOptions: [],
        required: false
    }
    const [inputTemplate, setInputTemplate] = useState(temp);
    const [successMes, setSuccessMes] = useState(false)

    const createAndAddInput = (e) => {
        e.preventDefault()
        setSuccessMes(true)

        setTimeout(()=>{
            setSuccessMes(false)
            template.inputDataProps.push({...inputTemplate, selectOptions: selectOptions})
            updateTemplate(template.id, template)
        }, 2500)
    }



    const checkInput = (hasOptions) => {
        if(inputTemplate.label.length === 0) return true;
        if(template.inputDataProps.find((el)=> el.label === inputTemplate.label)) return true;
        if(hasOptions)  return selectOptions.length === 0;
        return false
    }

    const checkInputDuplicatedNames = ()=> {
        if(template.inputDataProps.find((el)=> el.label === inputTemplate.label)) return true;
        else return false
    }

    const textInput = () => {
        return (
            <div>
                <div>Шаблоны вопросов текстогого поля ввода:</div>
                <select className={'form-select'} onChange={(e) => {

                    let arr = [
                        {label: "", placeholder: "", required: false},
                        {label: "Что сломалось?", placeholder: "Монитор", required: true},
                        {label: "Введите причину поломки", placeholder: "Порвался шнур", required: false},
                        {label: "Введите название курса:", placeholder: "Базы данных и анализ СУБД", required: true},
                        {
                            label: "Введите код ошибки, отображаемую на экране:",
                            placeholder: "0x100015fd",
                            required: false
                        }
                    ]


                    setInputTemplate({
                        ...inputTemplate, label: arr[e.target.value].label,
                        placeholder: arr[e.target.value].placeholder, required: arr[e.target.value].required
                    })
                }}>
                    <option value={0}>Ручной ввод</option>
                    <option value={1}>Что сломалось?</option>
                    <option value={2}>Введите причину поломки:</option>
                    <option value={3}>Введите название курса:</option>
                    <option value={4}>Введите код ошибки, отображаемую на экране:</option>
                </select>
                <hr/>

                <form onSubmit={(e) => createAndAddInput(e)}>
                    <div>Введите вопрос пользователю для текстового поля ввода:</div>
                    <input className='form-control' value={inputTemplate.label} type={"text"}
                           onChange={(e) => setInputTemplate({...inputTemplate, label: e.target.value})} required={true}/>
                    {checkInputDuplicatedNames() ? <div className={'bg-warning p-2 rounded-3 d-flex justify-content-center mt-1'}>Поле ввода с таким вопросом уже существует</div> : ""}

                    <div>Введите подсказку для текстового поля ввода:</div>
                    <input className='form-control' value={inputTemplate.placeholder} type={"text"}
                           onChange={(e) => setInputTemplate({...inputTemplate, placeholder: e.target.value})}/>


                    <div className={'d-flex align-items-center'}>
                        <span>Являеться ли данное поле обязательным ?</span>
                        <div className={'form-switch'}>
                            <input className={' form-check-input'} type={'checkbox'} role={'switch'}
                                   checked={inputTemplate.required} onChange={(e) => {
                                setInputTemplate({...inputTemplate, required: e.target.value})
                            }}/>
                        </div>
                    </div>

                    <button className='btn btn-primary w-100 p-2 mt-2' type={"submit"} disabled={checkInput()} >Создать поле ввода</button>
                    {
                        successMes ? <div className={'bg-success text-white p-2 rounded-3 d-flex justify-content-center mt-1'}>Поле успешно добавлено</div> : ""
                    }
                </form>
            </div>
        )
    }

    const numberInput = () => {


        return (
            <div>
                <div>Шаблоны вопросов числового поля ввода:</div>
                <select className={'form-select'} onChange={(e) => {

                    let arr = [
                        {label: "", min: "", max: "", required: false},
                        {label: "Введите приоритет решении проблемы (0-5):", min: "0", max: "5", required: true},
                        {
                            label: "Сколько пользователей пользуется данной ИТ-техникой:",
                            min: "0",
                            max: "",
                            required: false
                        },
                        {label: "Сколько розеток необходимо заменить:", min: "1", max: "", required: true},
                    ]

                    setInputTemplate({
                        ...inputTemplate,
                        label: arr[e.target.value].label,
                        min: arr[e.target.value].min,
                        required: arr[e.target.value].required,
                        max: arr[e.target.value].max
                    })

                }}>
                    <option value={0}>Ручное ввод</option>
                    <option value={1}>Введите приоритет решении проблемы (0-5):</option>
                    <option value={2}>Сколько пользователей пользуется данной ИТ-техникой:</option>
                    <option value={3}>Сколько розеток необходимо заменить:</option>
                </select>
                <hr/>


                <form onSubmit={(e)=> createAndAddInput(e) }>
                    <div>Введите вопрос пользователю для числового поля ввода:</div>
                    <input className='form-control' value={inputTemplate.label} type={"text"}
                           onChange={(e) => setInputTemplate({...inputTemplate, label: e.target.value})} required={true}/>
                    {checkInputDuplicatedNames() ? <div className={'bg-warning p-2 rounded-3 d-flex justify-content-center mt-1'}>Поле ввода с таким вопросом уже существует</div> : ""}

                    <div>Введите минимальное допустимое значение (Опционально):</div>
                    <input className='form-control' value={inputTemplate.min} type={"number"}
                           onChange={(e) => setInputTemplate({...inputTemplate, min: e.target.value})}/>

                    <div>Введите максимально допустимое значение (Опционально):</div>
                    <input className='form-control' value={inputTemplate.max} type={"number"}
                           onChange={(e) => setInputTemplate({...inputTemplate, max: e.target.value})}/>

                    <div className={'d-flex align-items-center'}>
                        <span>Являеться ли данное поле обязательным ?</span>
                        <div className={'form-switch'}>
                            <input className={' form-check-input'} type={'checkbox'} role={'switch'}
                                   checked={inputTemplate.required} onChange={(e) => {
                                setInputTemplate({...inputTemplate, required: e.target.value})
                            }}/>
                        </div>
                    </div>
                    <button className='btn btn-primary w-100 p-2 mt-2' type={"submit"} disabled={checkInput()} >Создать поле ввода</button>
                    {
                        successMes ? <div className={'bg-success text-white p-2 rounded-3 d-flex justify-content-center mt-1'}>Поле успешно добавлено</div> : ""
                    }
                </form>
            </div>
        )
    }

    const dateInput = () => {
        return (
            <div>
                <div>Шаблоны вопросов для поля ввода даты:</div>
                <select className={'form-select'} onChange={(e) => {
                    let arr = [
                        {label: "", required: false},
                        {label: "Когда впервые замечена была неисправность:", required: true},
                        {label: "До кого числа, необходимо устранить проблему:", required: true},
                        {label: "Когда будет удобно провести техническое обслуживание:", required: true},
                    ]

                    setInputTemplate({
                        ...inputTemplate, label: arr[e.target.value].label,
                        required: arr[e.target.value].required,
                    })

                }}>
                    <option value={0}>Ручное ввод</option>
                    <option value={1}>Когда впервые замечена была неисправность:</option>
                    <option value={2}>До кого числа, необходимо устранить проблему:</option>
                    <option value={3}>Когда будет удоно провести техническое обслуживание:</option>
                </select>
                <hr/>

                <form onSubmit={(e)=> createAndAddInput(e)}>
                    <div>Введите вопрос пользователю для поля ввода даты:</div>
                    <input className='form-control' value={inputTemplate.label} type={"text"}
                           onChange={(e) => setInputTemplate({...inputTemplate, label: e.target.value})} required={true}/>
                    {checkInputDuplicatedNames() ? <div className={'bg-warning p-2 rounded-3 d-flex justify-content-center mt-1'}>Поле ввода с таким вопросом уже существует</div> : ""}

                    <div className={'d-flex align-items-center'}>
                        <span>Являеться ли данное поле обязательным ?</span>
                        <div className={'form-switch'}>
                            <input className={' form-check-input'} type={'checkbox'} role={'switch'}
                                   checked={inputTemplate.required} onChange={(e) => {
                                setInputTemplate({...inputTemplate, required: e.target.value})
                            }}/>
                        </div>
                    </div>
                    <button className='btn btn-primary w-100 p-2 mt-2' type={"submit"} disabled={checkInput()} >Создать поле ввода</button>
                    {
                        successMes ? <div className={'bg-success text-white p-2 rounded-3 d-flex justify-content-center mt-1'}>Поле успешно добавлено</div> : ""
                    }
                </form>

            </div>
        )
    }

    const checkboxInput = () => {
        return (
            <div>
                <div>Шаблоны вопросов для поля ввода флаг:</div>
                <select className={'form-select'} onChange={(e) => {
                    let arr = [
                        {label: "", required: false},
                        {label: "Замечали ли вы даннную проблемы ранее:", required: true},
                        {label: "Пробывали ли перезагрузить ИТ-технику:", required: false},
                        {label: "Отключали ли свет до появления проблемы:", required: true},
                    ]

                    setInputTemplate({
                        ...inputTemplate, label: arr[e.target.value].label,
                        required: arr[e.target.value].required,
                    })

                }}>
                    <option value={0}>Ручное ввод</option>
                    <option value={1}>Замечали ли вы даннную проблемы ранее:</option>
                    <option value={2}>Пробывали ли перезагрузить ИТ-технику:</option>
                    <option value={3}>Отключали ли свет до появления проблемы:</option>
                </select>
                <hr/>


                <form onSubmit={(e)=>{createAndAddInput(e)}}>
                    <div>Введите вопрос пользователю для поля ввода флага:</div>
                    <input className='form-control' value={inputTemplate.label} type={"text"}
                           onChange={(e) => setInputTemplate({...inputTemplate, label: e.target.value})} required={true}/>
                    {checkInputDuplicatedNames() ? <div className={'bg-warning p-2 rounded-3 d-flex justify-content-center mt-1'}>Поле ввода с таким вопросом уже существует</div> : ""}

                    <div className={'d-flex align-items-center'}>
                        <span>Являеться ли данное поле обязательным ?</span>
                        <div className={'form-switch'}>
                            <input className={' form-check-input'} type={'checkbox'} role={'switch'}
                                   checked={inputTemplate.required} onChange={(e) => {
                                setInputTemplate({...inputTemplate, required: e.target.value})
                            }}/>
                        </div>
                    </div>
                    <button className='btn btn-primary w-100 p-2 mt-2' type={"submit"} disabled={checkInput()} >Создать поле ввода</button>
                    {
                        successMes ? <div className={'bg-success text-white p-2 rounded-3 d-flex justify-content-center mt-1'}>Поле успешно добавлено</div> : ""
                    }
                </form>

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
                <div>Шаблоны вопросов для поля ввода выбора:</div>
                <select className={'form-select'} onChange={(e) => {
                    let arr = [
                        {label: "", selectOptions: [], required: false},
                        {label: "Выбор списка доступного ПО:", selectOptions:[{value: "AnyDesk"}, {value: "Skype"}, {value: "Photoshop"}], required: true},
                        {label: "Список причин поломок:",selectOptions:[{value: "Не горит монитор"}, {value: "Сломалась кнопка"}, {value: "Открывается программа"}], required: true},
                        {label: "Список сотрудников:", selectOptions:[{value: "Иванов И.И"}, {value: "Петров П.П."}], required: true},
                    ]



                    setInputTemplate({
                        ...inputTemplate, label: arr[e.target.value].label,
                        required: arr[e.target.value].required,
                    })

                    setSelectOptions([...arr[e.target.value].selectOptions])

                }}>
                    <option value={0}>Ручное ввод</option>
                    <option value={1}>Выбор списка доступного ПО:</option>
                    <option value={2}>Список причин поломок:</option>
                    <option value={3}>Список сотрудников:</option>
                </select>
                <hr/>


                <form onSubmit={(e)=> createAndAddInput(e)}>
                    <div>Введите вопрос для поля ввода выбора:</div>
                    <input className='form-control' value={inputTemplate.label} type={"text"}
                           onChange={(e) => setInputTemplate({...inputTemplate, label: e.target.value})} required={true}/>
                    {checkInputDuplicatedNames() ? <div className={'bg-warning p-2 rounded-3 d-flex justify-content-center mt-1'}>Поле ввода с таким вопросом уже существует</div> : ""}

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

                    <div className={'d-flex align-items-center'}>
                        <span>Являеться ли данное поле обязательным ?</span>
                        <div className={'form-switch'}>
                            <input className={' form-check-input'} type={'checkbox'} role={'switch'}
                                   checked={inputTemplate.required} onChange={(e) => {
                                setInputTemplate({...inputTemplate, required: e.target.value})
                            }}/>
                        </div>
                    </div>
                    <button className='btn btn-primary w-100 p-2 mt-2' type={"submit"} disabled={checkInput(true)}>Создать поле ввода</button>
                    {
                        successMes ? <div className={'bg-success text-white p-2 rounded-3 d-flex justify-content-center mt-1'}>Поле успешно добавлено</div> : ""
                    }
                </form>

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