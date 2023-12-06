import React, {useEffect, useState} from 'react';
import CabinetService from "../../../API/CabinetService";

const CabinetEditForm = ({cabinet, cabinetData, readCabinets, setSelection}) => {


    const [cabName, setCabName] = useState(cabinet.number.slice(1))
    const [corpus, setCorpus] = useState(cabinet.number[0])
    const [fileSVG, setFileSVG] = useState(null)
    const [cabinetLink, setCabinetLink] = useState('')
    const [message, setMessage] = useState(false)

    useEffect(() => {
        setCorpus(cabinet.number[0])
        setCabName(cabinet.number.slice(1))
    }, [cabinet])


    const checkCabinetExist = (val) => {
        if (cabinetData.find((cabinet) => cabinet.number === val) !== undefined) {
            return true
        }
    }

    const regMatch = (val) => {
        return val.match(/^([a-zA-ZА-Яа-я]{1})([0-3]{1})([1-9]{1}|[0]{1}[1-9]{1}|[1-3]{1}[1-9]{1})([a-zA-ZА-Яа-я]{0,2})$/gmi)
    }

    const InputCheck = () => {
        return (
            regMatch(corpus + cabName) ?
                <div
                    className={'bg-success mt-2 text-white w-100 p-2 d-flex justify-content-center rounded-3'}>
                    OK
                </div> :
                <div
                    className={'bg-warning mt-2 text-white w-100 p-2 d-flex justify-content-center rounded-3'}>
                    Неверный формат документа
                </div>

        )
    }


    const checkFile = () => {
        if (fileSVG === null) return "";
        if (!fileSVG.name.includes(".svg")) {
            return <div className="bg-warning my-1 p-2 rounded-3">Неверный формат файла. При создании кабинета будет
                загружен план по умолчанию</div>
        }
        return <div className="bg-success text-white bg-opacity-75 my-1 p-2 rounded-3">ОК</div>;
    }


    const submitNumberForm = (e) => {
        e.preventDefault()
        CabinetService.editCabinet(cabinet.number, corpus + cabName).then(
            () => {
                setMessage(true);
                setTimeout(() => {
                    setMessage(false)
                    readCabinets()
                    setSelection('')
                }, 3000)
            }
        )
    }

    return (
        <div className='border border-black border-opacity-50 rounded-3 px-3 py-2'>

            <form onSubmit={(e) => submitNumberForm(e)}>
                <h6 className='text-center my-0'>Редактировать номер кабинета</h6>
                <label>Номер кабинета:</label>
                <div className="input-group ">
                    <select id="select-corpus" className="form-select w-25" defaultValue={corpus} onChange={(e) => {
                        setCorpus(e.target.value);
                    }}>
                        <option value="А">A</option>
                        <option value="Б">Б</option>
                        <option value="В">В</option>
                        <option value="Г">Г</option>
                        <option value="Д">Д</option>
                        <option value="E">E</option>
                        <option value="Ж">Ж</option>
                        <option value="К">К</option>
                        <option value="И">И</option>
                    </select>
                    <input type={"text"} name={"cabinet"} placeholder={"201"} value={cabName} onChange={(e) => {
                        setCabName(e.target.value);
                    }} className="form-control w-75" aria-label="Text input with dropdown button"/>
                    {
                        checkCabinetExist(corpus + cabName) ?
                            <div
                                className='bg-warning text-white w-100 mt-2 p-2 d-flex justify-content-center rounded-3'>Такой
                                кабинет уже существует</div>
                            : <InputCheck/>
                    }

                </div>

                <div className="d-flex w-100 justify-content-center align-items-center mt-2">
                    <button className="w-100 btn btn-primary" type={"submit"}
                            disabled={checkCabinetExist(corpus + cabName) || !regMatch(corpus + cabName)}>Редактировать
                        номер
                    </button>
                </div>

                {
                    message ? <div
                        className='bg-success text-white w-100 mt-2 p-2 d-flex justify-content-center rounded-3'>Номер
                        кабинета успешно обновлен</div> : ""
                }
            </form>
            <hr/>
            <form className='mt-3'>
                <h6 className='text-center my-0'>Редактировать план кабинета</h6>
                <label>План SVG:</label>
                <input className='form-control' type={"file"} name={"plan"} accept={'.svg'}
                       onChange={(e) => setCabinetLink(e.target.value)} placeholder="Загрузите SVG"/>

                {checkFile()}
                <div className="d-flex w-100 justify-content-center align-items-center mt-2">
                    <button className="w-100 btn btn-primary" type={"submit"}>Редактировать план</button>
                </div>
            </form>
        </div>
    );
};


export default CabinetEditForm;