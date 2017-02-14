import React, { Component } from 'react';
import './App.css';
import { objTreeSameProps } from './exemplaryObjects';
import * as objTraverse  from 'obj-traverse/lib/obj-traverse';
import descriptions from './methodDescriptions';


class App extends Component {

  constructor() {
    super();
    this.handleFindObjKeyChange = this.handleFindObjKeyChange.bind(this);
    this.handleFindObjValueChange = this.handleFindObjValueChange.bind(this);
    this.handleReplacementObjKeyChange = this.handleReplacementObjKeyChange.bind(this);
    this.handleReplacementObjValueChange = this.handleReplacementObjValueChange.bind(this);
    this.handleMethodChange = this.handleMethodChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      obj: objTreeSameProps,
      objToFindByKey: '',
      objToFindByValue: '',
      replacementObjKey: '',
      replacementObjValue: '',
      replacementObjVisible: false,
      chosenMethod: 0,
      treeStyle: {
        backgroundColor: 'yellow'
      },
      childrenStyle: {
        backgroundColor: '#6bffff'
      },
      methodNames: ['findFirst', 'findAll', 'findAndModifyFirst',
        'findAndModifyAll', 'findAndDeleteFirst', 'findAndDeleteAll'],
      result: ''
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
  
  handleMethodChange(event) {
    [2, 3].includes(Number(event.target.value)) ?
      this.setState({
        chosenMethod: event.target.value,
        replacementObjVisible: true
      }) :
      this.setState({
        chosenMethod: event.target.value,
        replacementObjVisible: false
      });
  }

  handleButtonClick() {
    const currentMethod = objTraverse[this.state.methodNames[this.state.chosenMethod]];
    let result;
    let objToFindBy = {};
    let replacementObj = {};
    objToFindBy[this.state.objToFindByKey] = this.state.objToFindByValue;
    replacementObj[this.state.replacementObjKey] = this.state.replacementObjValue;
    let newObj = Object.assign ({}, this.state.obj);
    this.state.replacementObjVisible ? result = currentMethod(newObj, 'children', objToFindBy, replacementObj) :
      result = currentMethod(newObj, 'children', objToFindBy);
    console.log(result);
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
        <div className='ui fourteen wide left aligned column ui segment ob-app'>
          <div className='ui grid'>
            <section className='six wide column'>
              <div className="ob-object">
                <span>let <span style={this.state.treeStyle}>tree</span> = </span>{this.generateObjToDisplay(this.state.obj)}
              </div>
            </section>
            <section className='ten wide column'>
              <div className='ui form'>
                <div className='field'>
                  <label>objToFindBy key</label>
                  <input value={this.state.objToFindByKey} onChange={this.handleFindObjKeyChange} />
                </div>
                <div className='field'>
                  <label>objToFindBy value</label>
                  <input value={this.state.objToFindByValue} onChange={this.handleFindObjValueChange} />
                </div>
                {this.state.replacementObjVisible ?
                  <div>
                    <div className='field'>
                      <label>replacementObj key</label>
                      <input value={this.state.replacementObjKey} onChange={this.handleReplacementObjKeyChange} />
                    </div>
                    <div className='field'>
                      <label>replacementObj value</label>
                      <input value={this.state.replacementObjValue} onChange={this.handleReplacementObjValueChange} />
                    </div>
                  </div> :
                  null
                }
                <div className='field'>
                  <label>Choose method</label>
                  <select value={this.state.chosenMethod} onChange={this.handleMethodChange}>
                    {this.state.methodNames.map((method, index) => (
                      <option value={index} label={method} key={index}></option>
                    ))}
                  </select>
                </div>
                <div className='ui center aligned segment'>
                  <div className='ob-funcPreview'>
                    {this.state.methodNames[this.state.chosenMethod]} ( <span style={this.state.treeStyle}>tree</span>,
                    '<span style={this.state.childrenStyle}>children</span>',
                    {` { ${this.state.objToFindByKey}: ${this.state.objToFindByValue} }`}
                    {
                      this.state.replacementObjVisible ?
                        <span>{`, { ${this.state.replacementObjKey}: ${this.state.replacementObjValue} })`}</span> :
                        <span> )</span>
                    }
                  </div>
                </div>
                <div className="ui info icon message">
                  <i className="info icon"></i>
                  <div className="content">
                    <div className="header">
                      <p>{descriptions[this.state.methodNames[this.state.chosenMethod]][0]}</p><br/>
                      Method description
                    </div>
                    <p>{descriptions[this.state.methodNames[this.state.chosenMethod]][1]}</p>
                  </div>
                </div>
                <div className='field'>
                  <button type='button' onClick={this.handleButtonClick} className='ui blue button ob-check'>Check!</button>
                </div>
              </div>
              <div className="ui warning message">
                check out console to see what the method returned
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
