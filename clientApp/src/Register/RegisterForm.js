import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function RegisterForm(){

    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const PostUserInfo = async () =>{
        const MyUser = {
            name: name,
            username: login,
            password: password,
        }
        await axios.post('http://localhost:8080/signup', MyUser)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          }
          );    
          setName('');
          setLogin('');
          setPassword('');
    }

    return(
        <div className="ControlPanel">             
                <div className='addForm centered'>
                    <div id = "addFormCard" className='addFormInput' style = {{display: "block"}}>
                    <table>
                        <tbody>
                        <tr>
                            <div className="form-group row">
                            <label for="inputCompany3" className="col-sm-3.5 col-form-label">Name:</label>
                                <div className="col-sm-8">
                                    <input type="name" value={name} className="form-control" id="inputCompany3" name={name} onChange={(event) => setName(event.target.value)}/>
                                </div>
                            </div>
                        </tr>
                        <tr>
                            <div className="form-group row">
                            <label for="inputExp3" className="col-sm-3.5 col-form-label">Login:</label>
                                <div className="col-sm-8">
                                    <input type="name" value={login} className="form-control" id="inputExp3" name={login} onChange={(event) => setLogin(event.target.value)}/>
                                </div>
                            </div>
                        </tr>
                        <tr>
                            <div className="form-group row">
                            <label for="inputExp3" className="col-sm-3.5 col-form-label">Password:</label>
                                <div className="col-sm-8">
                                    <input type="password" value={password} className="form-control" id="inputExp3" name={password} onChange={(event) => setPassword(event.target.value) }/>
                                </div>
                            </div>
                        </tr>
                        <tr>
                            <td>
                            <Link to="/login"><input className="btn btn-info cent" type="button" value="Post" onClick={() => PostUserInfo()}/></Link>             
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>  
    )
}