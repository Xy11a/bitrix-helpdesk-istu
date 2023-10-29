import React, {useState} from 'react';
import Block from "../Block/Block";
import CRUD from "../CRUD/CRUD";
import CabinetService from "../../API/CabinetService";
import CabinetLayout from "../CabinetLayout/CabinetLayout";
import CabinetCreateForm from "../Form/CabinetCreateForm";
import CabinetEditForm from "../Form/CabinetEditForm";
import CabinetDeleteForm from "../Form/CabinetDeleteForm";

let cabinetsJson = await CabinetService.getAllCabinets()
let dataProps = {
    headers: ["Кабинет", "Планировка", "Количество устройств"],
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

    const updateCabinet = (newCabinetName) => {

    }

    const crudToolBar = (panel) => {



        switch (panel) {
            case "create":
                return <CabinetCreateForm cabinetData={cabinetData} createCabinet={createCabinet} readCabinets={readCabinets} />
            case "update":
                //TODO Доделать редактирование кабинета
                return <CabinetEditForm cabinet={selectedItem} />
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
            />



            <CabinetLayout selectedCabinet={selectedItem} updateCabinets={readCabinets} />

            <Block>
                <div>TODO:</div>
                <div>1. Баг создания пустого кабинета</div>
                <div>2. Регулярное выражение</div>
                <div>3. Обновление после создание кабинета</div>
                <div>4. Добавить success-error окна после действий с сервером</div>
            </Block>

        </div>
    );
};

export default CreateCabinetPage;