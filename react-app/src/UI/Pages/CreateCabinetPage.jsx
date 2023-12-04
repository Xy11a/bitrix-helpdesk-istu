import React, {useState} from 'react';
import Block from "../Block/Block";
import CRUD from "../CRUD/CRUD";
import CabinetService from "../../API/CabinetService";
import CabinetLayout from "../CabinetLayout/CabinetLayout";
import CabinetCreateForm from "../Form/Cabinet/CabinetCreateForm";
import CabinetEditForm from "../Form/Cabinet/CabinetEditForm";
import CabinetDeleteForm from "../Form/Cabinet/CabinetDeleteForm";

let cabinetsJson = await CabinetService.getAllCabinets()
let dataProps = {
    headers: ["№ Кабинета", "Планировка", "Количество устройств"],
    sortFunc: (a,b)=>{return a.number.localeCompare(b.number)},
    filterFunc: (item,searchInput) => {return item.number.toLowerCase().includes(searchInput.toLowerCase())},
}


const CreateCabinetPage = () => {

    const [selectedItem, setSelectedItem] = useState("")
    const [cabinetData, setCabinetData] = useState(cabinetsJson)

    const createCabinet = (newCabinet) => {
        setCabinetData([...cabinetData,newCabinet])
    }

    const deleteCabinet = (cabinetToDelete) => {
        setCabinetData(cabinetData.filter(c => c.number !== cabinetToDelete.number))
        setSelectedItem("")
    }

    const readCabinets = async () => {
        setCabinetData(await CabinetService.getAllCabinets())
    }

    const updateCabinet = (newCabinetData) => {
        let newArr = [...cabinetData];
        let index =  newArr.findIndex((el)=> el === selectedItem)
        newArr[index] = {number: newCabinetData.number, cabinetLink: newCabinetData.cabinetLink}
        console.log(newArr)
    }

    const crudToolBar = (panel) => {
        switch (panel) {
            case "create":
                return <CabinetCreateForm cabinetData={cabinetData} createCabinet={createCabinet} readCabinets={readCabinets} />
            case "update":
                //TODO Доделать редактирование кабинета
                return <CabinetEditForm cabinet={selectedItem} updateCabinet={updateCabinet} />
            case "delete":
                return <CabinetDeleteForm selection={selectedItem} deleteFunction={deleteCabinet}/>
        }
    }



    return (
        <div>
            <Block>
                <h1 className="text-center">Панель управления интерактивными кабинетами</h1>
            </Block>

            <CRUD data={cabinetData}
                  dataProps={dataProps}
                  setSelection={setSelectedItem}
                  CRUDToolBarFunction={crudToolBar}
                  selection={selectedItem}
            />



            <CabinetLayout selectedCabinet={selectedItem} updateCabinets={readCabinets} />

            <Block>
                <div>TODO:</div>
                <div>1. Регулярное выражение</div>
                <div>2. Добавить устройство</div>
            </Block>

        </div>
    );
};

export default CreateCabinetPage;