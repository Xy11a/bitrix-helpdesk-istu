import React, {useMemo, useState} from 'react';
import Icon from "../../Icon/Icon";
import SearchListElement from "./SearchListElement";
import ModalFrame from "../../Modal/ModalFrame";
import CabinetCreateForm from "../../Form/CabinetCreateForm";

const SearchList = ({headers, list, createCabinet, setSelectedItem,sortFunction}) => {


    const [createCabModal, setCabModal] = useState(false)
    const [searchInput, setSearchInput] = useState("");

    const sortedCabinets = useMemo(()=>{
        return [...list].sort(sortFunction());
    },[list])

    const sortedAndSearchCabinets = useMemo(()=>{
        return sortedCabinets.filter(c => c.number.toLowerCase().includes(searchInput.toLowerCase()))
    }, [searchInput,sortedCabinets])




    return (
        <div>
            <div className="d-flex justify-content-between w-100 flex-wrap my-2">
                <Icon width={24} height={24} src={"./files/search.svg"}/>
                <input className='mx-1 w-75 flex-fill rounded-3' placeholder={"Поиск..."} value={searchInput}
                       type={"text"} onChange={(e) => {setSearchInput(e.target.value);
                }}/>
                <ModalFrame visible={createCabModal} setVisible={setCabModal}>
                    <CabinetCreateForm  cabinetData={list} createCabinet={createCabinet} setModal={setCabModal}/>
                </ModalFrame>
                <button onClick={()=> setCabModal(true)} className='btn btn-primary mx-1 flex-fill'>Добавить</button>
            </div>

            <table className="border border-black border-opacity-50 w-100 h-100 table table-striped table-hover">
                <thead>
                <tr>
                    {headers.map((header, key) => {
                        return <th className=' border border-black border-opacity-50 text-center' key={key}>{header}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {

                    sortedAndSearchCabinets.length > 0 ? sortedAndSearchCabinets.map((el, key) => {
                        return <SearchListElement data={el} key={key} onClick={(e) => {
                            setSelectedItem(el);
                            setSelectionColor(e.target.parentElement)
                        }}/>
                    }) : <tr>
                            <td colSpan={3} className="text-center">
                                <div>Внимание искомые кабинеты не найдены.</div>
                                <button onClick={()=> setCabModal(true)} className="btn btn-primary">Добавить новый кабинет?</button>
                            </td>
                        </tr>

                }
                </tbody>

            </table>
        </div>
    );


    function setSelectionColor(element) {
        let rows = element.parentElement.childNodes

        rows.forEach((row)=> {
            row.childNodes.forEach((column)=> {
                let cl = column.className;
                cl = cl.replace("bg-primary bg-opacity-25"," ");
                column.className = cl
            })
        })

        element.childNodes.forEach((column)=> {
            column.className += " bg-primary bg-opacity-25"
        })

    }

};

export default SearchList;