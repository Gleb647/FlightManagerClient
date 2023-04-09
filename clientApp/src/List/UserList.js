import "../App.css"
import {UserListItem} from './UserListItem'
import axios from 'axios';
import  React,{ Component, useState, useEffect } from 'react';
import UserFindInput from "../UserFindInput/UserFindInput";
import { isExpired, getToken } from '../Utils.js/CheckToken'
import { Navigate, useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';

const UserList = (props) =>{

    const [update, setUpdate] = useState({...props.update});
    const [data, setData] = useState([]);
    const [updateValue, setUpdateValue] = useState(false);
    const [pageNum, setPageNum] = useState(0);
    const [pageSize, setPageSize] = useState(6);
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

    useEffect(() => {
        setUpdate(props.update);
    }, [props.update])

    const updateFlightInfoById = (node) =>{
        setData(node.sort((a,b) => a.id-b.id));
        changeUpdateValue();
    }

    // const updatePageNum = () =>{
    //     setPageNum(++pageNum);
    //     fetchData();
    // }

    const fetchData = async () => {
        const params = {
            pageNum: pageNum,
            pageSize: "6"
        }
        await axios(
            'http://localhost:8080/flights/get', {params},
        ).then(response => {
            setData(response.data);
        });
    };

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
        chechkExp();
        fetchData();
    }, []);

    const displayListItem = () =>{
        return(
            <>
                {data.map(items=>{
                    return (             
                        <UserListItem loggedIn={props.loggedIn} roles={props.roles} className='UsersTable' changeUpdate={changeUpdate} key={items.flight.id} 
                        id={items.flight.id} departure={items.flight.departure} destination={items.flight.destination} 
                        flights_available={items.flight.flightsAvailable} file={"data:image/png;base64,"+items.file} setNewData={setNewData}/>
                    );
                })}
            </>
        )
    }

    function handlePageClick ({selected: selectedpage}) {  
        setPageNum(selectedpage);  
        fetchData();
    }  

  return(
    <div className="tableDiv">
        <UserFindInput updateFlightInfoById={updateFlightInfoById} fetchData={fetchData}
            changeUpdateValue={changeUpdateValue}/>
        {displayListItem()}
        <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={6}
        pageCount={2}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default UserList;