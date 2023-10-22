import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import HeaderLinkUI from "./HeaderLinkUI";

const Header = ({page,setPage}) => {
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
                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="e-list.html" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                { ['create-request','request-manage','request-type-list','program-request','account-request','connection-request','maintenance-request'].includes(page) ? <b> Заявки</b> : <>Заявки</>}
                            </a>
                            <ul className="dropdown-menu">
                                <HeaderLinkUI className='dropdown-item nav-link' pageLink='request-manage' page={page} setPage={setPage}>Управление активными заявками</HeaderLinkUI>
                                <HeaderLinkUI className='dropdown-item nav-link' pageLink='request-type-list' page={page} setPage={setPage}>Виды заявок</HeaderLinkUI>
                                <HeaderLinkUI className='dropdown-item nav-link' pageLink='create-request' page={page} setPage={setPage}>Создать заявку</HeaderLinkUI>
                            </ul>
                        </div>

                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                { ['create-cabinet'].includes(page) ? <b>Кабинет</b> : <>Кабинет</>}
                                
                            </a>
                            <ul className="dropdown-menu">
                                <HeaderLinkUI className='dropdown-item' pageLink='create-cabinet' page={page} setPage={setPage}>Открыть панель управления кабинетами</HeaderLinkUI>
                            </ul>
                        </div>

                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                { ['request-constructor'].includes(page) ? <b>Конструктор заявок</b> : <>Конструктор заявок</>}

                            </a>
                            <ul className="dropdown-menu">
                                <HeaderLinkUI className='dropdown-item nav-link' pageLink='request-constructor' page={page} setPage={setPage}>Открыть панель управления шаблонами заявок</HeaderLinkUI>
                            </ul>
                        </div>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;