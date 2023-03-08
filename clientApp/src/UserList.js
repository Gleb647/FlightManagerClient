import "./App.css"
import {UserListItem} from './UserListItem'
import axios from 'axios';
import  React,{ Component, useState, useEffect } from 'react';
import UserFindInput from "./UserFindInput/UserFindInput";
import { isExpired, getToken } from './Utils.js/CheckToken'
import { Navigate, useNavigate } from "react-router-dom";

const UserList = (props) =>{

    const [update, setUpdate] = useState({...props.update});
    const [data, setData] = useState([]);
    const [userFindParam, setUserFindParam] = useState("");
    const [userFindName, setUserFindName] = useState("");
    const navigate = useNavigate();


    const changeUpdate = () =>{
        setUpdate(!update);
    }

    React.useEffect(() => {
        setUpdate(props.update);
    }, [props.update])

    useEffect(() => {
        const chechkExp = async() =>{
            if (isExpired()){
                await getToken().then(response =>{
                    if (response){
                        props.changeLoggedInState(false);
                        navigate("/login");
                    }
                });
            }                
        }
        const fetchData = async () => {
            await axios(
                'http://localhost:8080/flights/get',
            ).then(response => {
                setData(response.data);
            });
        };
        chechkExp();
        fetchData();
    }, [update]);

    const changeUserFindName = (name) =>{
        setUserFindName(name);
    }

    const changeUserFindParam = (param) =>{
        setUserFindParam(param);
    }

    const displayListItem = () =>{
        return(
            <>
                {data.filter(items => items.departure === userFindName).length > 0 && userFindParam === "From.." ||
                data.filter(items => items.destination === userFindName).length > 0 && userFindParam === "To.." ?
                userFindParam === "From.." ? data.filter(items => items.departure === userFindName).map(items=>{
                    return (             
                        <UserListItem loggedIn={props.loggedIn} roles={props.roles} className='UsersTable' changeUpdate={changeUpdate} key={items.id} 
                        id={items.id} departure={items.departure} destination={items.destination} flights_available={items.flightsAvailable}/>
                    );
                }) : data.filter(items => items.destination === userFindName).map(items=>{
                    return (             
                        <UserListItem loggedIn={props.loggedIn} roles={props.roles} className='UsersTable' changeUpdate={changeUpdate} key={items.id} 
                        id={items.id} departure={items.departure} destination={items.destination} flights_available={items.flightsAvailable}/>
                    );
                }) : data.map(items =>{
                    return (             
                        <UserListItem loggedIn={props.loggedIn} roles={props.roles} className='UsersTable' changeUpdate={changeUpdate} key={items.id} 
                        id={items.id} departure={items.departure} destination={items.destination} flights_available={items.flightsAvailable}/>
                    );
                })}
            </>
        )
    }

  return(
    <div>
        <UserFindInput changeUserFindName={changeUserFindName} changeUserFindParam={changeUserFindParam}/>
            <table className="table table-striped">
                <tbody>
                    <tr className="setTextMid">
                        <th scope="custom_width">Departure</th>
                        <th scope="custom_width">Destination</th>
                        <th scope="custom_width">Flights available</th>
                        <th scope="custom_width"></th>
                    </tr>
                    {displayListItem()}
                </tbody>
            </table>
        </div>
  )
}

export default UserList;