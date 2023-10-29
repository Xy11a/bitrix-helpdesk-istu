import React, {useState} from 'react';
import Block from "../Block/Block";
import SearchList from "../CRUD/SearchList/SearchList";
import TestInstallSoftwareRequest from "../Request/TestInstallSoftwareRequest";

let requestJson = {
    headers: ["Название заявки","Тип заявки"],
    requests: [
        {requestName:"Подключение ПО в учебных классах", type: 'Программное обеспечение',  requestLink: "program-install-software"},
        {requestName:"Установку Dr.Web", type: 'Программное обеспечение', requestLink: "program-install-antivirus"},
        {requestName:"Установку ПО для административных ПК", type: 'Программное обеспечение', requestLink: "program-install-admin-software"},
        {requestName:"Учетную карту", type: 'Учетная деятельность', requestLink: ""},
        {requestName:"Учетную карту системного блока", type: 'Учетная деятельность', requestLink: ""},
        {requestName:"Список данных для ввода данных в УИ", type: 'Учетная деятельность', requestLink: ""},
        {requestName:"Заправка/замена картриджа", type: 'Техническое обслуживание', requestLink: ""},
        {requestName:"Монтажные работы", type: 'Техническое обслуживание', requestLink: ""},
        {requestName:"Телефон", type: 'Техническое обслуживание', requestLink: ""},
        {requestName:"Приобретение/настройка ПК", type: 'Техническое обслуживание', requestLink: ""},
        {requestName:"Ремонт ПК и техники", type: 'Техническое обслуживание',  requestLink: ""},
        {requestName:"На предоставление персонального доступа к сети Wi-Fi ИРНИТУ", type: 'Подключение к системе / создание УЗ',  requestLink: ""},
        {requestName:"Создание почтового ящика", type: 'Подключение к системе / создание УЗ', requestLink: ""},
        {requestName:"АРМ \"Кафедра\"", type: 'Подключение к системе / создание УЗ',  requestLink: ""},
    ]
}


const CreateRequestPage = () => {



    const [selectedItem, setSelectedItem] = useState("blable")
    const [requestData, setRequestData] = useState(requestJson.requests)



    return (
        <div>
            <Block><h1 className='text-center'>Выберите заявку</h1></Block>
            <Block className='my-1 border border-dark bg-white rounded-3 p-2'>
                <SearchList  setSelectedItem={setSelectedItem} headers={requestJson.headers} list={requestData} sortFunction={(a,b)=>{return a.type.localeCompare(b.type)}} filterFunction={(item,searchInput) => {return item.requestName.toLowerCase().includes(searchInput.toLowerCase())}}/>
            </Block>
            <Block>{selectedItem.requestName}</Block>
            <Block>
                <TestInstallSoftwareRequest></TestInstallSoftwareRequest>
            </Block>
        </div>
    );
};

export default CreateRequestPage;