import React, { Component } from 'react';
import './App.css';
import { objTreeSameProps } from './exemplaryObjects';
import { findAll } from 'obj-traverse/lib/obj-traverse';
let lib = require('obj-traverse/lib/obj-traverse')


class App extends Component {

  constructor() {
    super();
    this.state = {
      obj: objTreeSameProps
    };
  }

  componentDidMount() {
    console.log(findAll);
    console.log(lib);
  }

  generateObjToDisplay(obj) {
    let indentSmall = {
      marginLeft: 10
    };
    let indentBig = {
      marginLeft: 20
    };
    return (
      <span>
        {'{'}
          <div style={indentBig}>
            {Object.keys(obj).map((prop, index) => prop === 'children' ?
              <div key={index}>
                children: [
                  {obj[prop].map((child, index) =>
                    <div key={index}>
                      <div style={indentBig}>
                        {this.generateObjToDisplay(child)}<span>{obj[prop].length-1!==index ? ',' : null }</span>
                      </div>
                    </div>
                  )}
                ]
              </div> :
              <div key={index}>{`${prop}: ${obj[prop]}`}<span>{Object.keys(obj).length-1!==index ? ',' : null}</span></div> )}
          </div>
        {'}'}
      </span>
    );
  }

  render() {
    return (
      <div className="App">
        {this.generateObjToDisplay(this.state.obj)}
      </div>
    );
  }
}

export default App;
