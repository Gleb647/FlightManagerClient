import "../App.css"
import {UserListItem} from './UserListItem'
import axios from 'axios';
import  React,{ Component, useState, useEffect } from 'react';
import UserFindInput from "../UserFindInput/UserFindInput";
import { isExpired, getToken } from '../Utils.js/CheckToken'
import { Navigate, useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import {Pagination} from '../Pagination/Pagination'

const UserList = (props) =>{

    const [update, setUpdate] = useState({...props.update});
    const [data, setData] = useState([]);
    const [updateValue, setUpdateValue] = useState(false);
    const [pageNum, setPageNum] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const [pageCount, setPageCount] = useState(1);
    const [innerMode, setInnerMode] = useState(false);
    const [rerender, setRerender] = useState(false);
    const navigate = useNavigate();


    const changeUpdate = () =>{
        setUpdate(!update);
    }

    const changeUpdateValue = () =>{
        setUpdateValue(!updateValue);
    }

    const setNewData = (lst) =>{
        setData(lst);
    }

    const decreasePageCount = (dec) =>{
        setPageCount(dec);
        setPageNum(0);
    }

    const changePageNum = (num) =>{
        setPageNum(num);
    }

    const changeInnerMode = (stat) =>{
        return innerMode == true ? (setInnerMode(stat), setPageNum(0)) : setInnerMode(stat);
    }

    useEffect(() => {
        setUpdate(props.update);
    }, [props.update])

    const updateFlightInfoById = (node) =>{
        setData(node.sort((a,b) => a.id-b.id));
        changeUpdateValue();
    }

    const fetchData = async () => {
        console.log("FETCHING BASE");
        const params = {
            pageNum: pageNum,
            pageSize: pageSize
        }
        await axios(
            'http://localhost:8080/flights/get', {params},
        ).then(response => {
            changeInnerMode(false);
            setData(response.data);
            const headers = response.headers;
            const numOfFlight = Object.entries(headers).at(3)[1];
            numOfFlight > pageSize ? setPageCount(Math.floor(numOfFlight/pageSize)+1) : setPageCount(1);
        });
    };

    useEffect(()=>{
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
        console.log("INNER MODE: " + innerMode);
        if (innerMode != true){
            chechkExp();
            fetchData();
        }
    }, [pageNum])

    const displayListItem = () =>{
        return(
            <>
                {data.map(items=>{
                    return (             
                        <UserListItem loggedIn={props.loggedIn} roles={props.roles} className='UsersTable' changeUpdate={changeUpdate} key={items.flight.id} 
                        id={items.flight.id} departure={items.flight.departure} destination={items.flight.destination} setPageCount={setPageCount}
                        flights_available={items.flight.flightsAvailable} file={"data:image/png;base64,"+items.file} setNewData={setNewData}
                        decreasePageCount={decreasePageCount} pageSize={pageSize}/>
                    );
                })}
            </>
        )
    }

  return(
    <div className="tableDiv">
        <UserFindInput updateFlightInfoById={updateFlightInfoById} fetchData={fetchData}
            changeUpdateValue={changeUpdateValue} pageNum={pageNum} pageSize={pageSize} pageCount={pageCount}
            decreasePageCount={decreasePageCount} changeInnerMode={changeInnerMode}/>
        {displayListItem()}
        {pageCount < 2 ? null : <Pagination
            postsPerPage={pageSize}
            pageCount={pageCount}
            paginate={changePageNum}/>}
    </div>
  )
}

export default UserList;