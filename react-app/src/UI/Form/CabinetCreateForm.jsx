import React, {useState} from 'react';
import CabinetService from "../../API/CabinetService";
import axios from "axios";

const CabinetCreateForm = ({allCabinets, setModal}) => {

    const [cabName, setCabName] = useState("")
    const [corpus, setCorpus] = useState("А")
    const [fileSVG,setFileSVG] = useState(null)

    let checkNumber = false;
    let checkFileType = false;


    function submitCabinet(e,corpus,cabName) {
        e.preventDefault();

        let file = checkFileType ? fileSVG : null
        setModal(false)

        if(checkNumber === true) {
            let number = {number: corpus+cabName}
            CabinetService.addCabinet(number)
                .then(()=>{
                    let formData = new FormData()
                    formData.append("file", file);
                    formData.append("cabinet", corpus+cabName)
                    console.log(formData.get("cabinet"))
                    CabinetService.addSVG(formData)
                })
        }

    }


    return (
        <form onSubmit={(e)=> submitCabinet(e,corpus,cabName,fileSVG)} id='create-cab-form' className='border border-black border-opacity-50 rounded-3 px-3 py-2'>
            <h5 className='text-center my-0'>Создать кабинет</h5>

            <label>Кабинет:</label>
            <div className="input-group ">
                <select id="select-corpus" className="form-select w-25" defaultValue={corpus} onChange={(e) => {
                    setCorpus(this.value)
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
            </div>


            {checkInput(corpus, cabName, allCabinets)}


            <label>План SVG (Необязательно):</label>
            <input onChange={(e)=> {setFileSVG(e.target.files[0]);}} className='form-control' type={"file"} name={"plan"} accept=".svg" placeholder="Загрузите SVG"/>

            {checkFile(fileSVG)}

            <input type={"hidden"} name={"id"}/>
            <div className="d-flex w-100 justify-content-center align-items-center mt-2">
                <button className="w-75 btn btn-primary" type={"submit"}>Создать</button>
            </div>
        </form>
    );


    function checkInput(corpus, cabName, allCabinets) {
        let input = corpus + cabName;
        if (cabName === "") {
            checkNumber = false;
            return "";
        }

        let cabinetExist = allCabinets.find((cabinet) => cabinet.number === input)
        if (cabinetExist !== undefined) {
            checkNumber = false;
            return <div className="bg-warning my-1 p-2 rounded-3">Кабинет уже существует</div>
        }

        if (!input.match(/^([a-zA-ZА-Яа-я]{1})([0-3]{1})([1-9]{1}|[0]{1}[1-9]{1}|[1-3]{1}[1-9]{1})([a-zA-ZА-Яа-я]{0,2})$/gmi)) {
            checkNumber = false;
            return <div className="bg-warning my-1 p-2 rounded-3">Неверный формат номера кабинета</div>
        }
        checkNumber = true;
        return <div className="bg-success text-white bg-opacity-75 my-1 p-2 rounded-3">ОК</div>;
    }

    function checkFile(file){
        if(file === null) return "";
        if(!file.name.includes(".svg")){
            checkFileType = false
            return <div className="bg-warning my-1 p-2 rounded-3">Неверный формат файла. При создании кабинета будет загружен план по умолчанию</div>
        }
        checkFileType = true
        return <div className="bg-success text-white bg-opacity-75 my-1 p-2 rounded-3">ОК</div>;
    }

};


export default CabinetCreateForm;