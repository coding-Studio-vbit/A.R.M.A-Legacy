import React from 'react';
import '../css/template.css';



export default class Template extends React.Component{
    render() {
        const {id,subject,recepient}=this.props.template;

        return (
            <div style={{textAlign:"center"}} className="card col-9 mx-auto col-md-6 col-lg-3 my-3 " >
            <h4 style={{color: "#b007c4"}}>Template-{id}</h4>
            <h2 >{subject} </h2>
            <p  >From CodingStudio <br/>To {recepient}<br/> regarding {subject}</p>
            <div class="cta-container transition"> <a href="/Dashboard/TemplateDetails" class="cta">Use This</a></div>
            </div>
        )
     }
}
