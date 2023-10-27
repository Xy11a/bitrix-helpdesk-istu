import React, {useState} from 'react';
import Block from "../Block/Block";
import SearchList from "./SearchList/SearchList";
import ControlPanel from "./ControlPanel/ControlPanel";
import 'react-tooltip/dist/react-tooltip.css'
import CabinetService from "../../API/CabinetService";
import CabinetLayout from "../CabinetLayout/CabinetLayout";

let cabinetsJson = await CabinetService.getAllCabinets()
let jsonType = {
    headers: ["Кабинет", "Планировка", "Количество устройств"],
    searchId: "cabinet",
    emptyPhrase: "",

}


const CRUD = () => {

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



    return (
        <div className='w-100 h-100'>
            <div className='d-flex align-items-stretch justify-content-between'>
                <Block className='w-75  p-2 border border-dark bg-white rounded-3 overflow-x-hidden'>
                    <SearchList
                        headers={jsonType.headers}
                        createCabinet={createCabinet}
                        list={cabinetData} setSelectedItem={setSelectedItem}
                        sortFunction={(a,b)=>{return a.number.localeCompare(b.number)}}
                        filterFunction={(item,searchInput) => {return item.number.toLowerCase().includes(searchInput.toLowerCase())}}
                    />
                </Block>
                <Block className='w-25  p-1 border border-dark bg-white rounded-3'>
                    <ControlPanel cabinetData={cabinetData} selectedCabinet={selectedItem} createCabinet={createCabinet} deleteCabinet={deleteCabinet} />
                </Block>
            </div>
            <CabinetLayout selectedCabinet={selectedItem} updateCabinets={readCabinets} />

            <Block>
                <div>TODO:</div>
                <div>1. Баг создания пустого кабинета</div>
                <div>2. Регулярное выражение</div>
                <div>3. Обновление после создание кабинета</div>
                <div>4. Добавить succes-error окна после действий с сервером </div>
            </Block>
        </div>
    );
};

export default CRUD;