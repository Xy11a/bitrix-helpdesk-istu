import React, {useEffect, useState} from 'react';
import Block from "../Block/Block";
import SearchList from "../CRUD/SearchList/SearchList";
import Request from "../Request/Request";
import RequestTemplateService from "../../API/RequestTemplateService";


const getData = async (setRequestTemplates) => {
    let data = await RequestTemplateService.getAllRequestTemplates()
    setRequestTemplates(data)
}

let dataProps = {
    headers: ["Название заявки", "Тип заявки"],
    sortFunc: (a, b) => {
        return a.type.localeCompare(b.type)
    },
    filterFunc: (item, searchInput) => {
        return item.name.toLowerCase().includes(searchInput.toLowerCase())
    },
}

const CreateRequestPage = () => {
    const [selectedItem, setSelectedItem] = useState("")
    const [requestTemplates, setRequestTemplates] = useState([])

    useEffect(() => {
        getData(setRequestTemplates)
    }, [])


    return (
        <div>
            <Block><h1 className='text-center'>Выберите заявку</h1></Block>
            <Block className='my-1 border border-dark bg-white rounded-3 p-2'>
                {requestTemplates.length === 0 ? "Список пуст" :
                    <SearchList setSelectedItem={setSelectedItem} headers={dataProps.headers} list={requestTemplates}
                                sortFunction={dataProps.sortFunc} filterFunction={dataProps.filterFunc}/>
                }
            </Block>
            <Block>
                {!selectedItem ? "Выберите шаблон заявки" :
                    <Request template={selectedItem} setTemplate={setSelectedItem} isTest={false}/>
                }
            </Block>
        </div>
    );
};

export default CreateRequestPage;