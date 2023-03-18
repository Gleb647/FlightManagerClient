import axios from "axios";
import { Link, Navigate, Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { useLocation } from "react-router-dom";



export default function LoginForm(props){

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [wrongCredentials, setWrongCredentials] = useState(false);
    const navigate = useNavigate();

    const addWrongCredentials = () =>{
        setWrongCredentials(true);
    }

    const removeWrongCredentials = () =>{
        setWrongCredentials(false);
    }

    const PostUserInfo = async () =>{
        var qs = require('qs');
        const credentials = {
            username: login,
            password: password,
        }
        await axios.post('http://localhost:8080/login', qs.stringify(credentials))
          .then((response) => {
            props.changeLoggedInState(true);
            console.log(response.data.access_token);
            localStorage.setItem("user", login);
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            localStorage.setItem("exp", response.data.exp);
            let decoded = jwt_decode(response.data.access_token);
            localStorage.setItem("roles", decoded.roles);
            navigate("/getflights");         
          })
          .catch((error) => {
            console.log("Wrong credentials");
            addWrongCredentials();
          }
          );    
        setLogin('');
        setPassword('');
    }

    const returnInfoAboutAuth = (str) =>{
        return(
            <div className="wrong_cred">
                <p><span class="wrong_cred">{str}</span></p>
            </div>
        )
    }


    return(
        <div className="ControlPanel">             
                <div className='addForm centered'>
                    <div id = "addFormCard" className='addFormInput' style = {{display: "block"}}>
                        <table>
                            <tbody>
                            <tr>
                                <div className="form-group row">
                                <label for="inputExp3" className="col-sm-3.5 col-form-label">Login:</label>
                                    <div className="col-sm-8">
                                        <input type="name" value={login} className="form-control" id="inputExp3" name={login} 
                                        onChange={(event) => {setLogin(event.target.value);removeWrongCredentials()}}/>
                                    </div>
                                </div>
                            </tr>
                            <tr>
                                <div className="form-group row">
                                <label for="inputExp3" className="col-sm-3.5 col-form-label">Password:</label>
                                    <div className="col-sm-8">
                                        <input type="password" value={password} className="form-control" id="inputExp3" name={password} 
                                        onChange={(event) => {setPassword(event.target.value);removeWrongCredentials()}}/>
                                    </div>
                                </div>
                            </tr>
                            <tr>
                                <td className = "credentials">
                                    {wrongCredentials == true ? returnInfoAboutAuth("Wrong credentials") : null}  
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <input className="btn btn-info cent" type="button" value="Post" onClick={() => PostUserInfo()}/>          
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>  
    )
}