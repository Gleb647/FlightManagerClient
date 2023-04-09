import './Tabs.css'
import { Link } from 'react-router-dom';
import '../App.css'


export default function TabPanel(props) {

  return(
    <div className="tabs">
      <div className="tab">
        {localStorage.getItem("roles") == null? localStorage.setItem("roles", "") : null}
        {localStorage.getItem("roles").includes("ROLE_ADMIN") ? <Link to="/add-flight" className="tablinks"><button type="button">Add flight</button></Link> : null}
        <Link to="/getflights" className="tablinks"><button type="button">Get flights</button></Link>
      </div>
    </div>
  )
}