import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { isExpired, getToken } from './Utils.js/CheckToken'

function UserListInnerItem(props){

    const [string, setString] = useState(props.date == null ? "---" : props.date);

    const parseDate = () =>{
        const date = string.split(" ").at(0); 
        const ms = date.split("-");
        return ms.at(2) + "-" + ms.at(1) + "-"+ms.at(0);
    }

    return(
        <tr className="setTextMid">                  
            <td className="setTextMid setColumnInnerTextMid">{props.carrier}</td>
            <td className="setTextMid setColumnInnerTextMid">{props.flightDuration} h</td>
            <td className="setTextMid setColumnInnerTextMid">{parseDate()}</td>
            <td className="setTextMid setColumnInnerTextMid">{string.split(" ").at(1)} </td>
            <td className="setTextMid setColumnInnerTextMid">{props.cost} $</td>
            <td className="setTextMid setColumnInnerTextMid"><button type="button" className="btn btn-outline-dark deleteBtn btn-sm">Buy ticket</button></td>
        </tr>
    )
}

export {UserListInnerItem};