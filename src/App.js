import React, { Component } from 'react';
import './App.css';
import { objTreeSameProps } from './exemplaryObjects';
import { findAndModifyAll } from 'obj-traverse/lib/obj-traverse';


class App extends Component {

  constructor() {
    super();
    this.handleFindObjKeyChange = this.handleFindObjKeyChange.bind(this);
    this.handleFindObjValueChange = this.handleFindObjValueChange.bind(this);
    this.handleReplacementObjChange = this.handleReplacementObjChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      obj: objTreeSameProps,
      objToFindByKey: '',
      objToFindByValue: '',
      replacementObj: ''
    };
  }

  handleFindObjKeyChange(event) {
    this.setState({ objToFindByKey: event.target.value });
  }

  handleFindObjValueChange(event) {
    this.setState({ objToFindByValue: event.target.value });
  }

  handleReplacementObjChange(event) {
    this.setState({ replacementObj: event.target.value });
  }

  handleButtonClick() {
    let objToFindBy = {};
    objToFindBy[this.state.objToFindByKey] = this.state.objToFindByValue;
    //let replacementObj = JSON.parse(this.state.replacementObj);
    let newObj = Object.assign ({}, this.state.obj);
    findAndModifyAll(newObj, 'children', objToFindBy, {aaa: 'aa'});
    this.setState({ obj: newObj });
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
        <span>let obj = </span>{this.generateObjToDisplay(this.state.obj)}
        objToFindBy key<input value={this.state.objToFindByKey} onChange={this.handleFindObjKeyChange} />
        objToFindBy value<input value={this.state.objToFindByValue} onChange={this.handleFindObjValueChange} />
        replacementObj<input value={this.state.replacementObj} onChange={this.handleReplacementObjChange} />
        <button type='button' onClick={this.handleButtonClick}>Check!</button>
      </div>

    );
  }
}

export default App;
