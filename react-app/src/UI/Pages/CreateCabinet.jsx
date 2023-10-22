import React from 'react';
import Block from "../Block/Block";
import CRUD from "../CRUD/CRUD";




const CreateCabinet = () => {
    return (
        <div>
            <Block>
                <h1 className="text-center">Панель управления интерактивными кабинетами</h1>
            </Block>

            <CRUD/>

        </div>
    );
};

export default CreateCabinet;