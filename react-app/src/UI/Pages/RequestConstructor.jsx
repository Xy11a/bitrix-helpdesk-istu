import React from 'react';
import Block from "../Block/Block";
import CreateRequestTemplate from "../Request/CreateRequestTemplate";
import CRUD from "../CRUD/CRUD";

const RequestConstructor = () => {
    return (
        <div>
            <Block>
                <h1 className="text-center">Коструктор шаблонов заявки</h1>
            </Block>

            <CRUD/>
        </div>
    );
};

export default RequestConstructor;