import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { isExpired, getToken } from '../Utils.js/CheckToken'
import { useParams } from 'react-router-dom';

function UserListInnerItem(props){

    const [string, setString] = useState(props.date == null ? "---" : props.date);
    const params = useParams();
    const navigate = useNavigate();

    const parseDate = () =>{
        const date = string.split(" ").at(0); 
        const ms = date.split("-");
        return ms.at(2) + "-" + ms.at(1) + "-"+ms.at(0);
    }

    const buyTicket = async () =>{
        const userName = localStorage.getItem("user");
        let config = {
            headers: {'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                },
            params: {
                username: userName 
            },
        }

        await axios.get(`http://localhost:8080/buy-ticket/${props.id}`, config)
        .then(() =>{
            console.log("Ticket succesfully bought");
        })
        .catch(()=>{
            navigate("/login")
        })
    }

    const handleDeleteButtonClick = async () =>{
        if (isExpired()){
            await getToken();
        }
        await axios.delete(`http://localhost:8080/flightinfo/delete/${props.id}`,{
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then(()=>{
            navigate("/getflights");
        });
    }

    return(
        <div className="setTextMid listItem">  
            <div style={{float:"left", display:"inline-block", paddingLeft:"8%", marginTop:"4%"}}>      
            <div style={{fontSize:"24px"}}>{parseDate()}</div>
            <div style={{fontSize:"14px"}}>{string.split(" ").at(1)}</div>
            </div>
            <div style={{float:"left", display:"inline", paddingLeft:"10%",paddingTop:"10px", height:"100%"}}>
                <img src={require('../static/fl.png')} />   
            </div> 
            <div style={{float:"left", display:"inline-block", marginTop:"8px"}}>     
                <div>
                    <div style={{textAlign:"left"}}>{params.departure}</div> 
                    <div style={{height:"88px", paddingTop:"31px", fontSize:"14px"}}>{props.flightDuration} hours</div>
                    <div style={{textAlign:"left"}}>{params.destination}</div> 
                </div> 
            </div>
            <div className="setTextMid" style={{display:"inline-block", marginTop:"62px"}}>
                {props.carrier}
            </div>
            <div className="innerInfoDiv">
                <div className="setTextMid"> 
                    <p style={{fontSize:"23px", marginLeft:"5px", marginTop:"3%"}}>{props.cost}$</p>
                </div>
                <div>
                    {localStorage.getItem("roles").includes("ROLE_ADMIN") ? null : 
                        <button type="button" className="btn btn-outline-dark  btn-sm" onClick={()=>{buyTicket()}}>Buy ticket</button>}
                    {localStorage.getItem("roles").includes("ROLE_ADMIN") ? <Link to="/addexpinfo/change" state={{ from: props.id, meth:"put"}}>
                        <button type="button" className="btn btn-outline-dark btn-sm">Change</button></Link> : null}
                    {localStorage.getItem("roles").includes("ROLE_ADMIN") ? <button type="button" 
                        className="btn btn-outline-dark  btn-sm" style={{marginLeft:"5px"}} onClick={() => {handleDeleteButtonClick()}}>Delete</button> : null}
                </div>              
            </div>
        </div>
    )
}

export {UserListInnerItem};