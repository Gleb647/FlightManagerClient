import "../App.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../Utils.js/CheckToken";

const AddUserInfo = (props) =>{

    const [carrier, setCarrierInput] = useState('');
    const [duration, setDurationInput] = useState('');
    const [cost, setCostInput] = useState('');
    const [date, setDateInput] = useState('');
    const [blank, setBlank] = useState(false);
    const [node, setNode] = useState(false);
    const [characterValidationStatus, setCharacterValidationStatus] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const resetAllStates =() =>{
        setCharacterValidationStatus(false);
        setBlank(false);
        setNode(false);
    }

    const postUserInfo = () =>{
        const fetchPostFlightInfo = async () =>{
            const headers = {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
            const Info = {
                carrier: carrier,
                flightDuration: duration,
                cost: cost,
                date: date
            }
            await axios.post(`http://localhost:8080/flightinfo/${location.state.from}`, Info, {
                headers: headers
            })
            .then(() =>{
                navigate("/getflights");
            });
        }
        if (getToken(fetchPostFlightInfo) == true){
            navigate("/login");
        }
    }

    const putUserRequest = () =>{
        const fetchPutFlightInfo = async () =>{
            const headers = {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
            const Info = {
                carrier: carrier,
                flightDuration: duration,
                cost: cost,
                date: date
            }
            await axios.put(`http://localhost:8080/flightinfo/change/${location.state.from}`, Info, {
                headers: headers
            })
            .then(() =>{
                navigate("/getflights");
            }).catch(() =>{
                console.log("Such node is already exist");
                setNode(true);
            });
        }

        if (getToken(fetchPutFlightInfo) == true){
            navigate("/login");
        }
    }

    const returnInfoAboutAuth = (str) =>{
        return(
            <tr>
                <td className = "credentials">
                    <div className="wrong_cred">
                        <p><span class="wrong_cred">{str}</span></p>
                    </div>
                </td>
            </tr>
        )
    }

    const checkWay = () =>{
        duration.length == 0 || cost.length == 0 || carrier.length == 0 || date.length == 0 ? 
            setBlank(true) : (!/^[0-9]+$/i.test(duration) || !/^[0-9]+$/i.test(cost)) ? 
            setCharacterValidationStatus(true) : location.state.meth == null ? postUserInfo() : putUserRequest();
        console.log(location.state);
        setCarrierInput("");
        setCostInput("");
        setDurationInput("");
        setDateInput("");
    }

    return (
        <div className="ControlPanel">             
            <div className='addForm centered'>
                <div id = "addFormCard" className='addFormInput' style = {{display: "block"}}>
                    <table>
                        <tbody>
                            <tr>
                                <div className="form-group row">
                                <label for="inputCompany3" className="col-sm-3.5 col-form-label">Carrier company:</label>
                                    <div className="col-sm-8">
                                        <input type="name" value={carrier} className="form-control" id="inputCompany3" name={carrier} 
                                        onChange={(event) => {setCarrierInput(event.target.value); resetAllStates()}}/>
                                    </div>
                                </div>
                            </tr>

                            <tr>
                                <div className="form-group row">
                                <label for="inputExp3" className="col-sm-3.5 col-form-label">Flight duration:</label>
                                    <div className="col-sm-8">
                                        <input type="name" value={duration} className="form-control" id="inputExp3" name={duration} 
                                        onChange={(event) => {setDurationInput(event.target.value); resetAllStates()}}/>
                                    </div>
                                </div>
                            </tr>

                            <tr>
                                <div className="form-group row">
                                <label for="inputExp3" className="col-sm-3.5 col-form-label">Ticket price:</label>
                                    <div className="col-sm-8">
                                        <input type="name" value={cost} className="form-control" id="inputExp3" name={cost} 
                                        onChange={(event) => {setCostInput(event.target.value); resetAllStates()}}/>
                                    </div>
                                </div>
                            </tr>

                            <tr>
                                <div className="form-group row">
                                <label for="inputExp3" className="col-sm-3.5 col-form-label">Departure date:</label>
                                    <div className="col-sm-8">
                                        <input type="name" value={date} className="form-control" id="inputExp3" name={date} 
                                        onChange={(event) => {setDateInput(event.target.value); resetAllStates()}}/>
                                    </div>
                                </div>
                            </tr>
                            {node ? returnInfoAboutAuth("Node is already exist") : null}
                            {blank ? returnInfoAboutAuth("Fill in all the fields") : null}
                            {characterValidationStatus ? returnInfoAboutAuth("Can't contain characters") : null}
                            <tr>
                                <td>
                                    <input className="btn btn-info cent" type="button" value="Post" onClick={() => checkWay()}/>       
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

export default AddUserInfo;