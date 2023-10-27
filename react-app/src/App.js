import './App.css';
import {useState} from "react";
import Header from "./UI/Header/Header";
import RequestTypeList from "./UI/Pages/RequestTypeList";
import StartPage from "./UI/Pages/StartPage";
import CreateCabinet from "./UI/Pages/CreateCabinet";
import RequestManage from "./UI/Pages/RequestManage";
import RequestConstructor from "./UI/Pages/RequestConstructor";
import CreateRequest from "./UI/Pages/CreateRequest";


export default function App() {

    function returnPage(page, setPage) {
        switch (page) {
            case 'start-page':
                return <StartPage/>;
            case 'request-manage':
                return <RequestManage/>;
            case 'request-create':
                return <CreateRequest/>;
            case 'request-constructor':
                return <RequestConstructor/>;
            case 'create-cabinet':
                return <CreateCabinet/>;
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

