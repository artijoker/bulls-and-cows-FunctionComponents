import React from 'react';
import './History.css';

export default function History(props) {

    const getHistoryInTegTr = () => {
        let history = props.getHistory();
        let historyInTegTr = [];
        for (let i = 0; i < history.length; i++) {
            const element = history[i];
            historyInTegTr.push(
                <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{element.guess}</td>
                    <td>{element.result}</td>
                </tr>
            );
        }
        return historyInTegTr;
    }


    return <div className='History'>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Догадка</th>
                    <th scope="col">Результат</th>
                </tr>
            </thead>
            <tbody>
                {getHistoryInTegTr()}
            </tbody>


        </table>
    </div>

}