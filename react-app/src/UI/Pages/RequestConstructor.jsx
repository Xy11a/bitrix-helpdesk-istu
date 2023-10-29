import React, {useState} from 'react';
import Block from "../Block/Block";
import CRUD from "../CRUD/CRUD";
import CreateRequestTemplate from "../Request/CreateRequestTemplate";


let data =
    [
        {
            name: "1",
            type: 'Программное обеспечение',
            id: 1,
            options: {cabinets: true, interactiveCabinets: true},
            inputDataProps: {},
            data: {}
        },
        {
            name: "2",
            type: 'Программное обеспечение',
            id: 2,
            options: {cabinets: true, interactiveCabinets: false},
            inputDataProps: {},
            data: {}
        },
        {
            name: "3",
            type: 'Программное обеспечение',
            id: 3,
            options: {cabinets: false, interactiveCabinets: false},
            inputDataProps: {},
            data: {}
        },
        {
            name: "4",
            type: 'Программное обеспечение',
            id: 4,
            options: {cabinets: null, interactiveCabinets: null},
            inputDataProps: {},
            data: {}
        },

    ]

let dataProps = {
    headers: ["Название заявки", "Тип заявки"],
    sortFunc: (a, b) => {
        return a.type.localeCompare(b.type)
    },
    filterFunc: (item, searchInput) => {
        return item.name.toLowerCase().includes(searchInput.toLowerCase())
    },
}

const RequestConstructor = () => {

    const [selectedItem, setSelectedItem] = useState("")
    const [requestData, setRequestData] = useState(data)

    const createRequest = (newRequest) => {
        setRequestData([...requestData, newRequest])
    }

    const deleteRequest = (requestToDelete) => {
        setRequestData(requestData.filter(c => c.number !== requestToDelete.number))
        setSelectedItem("")
    }

    const readRequests = async () => {
        //todo СДЕЛАЙ загруску с сервера
        setRequestData(data)
    }

    const updateRequests = (requestId) => {
        let curData = requestData;
        let replaceItem = requestData[curData.findIndex((el) => el.id === requestId)];

    }

    const CRUDToolbar = (panel) => {
        switch (panel) {
            case "create":
                return <div>sadas1</div>
            case "update":
                return <div>sadas2</div>
            case "delete":
                return <div>sadas3</div>
        }
    }

    return (
        <div>
            <Block>
                <h1 className="text-center">Конструктор шаблонов заявки</h1>
            </Block>

            <CRUD data={requestData} CRUDToolBarFunction={CRUDToolbar} dataProps={dataProps}
                  setSelection={setSelectedItem}/>

            {selectedItem ? <CreateRequestTemplate template={selectedItem}/> : <Block>Выберите шаблон</Block>}
        </div>
    );
};

export default RequestConstructor;