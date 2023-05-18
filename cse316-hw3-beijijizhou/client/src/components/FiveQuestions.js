import React, { Component } from 'react'
import Onequestion from './Onequestion'
export default class FiveQuestions extends Component {
    constructor(props){
        super(props)
        this.state={
          counter:0,
          range:5,
        }
        this.prevClick=this.prevClick.bind(this)
        this.nextClick=this.nextClick.bind(this)
      }
      prevClick(){
        var counter=this.state.counter
        if(counter-this.state.range>=0){
          counter-=this.state.range
          this.setState({
            counter:counter
          })
        }
      }
      nextClick(){
        var length=this.props.questionlist.length;
        var counter=this.state.counter
        if(length-counter>=this.state.range){
          counter+=this.state.range
          this.setState({
            counter:counter
          })
        }
      }
  render() {
    var index=this.state.counter
    var data = this.props.questionlist.slice(index, index+this.state.range);
 
    return (
      <div>
        {this.props.questionlist.length>this.state.range&&<div className="PrevNext">
          <span className="nextbutton" onClick={this.prevClick}> Prev</span>
          <span className="nextbutton" onClick={this.nextClick}> Next</span>
        </div>}
          
        {data.map((index) => {
          return (
            <div key={index}>
              <Onequestion
                item={this.props.data[index]}
                setcontent={this.props.setcontent}
                data={this.props.data}
                userinfo={this.props.userinfo}
                editmode={this.props.editmode}
                setUserContent={this.props.setUserContent}
              />
            </div>
          );
        })}
      </div>
    )
  }
}
