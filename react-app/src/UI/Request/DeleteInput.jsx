import React, {useState} from 'react';

const DeleteInput = ({template, updateTemplate}) => {

    const [selectedInput, setSelectedInput] = useState(template.inputDataProps.length === 0 ? "" : template.inputDataProps[0].label)


    const deleteInputFromInputs = () => {
        template.inputDataProps = template.inputDataProps.filter((el) => el.label !== selectedInput)
        updateTemplate(template.id,template)
    }

    return (
        <div className='border border-black border-opacity-50 p-2 m-2 rounded-3'>
            <h3 className='text-center'>Удалить поле ввода</h3>
            {
                template.inputDataProps.length === 0 ? <h6 className='text-center'>Список созданных полей <span className='bg-warning'>пуст!</span></h6> :
                    <div>
                        <label>Выберите поле для удаления:</label>
                        <select className='form-select' value={selectedInput} onChange={(e)=>setSelectedInput(e.target.value)}>
                            {template.inputDataProps.map((prop, index)=>
                                <option key={"inputDelIndex"+index}>{prop.label}</option>
                            )}
                        </select>
                        <button className='btn btn-danger w-100 p-2 mt-2' onClick={()=>deleteInputFromInputs()}>Удалить поле: {selectedInput}</button>
                    </div>
            }
        </div>
    );
};

export default DeleteInput;