import React from 'react';
import RequestTemplate from "../../../API/RequestTemplate";


const DeleteRequestTemplateForm = ({selectedItem,read}) => {

    const submitFunc = async (e) => {
        e.preventDefault();
        RequestTemplate.deleteRequestTemplate(selectedItem.id).then((res) => read())
    }

    return (
        <form className='border border-black border-opacity-50 rounded-3 px-2 py-2' onSubmit={(e)=> submitFunc(e)}>
            <div>
                <h5 className='text-center p-1 rounded-3'>
                    <span className='bg-danger text-white'>Внимание!</span>Вы точно хотите удалить шаблон {selectedItem.name}?
                </h5>
            </div>

            <div className="d-flex w-100 justify-content-center align-items-center mt-2">
                <button className="w-75 btn btn-danger" type={"submit"}>Удалить</button>
            </div>
        </form>
    );
};

export default DeleteRequestTemplateForm;