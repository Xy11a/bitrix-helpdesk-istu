import React, {useState} from 'react';
import Block from "../Block/Block";
import SearchList from "../CRUD/SearchList/SearchList";



let requestJson = {
    headers: ["Тип заявки", "Название заявки", "Действие"],
    requests: [
        {type: 'Программное обеспечение', requestName:"Подключение ПО в учебных классах", requestLink: "<button class='btn btn-primary w-100' onclick='setSelectedItem(\"po-install-program\")'>Открыть шаблон заявки</button>"},
        {type: 'Программное обеспечение', requestName:"Установку Dr.Web", requestLink: "<button class='btn btn-primary w-100' onclick='setSelectedItem(\"po-install-antivirus\")'>Открыть шаблон заявки</button>"},
        {type: 'Программное обеспечение', requestName:"Установку ПО для административных ПК", requestLink: "<button class='btn btn-primary w-100' onclick='setSelectedItem(\"po-install-admin-program\")'>Открыть шаблон заявки</button>"},
        {type: 'Учетная деятельность', requestName:"Учетную карту", requestLink: ""},
        {type: 'Учетная деятельность', requestName:"Учетную карту системного блока", requestLink: ""},
        {type: 'Учетная деятельность', requestName:"Список данных для ввода данных в УИ", requestLink: ""},
        {type: 'Техническое обслуживание', requestName:"Заправка/замена картриджа", requestLink: ""},
        {type: 'Техническое обслуживание', requestName:"Монтажные работы", requestLink: ""},
        {type: 'Техническое обслуживание', requestName:"Телефон", requestLink: ""},
        {type: 'Техническое обслуживание', requestName:"Приобретение/настройка ПК", requestLink: ""},
        {type: 'Техническое обслуживание', requestName:"Ремонт ПК и техники", requestLink: ""},
        {type: 'Подключение к системе / создание УЗ', requestName:"На предоставление персонального доступа к сети Wi-Fi ИРНИТУ", requestLink: ""},
        {type: 'Подключение к системе / создание УЗ', requestName:"Создание почтового ящика", requestLink: ""},
        {type: 'Подключение к системе / создание УЗ', requestName:"АРМ \"Кафедра\"", requestLink: ""},
    ]
}




const CreateRequest = () => {
    const [selectedItem, setSelectedItem] = useState("")
    const [requestData, setRequestData] = useState(requestJson.requests)



    return (
        <div>
            <Block><h1 className='text-center'>Выберите заявку</h1></Block>
            <Block>
                <SearchList headers={requestJson.headers} list={requestData}/>
            </Block>
        </div>
    );
};

export default CreateRequest;