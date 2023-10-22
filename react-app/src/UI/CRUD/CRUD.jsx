import React, {useState} from 'react';
import Block from "../Block/Block";
import SearchList from "./SearchList/SearchList";
import ControlPanel from "./ControlPanel/ControlPanel";
import 'react-tooltip/dist/react-tooltip.css'
import CabinetService from "../../API/CabinetService";

let cabinetsJson = await CabinetService.getAllCabinets()
let jsonType = {
    headers: ["Кабинет", "Планировка", "Количество устройств"],
    searchId: "cabinet",
    emptyPhrase: "",

}


const CRUD = () => {

    const [searchInput, setSearchInput] = useState("");
    const [selectedItem, setSelectedItem] = useState("")
    const [createCabModal, setCabModal] = useState(false)
    const [cabinetData, setCabinetData] = useState(cabinetsJson)


    return (
        <div className='w-100 h-100'>
            <div className='d-flex align-items-stretch justify-content-between'>
                <Block className='w-75  p-2 border border-dark bg-white rounded-3 overflow-x-hidden'>
                    <SearchList headers={jsonType.headers} data={cabinetData} setCabinetData={setCabinetData} searchInput={searchInput} setSearchInput={setSearchInput} setSelectedItem={setSelectedItem} createCabModal={createCabModal} setCabModal={setCabModal}/>
                </Block>
                <Block className='w-25  p-1 border border-dark bg-white rounded-3'>
                    <ControlPanel allCabinets={cabinetData} cabinet={selectedItem} setCabinetData={setCabinetData}/>
                </Block>
            </div>
            <Block>
                <div className=" d-flex flex-column justify-content-center align-items-center">Very dood</div>
            </Block>
        </div>
    );
};

export default CRUD;