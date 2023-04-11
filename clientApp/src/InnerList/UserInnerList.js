import "../App.css"
import {UserListInnerItem} from './UserListInnerItem'
import axios from 'axios';
import  React,{ Component, useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import PriceBetween from "../PriceBetween/PriceBetween";
import { Pagination } from "../Pagination/Pagination";
import { isExpired, getToken } from "../Utils.js/CheckToken";

const UserInnerList = (props) =>{

    const [list, setListInfo] = useState([[]]);
    const [get, setGet] = useState(false);
    const [pageNum, setPageNum] = useState(0);
    const [pageSize, setPageSize] = useState(3);
    const [pageCount, setPageCount] = useState(1);
    const [innerMode, setInnerMode] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    const sendGetReq = () =>{
        setPageNum(0);
        setGet(!get);
    }

    const searchPageCount = (dec, del) =>{
        setPageCount(dec);
        setPageNum(0);
        if (del == true){
            getUserExpInfo();
        }
    }

    const getUserExpInfo = async () =>{
        const obj = {
            pageNum: pageNum,
            pageSize: pageSize
        }
        const prodId = params.id;
        await axios.get(`http://localhost:8080/flightinfo/get/${prodId}`, 
        { params: 
            { pageNum: pageNum,
            pageSize: pageSize }})
            .then(res => {
                setListInfo(res.data);
                const headers = res.headers;
                const numOfFlight = Object.entries(headers).at(3)[1];
                numOfFlight > pageSize ? setPageCount(Math.floor(numOfFlight/pageSize)+1) : setPageCount(1);
            }
        )
    }

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
        if (innerMode != true){
            chechkExp();
            getUserExpInfo();
        }
    }, [pageNum, get])

    const changePageNum = (num) =>{
        setPageNum(num);
    }


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
                        flightDuration={items.flightDuration} cost={items.cost} date={items.date} sendGetReq={sendGetReq}
                        searchPageCount={searchPageCount} pageSize={pageSize}/>
                )
            })}
            </>
        );
    }   

  return(
    <div className="tableDiv">
        <PriceBetween changeList={changeList} prodId={params.id} sendGetReq={sendGetReq} pageNum={pageNum} pageSize={pageSize} 
            searchPageCount={searchPageCount}/>
        <div>
            {displayListItem()}
        </div>
        {pageCount < 2 ? null : <Pagination
            postsPerPage={pageSize}
            pageCount={pageCount}
            paginate={changePageNum}/>}
        
    </div>
  )
}

export default UserInnerList;