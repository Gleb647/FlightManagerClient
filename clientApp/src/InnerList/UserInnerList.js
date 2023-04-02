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
    const [get, setGet] = useState(false);
    const params = useParams();

    const sendGetReq = () =>{
        setGet(!get);
    }

    const getUserExpInfo = async () =>{
        const prodId = params.id;
        await axios.get(`http://localhost:8080/flightinfo/get/${prodId}`)
            .then(res => {
                setListInfo(res.data);
            }
        )
    }

    useEffect(() =>{
        getUserExpInfo();
    }, [get])

    useEffect(()=>{
        if (list.length > 0){
            displayListItem();
        }
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
                        flightDuration={items.flightDuration} cost={items.cost} date={items.date} sendGetReq={sendGetReq}/>
                )
            })}
            </>
        );
    }   

  return(
    <div className="tableDiv">
        <PriceBetween changeList={changeList} prodId={params.id} sendGetReq={sendGetReq}/>
        <div>
            {displayListItem()}
        </div>
    </div>
  )
}

export default UserInnerList;