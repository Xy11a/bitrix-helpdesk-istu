import React, {useEffect, useState} from 'react';
import Block from "../Block/Block";
import RequestService from "../../API/RequestService";

import SearchList from "../CRUD/SearchList/SearchList";

const getData = async (setRequest, username) => {
    let data = await RequestService.getAllUserRequest(username)
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


const StartPage = ({user,setPage}) => {

    const [selectedItem, setSelectedItem] = useState("")
    const [requests, setRequest] = useState([])

    useEffect(() => {
        getData(setRequest,user.name)
    }, [user])




    return (
        <div>
            <Block>
                <h1 className='text-center'>Система техподержки ИРНИТУ</h1>
            </Block>
            <div className='d-flex justify-content-between'>
                <div className={'w-75 flex-grow-1'}>
                    <div className={'my-1 border border-dark bg-white rounded-3 p-2 h-100'}>
                        <h4 className='text-center'>Мои заявки</h4>


                        {requests.length === 0
                            ?
                            <div className={'d-flex justify-content-center align-items-center flex-grow-1'}>Список ваших заявок пуст</div>
                            :
                            <SearchList setSelectedItem={setSelectedItem} headers={dataProps.headers} list={requests}
                                        sortFunction={dataProps.sortFunc} filterFunction={dataProps.filterFunc}/>
                        }

                    </div>
                </div>
                <div className={'w-25'}>
                    <Block>
                        <h4 className='text-center'>Заявки</h4>
                        <button className={'btn btn-primary w-100 mt-2'} onClick={()=> setPage('request-create')}>Создать заявку</button>
                        <button className={'btn btn-primary w-100 mt-2'} onClick={()=> setPage('request-manage')} disabled={user.authority === "user"}>Управления активными заявками</button>
                    </Block>
                    <Block>
                        <h4 className='text-center'>Кабинеты</h4>
                        <button className={'btn btn-primary w-100 mt-2'} onClick={()=> setPage('create-cabinet')} disabled={user.authority === "user"}>Открыть панель управления кабинетами</button>
                    </Block>
                    <Block>
                        <h4 className='text-center'>Конструктор заявок</h4>
                        <button className={'btn btn-primary w-100 mt-2'} disabled={user.authority === "user"} onClick={()=> setPage('request-constructor')}>Открыть панель управления шаблонами заявок</button>
                    </Block>
                </div>
            </div>

        </div>
    );
};

export default StartPage;