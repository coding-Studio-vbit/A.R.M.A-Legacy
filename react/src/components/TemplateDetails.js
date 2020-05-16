import React, { Component } from 'react'
import Nav from './Navi';

export default class TemplateDetails extends Component {
    render() {
        return (
          <div>
          <Nav/>
            <div>
                <br/>
                <form onSubmit={this.addtemp}>
                Name:<br/> <input type="text" name="temp"/><br/>
                Date:<br/><input type="date" name="date"/><br/>
                Recepient:<br/><input type="text" name="recepient"/><br/><br/>
                <button>Generate Letter</button>
                </form>
            </div>
          </div>
        )
    }
}
