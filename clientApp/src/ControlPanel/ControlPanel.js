import React, {useState, useEffect, useCallback} from 'react';
import ReactDOM from 'react-dom';
import '../App.css'
import axios from 'axios';
import 'react-dropzone-uploader/dist/styles.css'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {isExpired, getToken} from '../Utils.js/CheckToken'
import { useNavigate } from 'react-router-dom';



const ControlPanel = (props) => {

    const [inputFormDisplay, setInputFormDisplay] = useState('none');
    const [fromInput, setFromInput] = useState('');
    const [toInput, setToInput] = useState('');
    const [node, setNode] = useState(false);
    const [blank, setBlank] = useState(false);
    const [validationError, setValidationError] = useState(false);
    const [fileInput, setFileInput] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const nodeIsAlreadyExist = () =>{
        setNode(true);
    }
    
    const resetAllMessages = () =>{
        setNode(false);
        setBlank(false);
        setValidationError(false);
    }

    const setBlankState = () =>{
        setBlank(true);
    }

    const AddUserRequest = async () => {
        setInputFormDisplay('block');
        if (getToken() == true){
            navigate("/login");
        }

        const headers = {
            //'Content-type': 'application/json',
            "content-type": "multipart/form-data",
            // "content-length": `${fileInput.size}`,
            "Authorization": "Bearer " + localStorage.getItem('access_token'),
             
        }

        let formData = new FormData();
        formData.append("file", fileInput);
        formData.append("departure", fromInput);
        formData.append("destination", toInput);

        await axios.post('http://localhost:8080/flights/add', formData, {
            headers: headers
        })
          .then(function (response) {
            console.log(response);
            navigate("/getflights");
          })
          .catch(function (error) {
            console.log("Such node is already exist");
            nodeIsAlreadyExist();
          }
          );
          //console.log("Bearer " + localStorage.getItem('access_token'));
          console.log(formData);
        setFromInput('');
        setToInput('');
        //setFileInput('');
        props.setTrueUpdateState();
    }

    const putUserRequest = async () =>{
        if (getToken() == true){
            navigate("/login");
        }
        const headers = {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
        const Way = {
            departure: fromInput,
            destination: toInput,
        }
        await axios.put(`http://localhost:8080/flights/change/${location.state.from}`,Way,{
            headers: headers
        }).then(() =>{
            navigate("/getflights");
        }).catch(() =>{
            console.log("Such node is already exist");
            nodeIsAlreadyExist();
        });
        setFromInput('');
        setToInput('');
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
        toInput.length == 0 || fromInput.length == 0 ? setBlankState() : (!/^[A-Z]+$/i.test(toInput) || !/^[A-Z]+$/i.test(fromInput)) ? 
            setValidationError(true):location.state == null ? AddUserRequest() : putUserRequest();
        setToInput("");
        setFromInput("");
    }

    function handleFileChange(event) {
        console.log(event.target.files[0]);
        setFileInput(event.target.files[0]);
        //resetAllMessages();
    }

    return(
            <div className="ControlPanel">             
                <div className='addForm centered'>
                    <div id = "addFormCard" className='addFormInput' style = {{display: "block"}}>
                    <table>
                        <tbody>
                            <tr>
                                <div className="form-group row">
                                <label for="inputCompany3" className="col-sm-3.5 col-form-label">From:</label>
                                    <div className="col-sm-8">
                                        <input type="name" value={fromInput} className="form-control" name={fromInput} 
                                        onChange={(event) => {setFromInput(event.target.value); resetAllMessages()}}/>
                                    </div>
                                </div>
                            </tr>
                            <tr>
                                <div className="form-group row">
                                <label for="inputCompany3" className="col-sm-3.5 col-form-label">To:</label>
                                    <div className="col-sm-8">
                                        <input type="name" value={toInput} className="form-control" name={toInput} 
                                        onChange={(event) => {setToInput(event.target.value); resetAllMessages()}}/>
                                    </div>
                                </div>
                            </tr>
                            <tr>
                                <div className="form-group row">
                                <label for="inputCompany3" className="col-sm-3.5 col-form-label">Destination picture:</label>
                                    <div className="col-sm-8">
                                        <input type="file"  className="form-control" name={fileInput} 
                                        onChange={handleFileChange}/>
                                    </div>
                                </div>
                            </tr>
                            {node ? returnInfoAboutAuth("Node is already exist") : null}
                            {validationError ? returnInfoAboutAuth("Can't contain digits") : null}
                            {blank ? returnInfoAboutAuth("Fill in all the fields") : null}
                            <tr>
                                <td>
                                <input className="btn btn-info cent" type="button" value="Post" onClick={ () =>{checkWay()}}/>          
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>          
    )
}

export default ControlPanel;