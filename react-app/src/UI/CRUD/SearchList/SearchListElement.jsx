import React from 'react';

const SearchListElement = ({data,headers, ...props}) => {

    let dataKeys = Object.keys(data);

    if(dataKeys.length !== headers.length){
        for (let i = dataKeys.length; i > headers.length; i--) dataKeys.pop()
    }


    return (
        <tr {...props}>
            {
                dataKeys.map((dataKey,key) => {
                return <td className='border-bottom border-black border-opacity-50 text-end' key={key}>{data[dataKey]}</td>
            })}
        </tr>
    );
};

export default SearchListElement;