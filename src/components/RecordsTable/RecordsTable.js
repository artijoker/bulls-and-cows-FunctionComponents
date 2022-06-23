import React from 'react';
import './RecordsTable.css';

export default function RecordsTable(props){

    const getRecordsInTegTr = () => {
        let records = props.getRecords();
        let recordsInTegTr = [];
        for (let i = 0; i < records.length; i++) {
            const element = records[i];
            recordsInTegTr.push(
                <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{element.attempts}</td>
                    <td>{element.name}</td>
                </tr>
            );
        }
        return recordsInTegTr;
    }

    return <div className='RecordsTable'>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Попытки</th>
                        <th scope="col">Имя</th>
                    </tr>
                </thead>
                <tbody>
                    {getRecordsInTegTr()}
                </tbody>


            </table>
        </div>
    
}
