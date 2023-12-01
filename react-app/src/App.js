import './App.css';
import {useState} from "react";
import Header from "./UI/Header/Header";
import StartPage from "./UI/Pages/StartPage";
import CreateCabinetPage from "./UI/Pages/CreateCabinetPage";
import RequestManagePage from "./UI/Pages/RequestManagePage";
import RequestConstructorPage from "./UI/Pages/RequestConstructorPage";
import CreateRequestPage from "./UI/Pages/CreateRequestPage";


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


export default function App() {

    function returnPage(page, setPage, user) {
        switch (page) {
            case 'start-page':
                return <StartPage user={user} setPage={setPage}/>;
            case 'request-manage':
                return <RequestManagePage/>;
            case 'request-create':
                return <CreateRequestPage/>;
            case 'request-constructor':
                return <RequestConstructorPage/>;
            case 'create-cabinet':
                return <CreateCabinetPage/>;
        }
    }

    let [page, setPage] = useState("start-page")
    let [user, setUser] = useState(userTemplateAdmin)


    return (
        <div className="App">
            <Header page={page} setPage={setPage} user={user} setUser={setUser}/>
            <div className={"container"}>
                {returnPage(page, setPage, user)}
            </div>
        </div>
    );
}

