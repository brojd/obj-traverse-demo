import React, { Component } from 'react';
import './App.css';
import { objTreeSameProps } from './exemplaryObjects';
import { findAndModifyAll } from 'obj-traverse/lib/obj-traverse';


class App extends Component {

  constructor() {
    super();
    this.handleFindObjKeyChange = this.handleFindObjKeyChange.bind(this);
    this.handleFindObjValueChange = this.handleFindObjValueChange.bind(this);
    this.handleReplacementObjKeyChange = this.handleReplacementObjKeyChange.bind(this);
    this.handleReplacementObjValueChange = this.handleReplacementObjValueChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      obj: objTreeSameProps,
      objToFindByKey: '',
      objToFindByValue: '',
      replacementObjKey: '',
      replacementObjValue: '',
      treeStyle: {
        backgroundColor: 'yellow'
      },
      childrenStyle: {
        backgroundColor: '#6bffff'
      }
    };
  }

  handleFindObjKeyChange(event) {
    this.setState({ objToFindByKey: event.target.value });
  }

  handleFindObjValueChange(event) {
    this.setState({ objToFindByValue: event.target.value });
  }

  handleReplacementObjKeyChange(event) {
    this.setState({ replacementObjKey: event.target.value });
  }

  handleReplacementObjValueChange(event) {
    this.setState({ replacementObjValue: event.target.value });
  }

  handleButtonClick() {
    let objToFindBy = {};
    let replacementObj = {};
    objToFindBy[this.state.objToFindByKey] = this.state.objToFindByValue;
    replacementObj[this.state.replacementObjKey] = this.state.replacementObjValue;
    let newObj = Object.assign ({}, this.state.obj);
    findAndModifyAll(newObj, 'children', objToFindBy, replacementObj);
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
                <span style={this.state.childrenStyle}>children</span>: [
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
      <div className="ui center aligned grid ">
        <div className='ui fourteen wide left aligned column'>
          <div className='ui grid'>
            <section className='six wide column'>
              <span>let <span style={this.state.treeStyle}>tree</span> = </span>{this.generateObjToDisplay(this.state.obj)}
            </section>
            <section className='six wide column'>
              <div className='ui form'>
                <div className='field'>
                  <label>objToFindBy key</label>
                  <input value={this.state.objToFindByKey} onChange={this.handleFindObjKeyChange} />
                </div>
                <div className='field'>
                  <label>objToFindBy value</label>
                  <input value={this.state.objToFindByValue} onChange={this.handleFindObjValueChange} />
                </div>
                <div className='field'>
                  <label>replacementObj key</label>
                  <input value={this.state.replacementObjKey} onChange={this.handleReplacementObjKeyChange} />
                </div>
                <div className='field'>
                  <label>replacementObj value</label>
                  <input value={this.state.replacementObjValue} onChange={this.handleReplacementObjValueChange} />
                </div>
                <div className='ui center aligned segment ot-funcPreview'>
                  findAndModifyAll(<span style={this.state.treeStyle}>tree</span>,
                  '<span style={this.state.childrenStyle}>children</span>',
                  {`{ ${this.state.objToFindByKey}: ${this.state.objToFindByValue} }, `}
                  {`{ ${this.state.replacementObjKey}: ${this.state.replacementObjValue} })`}
                </div>
                <div className='field'>
                  <button type='button' onClick={this.handleButtonClick} className='ui blue button'>Check!</button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
