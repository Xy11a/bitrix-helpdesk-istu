import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import HeaderLinkUI from "./HeaderLinkUI";

let userTemplateAdmin = {
    id:"1",
    name: "Петров И.И.",
    number: "+79225777483",
    email: "Ivan.durak@mail.ru",
    authority: "admin"
}
let userTemplateUser = {
    id:"1",
    name: "Иванов И.И.",
    number: "+79225777483",
    email: "Ivan.durak@mail.ru",
    authority: "user"
}

const Header = ({page,setPage, user, setUser}) => {
    return (
        <nav className="navbar navbar-expand-lg sticky-top bg-body-tertiary">
            <div className="container-fluid">
                <HeaderLinkUI className="navbar-brand" page={page} pageLink={'start-page'} setPage={setPage}>Система техподдержки ИРНИТУ</HeaderLinkUI>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <div className='d-flex w-100 justify-content-between'>
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="e-list.html" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    { ['request-create','request-manage','program-request','account-request','connection-request','maintenance-request'].includes(page) ? <b> Заявки</b> : <>Заявки</>}
                                </a>
                                <ul className="dropdown-menu">
                                    <HeaderLinkUI className='dropdown-item nav-link' pageLink='request-create' page={page} setPage={setPage}>Создать заявку</HeaderLinkUI>
                                    <HeaderLinkUI className={user.authority !== "user" ? 'dropdown-item nav-link' : 'dropdown-item nav-link disabled'} pageLink='request-manage' page={page} setPage={setPage}>Активные заявки</HeaderLinkUI>
                                </ul>
                            </div>
                            <div className="nav-item dropdown">
                                <a className={user.authority !== "user" ? 'nav-link dropdown-toggle' : 'nav-link dropdown-toggle disabled'} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    { ['create-cabinet'].includes(page) ? <b>Кабинеты</b> : <>Кабинеты</>}

                                </a>
                                <ul className="dropdown-menu">
                                    <HeaderLinkUI className='dropdown-item' pageLink='create-cabinet' page={page} setPage={setPage}>Управление интерактивными кабинетами</HeaderLinkUI>
                                </ul>
                            </div>
                            <div className="nav-item dropdown">
                                <a className={user.authority !== "user" ? 'nav-link dropdown-toggle' : 'nav-link dropdown-toggle disabled'} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    { ['request-constructor'].includes(page) ? <b>Конструктор заявок</b> : <>Конструктор заявок</>}

                                </a>
                                <ul className="dropdown-menu">
                                    <HeaderLinkUI className='dropdown-item nav-link' pageLink='request-constructor' page={page} setPage={setPage}>Открыть конструктор заявок</HeaderLinkUI>
                                </ul>
                            </div>
                        </div>
                    </ul>
                    <div className="d-flex flex-fill justify-content-end">
                        <div className="nav-item dropdown">
                            <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {user.authority === "admin" ? <span className={'text-danger'}>Администратор</span> : <span>Пользователь</span>}: Иванов И.И.
                            </div>
                            <ul className="dropdown-menu">
                                <div className='dropdown-item'>Профиль</div>
                                <div className='dropdown-item' onClick={()=>{

                                    if(user.authority === "user") {
                                        setUser(userTemplateAdmin)
                                    } else setUser(userTemplateUser)

                                }}>ДЕМО: Сменить права</div>
                                <div className='dropdown-item'>Выйти</div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;