import "../App.css"
import {UserListInnerItem} from './UserListInnerItem'
import axios from 'axios';
import  React,{ Component, useState, useEffect } from 'react';
import UserFindInput from "../UserFindInput/UserFindInput";
import { isExpired, getToken } from '../Utils.js/CheckToken'
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { UserListItem } from "../List/UserListItem";
import PriceBetween from "../PriceBetween/PriceBetween";

const UserInnerList = (props) =>{

    const [list, setListInfo] = useState([[]]);
    const params = useParams();

    useEffect(() =>{
        const getUserExpInfo = async () =>{
            const prodId = params.id;
            await axios.get(`http://localhost:8080/flightinfo/get/${prodId}`)
                .then(res => {
                    setListInfo(res.data);
                })
            }
        getUserExpInfo();
        props.setTrueUpdateState();
    }, [])

    useEffect(()=>{
        displayListItem();
    }, [list])

    const changeList = (lst) =>{
        setListInfo(lst);
    }

    const displayListItem = () =>{
        return(
            <>              
            {list.map((items) =>{
                return(
                    <UserListInnerItem className='UsersTable' key={items.id}  id={items.id} carrier={items.carrier} 
                        flightDuration={items.flightDuration} cost={items.cost} date={items.date}/>
                )
            })}
            </>
        );
    }   

  return(
    <div>
        <PriceBetween changeList={changeList} prodId={params.id}/>
        <table className="table table-striped">
            <tbody>
                <tr className="setTextMid">
                    <th scope="col">Carrier</th>
                    <th scope="col">Flight duration</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Cost</th>
                    <th scope="col"></th>
                </tr>
                {displayListItem()}
            </tbody>
        </table>
    </div>
  )
}

export default UserInnerList;