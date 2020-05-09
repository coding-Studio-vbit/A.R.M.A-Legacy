import React from 'react';
import {Link} from 'react-router-dom';
import { Card} from 'react-bootstrap';
import '../css/template.css';



export default class Template extends React.Component{
    render() {
        const {id,subject,recepient,letter}=this.props.template;
        
        return (
            <div className="card col-9 mx-auto col-md-6 col-lg-3 my-3 " >
            <h4 style={{color: "#b007c4"}} >Template-{id}</h4>
            <h2 >{subject} </h2>
            <p className="mb-2 text-muted">From CodingStudio <br/>To {recepient}<br/> regarding {subject}</p>  
            <div class="cta-container transition"> <a href="#" class="cta"><Link to="/fdashboard/TemplateDetails"> Use This</Link></a>      
               
</div>

            </div> 
        )
     }
}

