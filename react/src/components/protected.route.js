import React  from 'react';
import {Route, Redirect} from 'react-router-dom';

export const ProtectedRoute = ({component:Component, ...rest}) => {
  var user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <Route {...rest}
    render={
      (props) => {
        if(user!==null){
          return <Component {...props} />;
        }
        else{
          return <Redirect to={
            {
              pathname:"/",
              state: {
              from:props.location
              }
            }
          }/>;
        }
      }
    }/>
  );
}
