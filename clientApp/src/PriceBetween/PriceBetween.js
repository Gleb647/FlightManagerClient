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
                    max: maxPrice
                })
                fetchData();
            }else if (minPrice.length >= 1){
                setParam({
                    min: minPrice,
                })
                fetchData();
            }else if (maxPrice.length >= 1){
                setParam({
                    max: maxPrice,
                })
                fetchData();
            }else {
                props.sendGetReq();
            }
        }, [minPrice, maxPrice])
    
        const fetchData = async () => {
            await axios
            .get(
                `http://localhost:8080/flightinfo/get-flight-info-between/${props.prodId}`, {
                    params: param
                })
            .then(response => {
                props.changeList(response.data);
            });
        };


    return(
        <div>
            <div className="input-group">
                <input className="form-control userFind form-control-sm-4" placeholder="Min cost" onChange={(event) => setMinPrice(event.target.value)}/>
                <input className="form-control userFind form-control-sm-4" placeholder="Max cost" onChange={(event) => setMaxPrice(event.target.value)}/>
                <span className="input-group-btn col-sm-8">
                </span>
            </div>
        </div>
    )
}

export default PriceBetween;