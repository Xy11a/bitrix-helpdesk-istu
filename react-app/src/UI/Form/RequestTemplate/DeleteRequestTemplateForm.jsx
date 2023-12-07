import React from 'react';
import RequestTemplateService from "../../../API/RequestTemplateService";


const DeleteRequestTemplateForm = ({selectedItem, setSelectedItem,read}) => {

    const submitFunc = async (e) => {
        e.preventDefault();
        RequestTemplateService.deleteRequestTemplate(selectedItem.id).then((res) => {
            setSelectedItem("")
            read();
        })
    }

    return (
        <form className='border border-black border-opacity-50 rounded-3 px-2 py-2' onSubmit={(e)=> submitFunc(e)}>
            <div>
                <h5 className='text-center p-1 rounded-3'>
                    <div className='bg-danger text-white rounded-3'>Внимание!</div>
                    <div>Вы точно хотите удалить шаблон:"{selectedItem.name}"?</div>
                </h5>
            </div>

            <div className="d-flex w-100 justify-content-center align-items-center mt-2">
                <button className="w-100 btn btn-danger" type={"submit"}>Удалить</button>
            </div>
        </form>
    );
};

export default DeleteRequestTemplateForm;