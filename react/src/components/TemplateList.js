import React from 'react';
import Template from './Template';
import {availableTemplates} from './templatearrays';
import {Button} from 'react-bootstrap'

class TemplateList extends React.Component{
  state={
        template:availableTemplates
    };
    render(){
      return(
          <React.Fragment>
              <div className="availabletemps">
                  <h1 >Available templates</h1>
                  
              </div> 
              <div>
                {this.state.template.map(template=>(
         <Template key={template.id} template={template}/>
                ))}
                  <Button variant="primary" size="lg" block>
    ADD A NEW TEMPLATE
  </Button>
              </div>
          </React.Fragment>
      );
    }
  }



export default TemplateList;
