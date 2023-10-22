import React from 'react';
import Block from "../Block/Block";

const RequestTypeList = ({page,setPage}) => {
    return (
        <div>
            <Block>
                <h1 className="text-center">Виды заявки</h1>
            </Block>
            <Block onClick={()=>{setPage("program-request")}}>
                    <h2 className="mx-2">Программное обеспечение</h2>
                    <div>
                        <ul className="m-0">
                            <li>Подключение ПО в учебных классах</li>
                            <li>Установку Dr.Web</li>
                            <li>Установку ПО для административных ПК</li>
                        </ul>
                    </div>
            </Block>

            <Block onClick={()=>{setPage("account-request")}}>
                    <h2 className="mx-2">Учетная деятельность</h2>
                    <div>
                        <ul className="m-0">
                            <li>Учетную карту</li>
                            <li>Учетную карту системного блока</li>
                            <li>Список данных для ввода данных в УИ</li>
                        </ul>
                    </div>
            </Block>
            <Block onClick={()=>{setPage("connection-request")}}>
                    <h2 className="mx-2">Подключение к системе / создание УЗ</h2>
                    <div>
                        <ul className="m-0">
                            <li>На предоставление персонального доступа к сети Wi-Fi ИРНИТУ</li>
                            <li>Создание почтового ящика</li>
                            <li>АРМ "Кафедра"</li>
                        </ul>
                    </div>
            </Block>

            <Block onClick={()=>{setPage("maintenance-request")}}>
                    <h2 className="mx-2">Техническое обслуживание</h2>
                    <div className="request-body">
                        <ul className="m-0">
                            <li>Заправка/замена картриджа</li>
                            <li>Монтажные работы</li>
                            <li>Телефон</li>
                            <li>Приобретение/настройка ПК</li>
                            <li>Ремонт ПК и техники</li>
                        </ul>
                    </div>
            </Block>
        </div>
    );
};

export default RequestTypeList;