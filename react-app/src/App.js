import './App.css';
import {useState} from "react";
import Header from "./UI/Header/Header";
import StartPage from "./UI/Pages/StartPage";
import CreateCabinetPage from "./UI/Pages/CreateCabinetPage";
import RequestManagePage from "./UI/Pages/RequestManagePage";
import RequestConstructor from "./UI/Pages/RequestConstructor";
import CreateRequestPage from "./UI/Pages/CreateRequestPage";


export default function App() {

    function returnPage(page, setPage) {
        switch (page) {
            case 'start-page':
                return <StartPage/>;
            case 'request-manage':
                return <RequestManagePage/>;
            case 'request-create':
                return <CreateRequestPage/>;
            case 'request-constructor':
                return <RequestConstructor/>;
            case 'create-cabinet':
                return <CreateCabinetPage/>;
        }
    }

    let [page, setPage] = useState("start-page")


    return (
        <div className="App">
            <Header page={page} setPage={setPage}/>
            <div className={"container"}>
                {returnPage(page, setPage)}
            </div>
        </div>
    );
}

