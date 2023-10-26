import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import HeaderLinkUI from "./HeaderLinkUI";
import Badge from "../Badge/Badge";

let lockImg = <img width={16} height={16} src={"/files/lock.svg"}></img>

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
                        <div className='d-flex w-100 justify-content-between'>
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="e-list.html" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    { ['request-create','request-manage','request-type-list','program-request','account-request','connection-request','maintenance-request'].includes(page) ? <b> Заявки</b> : <>Заявки</>}
                                </a>
                                <ul className="dropdown-menu">
                                    <HeaderLinkUI className='dropdown-item nav-link' pageLink='request-manage' page={page} setPage={setPage}>Управление активными заявками</HeaderLinkUI>
                                    <HeaderLinkUI className='dropdown-item nav-link' pageLink='request-type-list' page={page} setPage={setPage}>Виды заявок</HeaderLinkUI>
                                    <HeaderLinkUI className='dropdown-item nav-link' pageLink='request-create' page={page} setPage={setPage}>Создать заявку</HeaderLinkUI>
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
                            <Badge badgeColor={"bg-dark"} badgeContent={lockImg} translateMiddle={true}>
                                <div className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        { ['request-constructor'].includes(page) ? <b>Конструктор заявок</b> : <>Конструктор заявок</>}

                                    </a>
                                    <ul className="dropdown-menu">
                                        <HeaderLinkUI className='dropdown-item nav-link' pageLink='request-constructor' page={page} setPage={setPage}>Открыть панель управления шаблонами заявок</HeaderLinkUI>
                                    </ul>
                                </div>
                            </Badge>
                        </div>
                    </ul>
                    <div className="d-flex flex-fill justify-content-end">
                        <div className="nav-item dropdown">
                            <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Администатор: Иванов И.И.</div>
                            <ul className="dropdown-menu">
                                <div className='dropdown-item'>Профиль</div>
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