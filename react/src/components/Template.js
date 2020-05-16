import React from 'react';
import '../css/template.css';
import {Card,Button} from 'react-bootstrap'


export default class Template extends React.Component{
    render() {
        const {id,subject,recepient}=this.props.template;

        return (
            <div style={{textAlign:"center"}} className="card mb-5 mt-5 " >
            <div class="cS-container"><div class="cS"></div></div>
            <h2 >{subject} </h2>
            <p >From CodingStudio <br/> To {recepient}<br/> Regarding {subject}</p>
            <div class="button"><Button>USE THIS</Button></div>
            </div   >
        )
     }
}
