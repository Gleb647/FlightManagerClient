import axios from "axios";
import jwt_decode from 'jwt-decode'



export const isExpired = () => {
    const exp = localStorage.getItem("exp");
    if (!exp) {
        return false;
    }
   return Date.now() > exp;
};

export const getToken = async (fetchRequest) =>{
    let redirect = false;
    const token = localStorage.getItem("access_token");
    if (!token){
        return null;
    }
    if (isExpired()){
        await axios.get('http://localhost:8080/token/refresh',
        {
            headers:{
           'Authorization': 'Bearer ' + localStorage.getItem('refresh_token')
        }})
        .then((response)=>{
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            localStorage.setItem("exp", response.data.exp);
            let decoded = jwt_decode(response.data.access_token);
            localStorage.setItem("roles", decoded.roles);
            console.log("Refreshing token");
            fetchRequest();
            return redirect;
        })
        .catch((error)=>{
            if (error.response.data.error_message.includes("The Token has expired")){
                redirect = true;
            }
        })
    }else{
        fetchRequest();
    }
}