import React,{useEffect,useState}  from 'react';
import {Route, Redirect} from 'react-router-dom';

export const ProtectedLogin = ({component:Component, ...rest}) => {
  var isLoggedIn = localStorage.getItem("loggedIn");
  var isLoggedOut = localStorage.getItem("loggedOut");
  console.log(isLoggedIn===true)
  return (
    <Route {...rest}
    render={
      (props) => {
        if(isLoggedIn===true){
          return <Component {...props} />;
        }
          return <Redirect to={
            {
              pathname:"/login",
              state: {
              from:props.location
              }
            }
          }/>;
        
      }
    }/>
  );
}
