import React from 'react';

const SearchListElement = ({data, ...props}) => {

    let dataKeys = Object.keys(data);


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