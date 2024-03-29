import React from 'react';
import Block from "../Block/Block";
import SearchList from "./SearchList/SearchList";
import ControlPanel from "./ControlPanel/ControlPanel";
import 'react-tooltip/dist/react-tooltip.css'

const CRUD = ({data,dataProps,setSelection, CRUDToolBarFunction, selection}) => {

    return (
        <div className='w-100 h-100'>
            <div className='d-flex align-items-stretch justify-content-between'>
                <Block className='w-75  p-2 border border-dark bg-white rounded-3 overflow-x-hidden'>
                    <SearchList
                        headers={dataProps.headers}
                        list={data} setSelectedItem={setSelection}
                        sortFunction={dataProps.sortFunc}
                        filterFunction={dataProps.filterFunc}
                    />
                </Block>
                <Block className='w-25  p-1 border border-dark bg-white rounded-3'>
                    <ControlPanel CRUDToolBarFunction={CRUDToolBarFunction} selection={selection} />
                </Block>
            </div>
        </div>
    );
};

export default CRUD;