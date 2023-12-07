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
    const [message,setMessage] = useState(false)
    const [status,setStatus] = useState(selectedItem ? selectedItem.status : "")

    useEffect(() => {
        getData(setRequest)
    }, [])


    const submitForm = (e) => {
        e.preventDefault()
        setMessage(true)

        let request = {
                id: selectedItem.id,
                templateId: selectedItem.template.id,
                data: selectedItem.data,
                createDate: selectedItem.createDate,
                status: status
            }


        RequestService.addRequest(request).then(
            ()=> {
                setTimeout(()=>{
                    setMessage(false)
                    setSelectedItem("")
                    getData(setRequest)
                },2500)
            }
        )
    }



    return (
        <div>
            <Block><h1 className='text-center'>Активные заявки</h1></Block>
            <Block className='my-1 border border-dark bg-white rounded-3 p-2'>
                {requests.length === 0 ? "Список пуст" :
                    <SearchList setSelectedItem={setSelectedItem} headers={dataProps.headers} list={requests}
                                sortFunction={dataProps.sortFunc} filterFunction={dataProps.filterFunc}/>
                }
            </Block>
            <div>
                {!selectedItem ? "Выберите шаблон заявки" :
                    <div className={'d-flex justify-content-between align-items-stretch'}>
                        <div className={'w-75'}>
                            <Block>
                                <Request template={selectedItem.template} setTemplate={setSelectedItem} isTest={false}
                                         isReadOnly={true} data={selectedItem.data}/>
                            </Block>
                        </div>
                        <div className={'w-25'}>
                            <Block>
                                <h4 className={'text-center'}>Панель управления активными заявками</h4>
                                <div className={'border border-black rounded-3 p-2'}>
                                    <form onSubmit={(e) => {
                                        submitForm(e)
                                    }}>
                                        <h6 className={'text-center'}>Изменить статус заявки</h6>
                                        <select className={'form-select'} value={status} onChange={(e)=> {setStatus(e.target.value)}}>
                                            <option className={'bg-primary text-white'}>Новая</option>
                                            <option className={'bg-warning text-white '}>В процессе</option>
                                            <option className={'bg-success text-white'}>Выполнена</option>
                                            <option className={'bg-danger text-white'}>Просрочена</option>
                                            <option className={'bg-black text-white'}>Отменена</option>
                                        </select>
                                        <button className={'btn btn-primary w-100 text-center p-2 mt-2'}
                                                type={"submit"}>Изменить статус
                                        </button>
                                        {
                                            message ? <div className={'bg-success w-100 mt-2 p-2 d-flex justify-content-center rounded-3 text-white'}>Статус успешно обновлен</div> : ""
                                        }
                                    </form>
                                </div>
                            </Block>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default RequestManagePage;