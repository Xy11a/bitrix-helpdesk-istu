import React from 'react';

const Request = ({template}) => {
    return (
        <div className='p-2'>
            <div className='d-flex justify-content-center'><h2>{template.type}-{template.name}</h2></div>
            <div className='border border-black border-opacity-50 p-2 rounded-3'>
                <h2>Заполните форму:</h2>
                <ContactsInputs/>
                <div>
                    <div>
                        <div>Пример поле ввода "Строка/Текст":</div>
                        <input className='form-control' type={"text"} name={'text1'} placeholder={"Введите текст"} />
                    </div>
                    <div>
                        <div>Пример поле ввода "Число":</div>
                        <input className='form-control' type={"number"} name={'number1'}  />
                    </div>
                    <div>
                        <div>Пример поле ввода "Дата":</div>
                        <input className='form-control w-25' type={"date"} name={'date1'}  />
                    </div>
                    <div>
                        <label>Пример поле ввода "Флаг":</label>
                        <input className='form-check' type={"checkbox"} name={'checkbox1'}  />
                    </div>
                    <div>
                        <div>Пример поле ввода "Выбор":</div>
                        <select className='form-select' name={'select1'} >
                            <option>Выбор 1</option>
                            <option>Выбор 2</option>
                            <option>Выбор 3</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ContactsInputs = () => {
  return (
      <div>
          <div>
              <div>ФИО заявителя:</div>
              <input className='form-control' type={"text"} name={'fio'} defaultValue={"Иванов И.И."} readOnly={true}/>
          </div>
          <div>
              <div>Номер заявителя:</div>
              <input className='form-control w-25' type={'tel'} name={'telephone'} defaultValue={"+79225777483"} readOnly={true}/>
          </div>
          <div>
              <div>Email заявителя:</div>
              <input className='form-control w-25' type={"text"} name={'mail'} defaultValue={"Ivan.durak@mail.ru"} readOnly={true}/>
          </div>
          <div>
              <div>Должность заявителя:</div>
              <input className='form-control w-25' type={"text"} name={'job'} defaultValue={"Сотрудник ИТ-отдела"} readOnly={true}/>
          </div>
      </div>
  )
}

export default Request;