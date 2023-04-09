import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { isExpired, getToken } from '../Utils.js/CheckToken'
import UserInnerList from '../InnerList/UserInnerList';
import { useNavigate } from 'react-router-dom';

function UserListItem(props){

    const [innerMode, setInnerModeInfo] = useState(false);
    const [add, setAdd] = useState("add");
    const navigate = useNavigate();

    const handleDeleteButtonClick = async () =>{
        const fetchDelete = async () =>{
            await axios.delete(`http://localhost:8080/flights/delete/${props.id}`,{
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            })
            .then((respone)=>{
                props.setNewData(respone.data);
            });
        }
        if (getToken(fetchDelete) == true){
            navigate("/login");
        }
    }

    const displayButtons = () => {
        const params = { 
            pathname: `/get-available-tickets/${props.departure}-${props.destination}/${props.id}`,
        };
        const upd = { 
            pathname: `/addexpinfo/${add}`,
        };
        return(
            <div className="pad">
                {props.flights_available > 0 ? <Link to={params} state={{ from: props.id, departure: props.departure, destination: props.destination}}>
                    <button type="button" className="btn btn-outline-dark deleteBtn btn-sm">More</button></Link> : null}
                {localStorage.getItem("roles").includes("ROLE_ADMIN") ? <Link to={upd} state={{ from: props.id }}>
                    <button type="button" className="btn btn-outline-dark deleteBtn btn-sm">Add</button></Link> : null}
                {localStorage.getItem("roles").includes("ROLE_ADMIN") ? <Link to="/change-employees-data" state={{ from: props.id, meth:"add" }}>
                    <button type="button" className="btn btn-outline-dark deleteBtn btn-sm">Change</button></Link> : null}
                {localStorage.getItem("roles").includes("ROLE_ADMIN") ? <button type="button" 
                className="btn btn-outline-dark deleteBtn btn-sm" onClick={() => {handleDeleteButtonClick()}}>Delete</button> : null}
            </div>
        )
    }

    return(
        <div className="border">
            <img src={props.file} style={{height:"100%", width:"250px"  }}/>
            <div style={{ display:"inline-block", marginLeft:"6%", verticalAlign:"middle"}}>
                <div>From : {props.departure}</div>
                <div>To : {props.destination}</div>
                <div>Flights available : {props.flights_available}</div>
            {innerMode ? null : displayButtons()}</div>
        </div>
    )
}

export {UserListItem};