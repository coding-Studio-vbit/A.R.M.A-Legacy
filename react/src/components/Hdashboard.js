import React from 'react';
import Table  from './Table';
import Nav from './Navi';
class Hdashboard extends React.Component{
  render(){
    return(
      <div>
      <Nav />
      <Table />
      </div>
    );
  }
}

export default Hdashboard;
