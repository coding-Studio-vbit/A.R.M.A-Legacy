import React from 'react';
import {Link,Route,Switch} from "react-router-dom"
import Nav from './Navi';
import HODstatus from './HODstatus';
import Profile from './Profile'
const Hdashboard =()=>{ 
 
   
    return(
      <div> 
      <Nav/>
      
      <Switch>
          <Route exact={true} path="/Hdashboard/" component={HODstatus}/>
          <Route path="/Hdashboard/Profile"  component={Profile}/>
          
      </Switch>
      
      </div>
    );
  }


export default Hdashboard;
