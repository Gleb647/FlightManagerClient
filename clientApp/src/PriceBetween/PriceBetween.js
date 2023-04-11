import axios from "axios";
import { useEffect, useState } from "react";
import { UserListItem } from "../List/UserListItem";

function PriceBetween(props){

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [user, setUser] = useState([]);
    const [selectValue, setSelectValue] = useState("From..");
    const [param, setParam] = useState([]);

        useEffect(() =>{
            if (minPrice.length >= 1 && maxPrice.length >= 1){
                if (Number(minPrice) <= Number(maxPrice))
                setParam({
                    min: minPrice,
                    max: maxPrice,
                    pageNum: props.pageNum,
                    pageSize: props.pageSize
                })
            }else if (minPrice.length >= 1){
                setParam({
                    min: minPrice,
                    pageNum: props.pageNum,
                    pageSize: props.pageSize
                })
            }else if (maxPrice.length >= 1){
                setParam({
                    max: maxPrice,
                    pageNum: props.pageNum,
                    pageSize: props.pageSize
                })
            }else {
                props.sendGetReq();
            }
        }, [minPrice, maxPrice])

        useEffect(() =>{
            console.log("Param length: ");
            console.log(param.length);
            if (Object.keys(param).length> 0){
                fetchData();
            }
        }, [param])
    
        const fetchData = async () => {
            await axios
            .get(
                `http://localhost:8080/flightinfo/get-flight-info-between/${props.prodId}`, {
                    params: param
                })
            .then(response => {
                props.changeList(response.data);
                const headers = response.headers;
                const numOfFlight = Object.entries(headers).at(3)[1];
                return numOfFlight > props.pageSize ? props.searchPageCount(Math.floor(numOfFlight/props.pageSize)+1, false) : props.searchPageCount(1, false);
            });
        };


    return(
        <div>
            <div className="input-group" style={{margin:"10px"}}>
                <input className="form-control userFind form-control-sm-4" placeholder="Min cost" onChange={(event) => setMinPrice(event.target.value)}/>
                <input className="form-control userFind form-control-sm-4" placeholder="Max cost" onChange={(event) => setMaxPrice(event.target.value)}/>
                <span className="input-group-btn col-sm-8">
                </span>
            </div>
        </div>
    )
}

export default PriceBetween;