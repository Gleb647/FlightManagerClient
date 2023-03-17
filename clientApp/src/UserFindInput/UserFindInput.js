import axios from "axios";
import { useEffect, useState } from "react";
import { UserListItem } from "../List/UserListItem";

function UserFindInput(props){

    const [name, setName] = useState("");
    const [user, setUser] = useState([]);
    const [selectValue, setSelectValue] = useState("From..");

    useEffect(() => {
        props.changeUserFindName(name);
    }, [name])

    useEffect(() => {
        props.changeUserFindParam(selectValue);
    }, [selectValue])
    
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
                await axios
                .get(
                    'http://localhost:8080/flights/get', {
                        params: reqParam
                    })
                .then(response => {
                    setUser(response.data);
                    //user.map(item => props.updateFlightInfoById(item));
                    props.updateFlightInfoById(response.data);
                    //props.changeUpdateValue();
                });
                };
                fetchData();
        }, [name]);

    return(
        <div>
            <div className="input-group">
                <input className="form-control userFind form-control-sm-4" placeholder={selectValue} onChange={(event) => setName(event.target.value)}/>
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