import React, {useEffect, useState} from 'react';
import Block from "../Block/Block";
import CRUD from "../CRUD/CRUD";
import CreateRequestTemplate from "../Request/CreateRequestTemplate";
import CreateRequestTemplateForm from "../Form/RequestTemplate/CreateRequestTemplateForm";
import RequestTemplateService from "../../API/RequestTemplateService";
import EditRequestTemplateForm from "../Form/RequestTemplate/EditRequestTemplateForm";
import DeleteRequestTemplateForm from "../Form/RequestTemplate/DeleteRequestTemplateForm";

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

const RequestConstructorPage = () => {

    const [selectedItem, setSelectedItem] = useState("")
    const [requestTemplates, setRequestTemplates] = useState([])

    useEffect(() => {
       getData(setRequestTemplates)
    }, [])

    const createRequestTemplate = (newRequest) => {
        setRequestTemplates([...requestTemplates, newRequest])
    }

    const deleteRequestTemplate = (requestToDelete) => {
        setRequestTemplates(requestTemplates.filter(c => c.number !== requestToDelete.number))
        setSelectedItem("")
    }

    const readRequestsTemplate = async () => {
        getData(setRequestTemplates)
    }

    const updateRequests = (requestId, newRequest) => {
        let curData = requestTemplates;
        let replaceItemIndex = curData.findIndex((el) => el.id === requestId);
        curData[replaceItemIndex] = newRequest
        setRequestTemplates([...curData])

    }

    const CRUDToolbar = (panel) => {
        switch (panel) {
            case "create":
                return <CreateRequestTemplateForm list={requestTemplates} read={readRequestsTemplate}/>
            case "update":
                return <div><EditRequestTemplateForm/></div>
            case "delete":
                return <div><DeleteRequestTemplateForm selectedItem={selectedItem} read={readRequestsTemplate}/></div>
        }
    }

    return (
        <div>
            <Block>
                <h1 className="text-center">Конструктор шаблонов заявки</h1>
            </Block>

            <CRUD data={requestTemplates} CRUDToolBarFunction={CRUDToolbar} dataProps={dataProps}
                  setSelection={setSelectedItem}/>

            {selectedItem ? <CreateRequestTemplate template={selectedItem} setSelection={setSelectedItem}  updateRequestTemplate={updateRequests}  read={readRequestsTemplate}/> : <Block>Выберите шаблон</Block>}


        </div>
    );
};

export default RequestConstructorPage;