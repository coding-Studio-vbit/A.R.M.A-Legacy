import React, { Component } from 'react'
import '../css/table.css';

export default class Submission extends Component {
    state={
        data:[
            {
                id:1,
                Name:'Coding Studio',
                subject:'Permission for codecraft',
                status:'pending',
                approved : false
            },
            {
                id:2,
                Name:'Coding Studio',
                subject:'Permission for codecraft',
                status:'pending',
                approved : false
            },
            {
                id:3,
                Name:'Coding Studio',
                subject:'Permission for codecraft',
                status:'pending',
                approved : false
            },
            {
                id:4,
                Name:'Coding Studio',
                subject:'Permission for codecraft',
                status:'pending',
                approved : false
            }
        ]
    }
    approval = (id) =>{
      this.setState({data: this.state.data.map(temp => {
        if(temp.id===id){
          temp.approved = !temp.approved
          if(temp.approved) temp.status = 'Approved';
          else temp.status = 'pending';
        }
        return temp;
      }) });
    }

        render() {
            const items=this.state.data.map(item =>{return(

               <tr>
                  <td scope="row">{item.id}</td>
                  <td>{item.Name}</td>
                  <td>{item.subject}</td>
                  <td>{item.status}</td>
                  <td> <a href="#home">Click here!</a> </td>
                  <td><center>
                    <input type="checkbox" onChange={this.approval.bind(item,item.id)}/>
            </center></td>
            </tr>

                     )
            })
            return (
              <div class="containerz">
                <div class="container table-container">
                  <div class="table-responsive">
                   <table class="table">
                   <thead>
                   <tr>
                   <th scope="col">#</th>
                   <th scope="col">Forum/Student</th>
                   <th scope="col">Subject</th>
                   <th scope="col">Status</th>
                   </tr>
                   </thead>
                   <tbody>
                   {items}
                   </tbody>
                   </table>
                  </div>
                </div>
              </div>

            );
        }

}
