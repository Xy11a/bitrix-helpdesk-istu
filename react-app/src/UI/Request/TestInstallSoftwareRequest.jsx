import React from 'react';

const TestInstallSoftwareRequest = () => {
    return (
        <div>
            <div id="form-one" className="px-3">
                <form id="form1" className="py-2">
                    <div className="border border-dark bg-white rounded-3 mt-1 p-2">
                        <h2>Выберите кабинет:</h2>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <label>Номер кабинета:</label>
                                <select id="cabinetSel1" name="classroomId"></select>
                            </div>
                            <div>
                                <button type="button" className="btn btn-primary w-100" id="cabinetConf1">Подтвердить
                                </button>
                            </div>
                        </div>
                    </div>

                    <div id="div-table1" className="border border-dark bg-white rounded-3 mt-1 p-2 disabled">
                        <h2>Заполните форму:</h2>
                        <table id="table-form-one">
                            <tr>
                                <td className="w-50"><label> ФИО заявителя:</label></td>
                                <td colSpan="3"><input type="text" name="fio" placeholder="ФИО" required/></td>
                            </tr>
                            <tr>
                                <td><label>Аббревиатура кафедры / название подразделения заявителя:</label></td>
                                <td colSpan="3"><input className="w-75" type="text" name="departmentName"
                                                       placeholder="Институт информационных технологий и анализа данных"
                                                       required/></td>
                            </tr>
                            <tr>
                                <td><label>Полное официальное наименование запрашиваемого ПО:</label></td>
                                <td colSpan="3"><input className="w-25" type="text" name="programName"
                                                       placeholder="AnyDesk" required/></td>
                            </tr>
                            <tr>
                                <td><label>Полное наименование преподаваемых дисциплин:</label></td>
                                <td colSpan="3"><input className="w-50" type="text" name="subjects"
                                                       placeholder="Базы данных, Веб-программирование" required/></td>
                            </tr>
                            <tr>
                                <td><label>ФИО преподавателя (полностью), который будет проводить занятия:</label></td>
                                <td colSpan="3"><input type="text" name="stuffFIO" placeholder="Иванов Иван Иванович"
                                                       required/>
                                </td>
                            </tr>
                            <tr>
                                <td><label>Должность:</label></td>
                                <td colSpan="3"><input className="w-50" type="text" name="jobTitle" placeholder="Доцент"
                                                       required/></td>
                            </tr>
                            <tr>
                                <td><label>Контактный телефон:</label></td>
                                <td colSpan="3"><input className="w-25" type="text" name="stuffNumber"
                                                       placeholder="+79883544574" required/>
                                </td>
                            </tr>
                            <tr>
                                <td><label>E-mail на почтовом сервере ИРНИТУ:</label></td>
                                <td colSpan="3"><input className="w-50" type="email" name="stuffEmail"
                                                       placeholder="yourmailbox@istu.edu"
                                                       required/></td>
                            </tr>
                            <tr>
                                <td colSpan="4" className='text-center'><h3>Перечень ПК в указанной аудитории, на
                                    которых требуется установка ПО:</h3>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4"className='text-center'>
                                    <div
                                        className="d-flex justify-content-center align-items-center border border-dark">
                                        <div id="konvas-container1"></div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <table id="table-pc-input1">

                        </table>
                        <button className="btn btn-primary w-100" onClick="">Отправить</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default TestInstallSoftwareRequest;