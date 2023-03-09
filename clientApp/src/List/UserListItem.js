import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { isExpired, getToken } from '../Utils.js/CheckToken'
import UserInnerList from '../InnerList/UserInnerList';

function UserListItem(props){

    const [innerMode, setInnerModeInfo] = useState(false)
    const [displayInnerList, setDisplayInnerList] = useState(false);
    const [list, setListInfo] = useState([])

    const handleDeleteButtonClick = async () =>{
        if (isExpired()){
            await getToken();
        }
        await axios.delete(`http://localhost:8080/flights/delete/${props.id}`,{
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        });
        props.changeUpdate();
    }

    const getUserExpInfo = async () =>{
        await axios.get(`http://localhost:8080/flightinfo/get/${props.id}`)
        .then(res => {
            setListInfo(res.data);
            setInnerModeInfo(true);
        })
    }

    const displayValues = () =>{
        return(
            <tr className="setTextMid">
                <td className="setTextMid setColumnTextMid">{props.departure}</td>
                <td className="setTextMid setColumnTextMid">{props.destination}</td>
                <td className="setTextMid setColumnTextMid">{props.cost}</td>
                <td className="setTextMid setColumnTextMid">{props.flights_available}</td>
                <td>
                    {innerMode ? null : displayButtons()}
                </td>
            </tr>
        )
    }

    const toggleLocalUpdate = () =>{
        props.changeUpdate();
    }


    const displayButtons = () => {
        const params = { 
            pathname: `/get-available-tickets/${props.id}`,
        };
        const upd = { 
            pathname: "/addexpinfo",

        };
        return(
            <>
                {props.loggedIn ? <Link to={params} state={{ from: props.id }}><button type="button"
                 className="btn btn-outline-dark btn-sm">More</button></Link> : null}
                {props.loggedIn ? localStorage.getItem("roles").includes("ROLE_ADMIN") ? <Link to={upd} state={{ from: props.id }}>
                    <button type="button" className="btn btn-outline-dark deleteBtn btn-sm">Add</button></Link> : null : null}
                {props.loggedIn ? localStorage.getItem("roles").includes("ROLE_ADMIN") ? <Link to="/change-employees-data" state={{ from: props.id }}>
                    <button type="button" className="btn btn-outline-dark deleteBtn btn-sm">Change</button></Link> : null : null}
                {props.loggedIn ? localStorage.getItem("roles").includes("ROLE_ADMIN") ? <button type="button" 
                className="btn btn-outline-dark deleteBtn btn-sm" onClick={() => {handleDeleteButtonClick()}}>Delete</button> : null : null}
            </>
        )
    }

    return(
        <tr className="setTextMid">
        <td className="setTextMid setColumnTextMid">{props.departure}</td>
        <td className="setTextMid setColumnTextMid">{props.destination}</td>
        <td className="setTextMid setColumnTextMid">{props.flights_available}</td>
        <td>
            {innerMode ? null : displayButtons()}
        </td>
        </tr>
    )
}

export {UserListItem};