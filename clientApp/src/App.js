import './App.css';
import { Component } from 'react';
import ControlPanel from './ControlPanel/ControlPanel';
import UserList from './List/UserList';
import UserFindInput from './UserFindInput/UserFindInput';
import UserListInnerItem from './InnerList/UserListInnerItem';
import ButtonAppBar from './Header/ButtonAppBar';
import { Link, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AddUserInfo from './AddUserInfo/AddUserInfo';
import RegisterForm from './Register/RegisterForm';
import LoginForm from './Login/LoginForm';
import { isExpired } from './Utils.js/CheckToken';
import UserInnerList from './InnerList/UserInnerList';

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      update: false,
      loggedIn: !isExpired(),
    }
  }

  setTrueUpdateState = () =>{
    this.setState({
      update: !this.state.update
    })
  }

  setFalseUpdateState = () =>{
    this.setState({
      update: false
    })
  }

  changeLoggedInState = (logstate) =>{
    this.setState({
      loggedIn: logstate
    })
  }

  render(){
    const style1 = {flexDirection:'row', alignItems:'center', justifyContent:'center'}
    return (
      <div className="App">
          <ButtonAppBar loggedIn={this.state.loggedIn} changeLoggedInState={this.changeLoggedInState}></ButtonAppBar>
          <Routes>
            <Route path="/" element={<UserList update={this.state.update}/>}/>
            <Route path="/signup" element={<RegisterForm/>}/>
            <Route path="/login/*" loggedIn={this.state.loggedIn} element={<LoginForm changeLoggedInState={this.changeLoggedInState} />}/>
            <Route path="/add-flight" element={<ControlPanel update={this.state.update} setTrueUpdateState={this.setTrueUpdateState}/>} />
            <Route path="/change-employees-data" element={<ControlPanel setTrueUpdateState={this.setTrueUpdateState}/>} />
            <Route path="/getflights" element={<UserList changeLoggedInState={this.changeLoggedInState} setTrueUpdateState={this.setTrueUpdateState} 
                loggedIn={this.state.loggedIn} update={this.state.update} roles={this.state.roles}/>}/>
            <Route path="/get-available-tickets/:id" element={<UserInnerList setTrueUpdateState={this.setTrueUpdateState}/>}/>
            <Route path="/addexpinfo" element={<AddUserInfo setTrueUpdateState={this.setTrueUpdateState}/>}/>
          </Routes>
      </div>
    )
  }
}
