import React from 'react';
import './css/template.css';
import {Button} from 'react-bootstrap'

export default class Template extends React.Component{
    render(props) {
        const {id,subject,recepient,linkName}=this.props.template;

        return (
            <div style={{textAlign:"center"}} className="card mb-5 mt-5 mx-auto px-0" >
            <div class="cS-container"><div class="cS"></div></div>
            <h2 class="h2" >{subject} </h2>
            <p class="p" >From CodingStudio <br/> To {recepient}<br/> Regarding {subject}</p>
            <div class="button">
                <Button className="button1" href={linkName}>USE THIS</Button></div>
            </div   >
        )
     }
}
