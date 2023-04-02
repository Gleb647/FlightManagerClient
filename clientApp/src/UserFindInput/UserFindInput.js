import axios from "axios";
import { useEffect, useState } from "react";
import { UserListItem } from "../List/UserListItem";

function UserFindInput(props){

    const [name, setName] = useState("");
    const [user, setUser] = useState([]);
    const [nameModified, setNameModified] = useState(false);
    const [selectValue, setSelectValue] = useState("From..");


    useEffect(() => {
        let reqParam = {};
        if (selectValue == "To.."){
            reqParam = {
                destination: name
            }
        }else{
            reqParam = {
                departure: name
            }
        }
        const fetchData = async () => {
            if (name.length > 0){
                await axios
                .get(
                    'http://localhost:8080/flights/get', {
                        params: reqParam
                    })
                .then(response => {
                    props.updateFlightInfoById(response.data);
                });
            }else if (nameModified){
                props.fetchData();
            }
        };
        fetchData();    
    }, [name]);

    return(
        <div>
            <div className="input-group" style={{marginBottom:"10px"}}>
                <input className="form-control userFind form-control-sm-4" placeholder={selectValue} onChange={(event) => {
                    setName(event.target.value);
                    setNameModified(true)}}/>
                <span className="input-group-btn col-sm-8">
                <select className="btn btn-info btn-height" value={selectValue} onChange={(event) => setSelectValue(event.target.value)}>
                    <option value="From..">From</option>
                    <option value="To..">To</option>
                </select>
                </span>
            </div>
            <div>
            </div>
        </div>
    )
}

export default UserFindInput;