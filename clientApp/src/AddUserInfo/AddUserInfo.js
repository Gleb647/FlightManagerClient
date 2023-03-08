import "../App.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios";
import { useLocation } from "react-router-dom";

const AddUserInfo = (props) =>{

    const [carrier, setCarrierInput] = useState('');
    const [duration, setDurationInput] = useState('');
    const [cost, setCostInput] = useState('');
    const [date, setDateInput] = useState('');
    const location = useLocation();

    const PostUserInfo = async () =>{
        const Info = {
            carrier: carrier,
            flightDuration: duration,
            cost: cost,
            date: date
        }
        await axios.post(`http://localhost:8080/flightinfo/${location.state.from}`, Info)
        .then(() =>{
            props.setTrueUpdateState();
        });
        
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
                                    <input type="name" value={carrier} className="form-control" id="inputCompany3" name={carrier} onChange={(event) => setCarrierInput(event.target.value)}/>
                                </div>
                            </div>
                        </tr>

                        <tr>
                            <div className="form-group row">
                            <label for="inputExp3" className="col-sm-3.5 col-form-label">Flight duration:</label>
                                <div className="col-sm-8">
                                    <input type="name" value={duration} className="form-control" id="inputExp3" name={duration} onChange={(event) => setDurationInput(event.target.value)}/>
                                </div>
                            </div>
                        </tr>

                        <tr>
                            <div className="form-group row">
                            <label for="inputExp3" className="col-sm-3.5 col-form-label">Ticket price:</label>
                                <div className="col-sm-8">
                                    <input type="name" value={cost} className="form-control" id="inputExp3" name={cost} onChange={(event) => setCostInput(event.target.value)}/>
                                </div>
                            </div>
                        </tr>

                        <tr>
                            <div className="form-group row">
                            <label for="inputExp3" className="col-sm-3.5 col-form-label">Departure date:</label>
                                <div className="col-sm-8">
                                    <input type="name" value={date} className="form-control" id="inputExp3" name={date} onChange={(event) => setDateInput(event.target.value)}/>
                                </div>
                            </div>
                        </tr>
                        <tr>
                            <td>
                            <Link to="/getflights"><input className="btn btn-info cent" type="button" value="Post" onClick={() => PostUserInfo()}/></Link>             
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