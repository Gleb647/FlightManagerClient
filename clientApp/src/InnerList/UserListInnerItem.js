import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { isExpired, getToken } from '../Utils.js/CheckToken'

function UserListInnerItem(props){

    const [string, setString] = useState(props.date == null ? "---" : props.date);
    const navigate = useNavigate();

    const parseDate = () =>{
        const date = string.split(" ").at(0); 
        const ms = date.split("-");
        return ms.at(2) + "-" + ms.at(1) + "-"+ms.at(0);
    }

    const buyTicket = async () =>{
        const userName = localStorage.getItem("user");
        console.log("User" + userName);

        let config = {
            headers: {'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                },
            params: {
                username: userName 
            },
        }

        await axios.get(`http://localhost:8080/buy-ticket/${props.id}`, config)
        .then(() =>{
            console.log("Ticket succesfully bought");
        })
        .catch(()=>{
            navigate("/login")
        })
    }

    return(
        <tr className="setTextMid">                  
            <td className="setTextMid setColumnInnerTextMid">{props.carrier}</td>
            <td className="setTextMid setColumnInnerTextMid">{props.flightDuration} h</td>
            <td className="setTextMid setColumnInnerTextMid">{parseDate()}</td>
            <td className="setTextMid setColumnInnerTextMid">{string.split(" ").at(1)} </td>
            <td className="setTextMid setColumnInnerTextMid">{props.cost} $</td>
            <td className="setTextMid setColumnInnerTextMid">
            {localStorage.getItem("roles").includes("ROLE_ADMIN") ? null : 
                <button type="button" className="btn btn-outline-dark deleteBtn btn-sm" onClick={()=>{buyTicket()}}>Buy ticket</button>}
            </td>
        </tr>
    )
}

export {UserListInnerItem};