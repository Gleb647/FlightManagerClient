import axios from "axios";
import { useEffect, useState } from "react";
import { UserListItem } from "../UserListItem";

function PriceBetween(props){

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [user, setUser] = useState([]);
    const [selectValue, setSelectValue] = useState("From..");
    const [param, setParam] = useState({min: "0"});

        useEffect(() =>{
            if (minPrice.length >= 1 && maxPrice.length >= 1){
                if (Number(minPrice) <= Number(maxPrice))
                setParam({
                    min: minPrice,
                    max: maxPrice
                })
            }else if (minPrice.length >= 1){
                setParam({
                    min: minPrice,
                })
            }else if (maxPrice.length >= 1){
                setParam({
                    max: maxPrice,
                })
            }else {
                setParam({
                    min: 0,
                })
            }
        }, [minPrice, maxPrice])
    
        useEffect(() => {
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
                fetchData();
        }, [param]);

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