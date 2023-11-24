import React, {useEffect, useState} from 'react';
import Block from "../Block/Block";
import RequestService from "../../API/RequestService";
import SearchList from "../CRUD/SearchList/SearchList";
import Request from "../Request/Request";

const getData = async (setRequest) => {
    let data = await RequestService.getAllRequest()
    setRequest(data)
}

let dataProps = {
    headers: ["Название заявки", "Дата создания", "Статус"],
    sortFunc: (a, b) => {
        return a.status.localeCompare(b.status)
    },
    filterFunc: (item, searchInput) => {
        return item.name.toLowerCase().includes(searchInput.toLowerCase())
    },
}



const RequestManagePage = () => {

    const [selectedItem, setSelectedItem] = useState("")
    const [requests, setRequest] = useState([])

    useEffect(() => {
        getData(setRequest)
    }, [])


    return (
        <div>
            <Block><h1 className='text-center'>Активные заявки</h1></Block>
            <Block className='my-1 border border-dark bg-white rounded-3 p-2'>
                {requests.length === 0 ? "Список пуст" :
                    <SearchList setSelectedItem={setSelectedItem} headers={dataProps.headers} list={requests}
                                sortFunction={dataProps.sortFunc} filterFunction={dataProps.filterFunc}/>
                }
            </Block>
            <Block>
                {!selectedItem ? "Выберите шаблон заявки" :
                    <Request template={selectedItem.template} setTemplate={setSelectedItem} isTest={true}/>
                }
            </Block>
        </div>
    );
};

export default RequestManagePage;