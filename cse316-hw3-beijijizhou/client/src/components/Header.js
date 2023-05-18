import React, { Component } from "react";
import Form from "./Form.js";
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.askclick = this.askclick.bind(this);
  }
  askclick() {
    this.props.setcontent(
      <Form setcontent={this.props.setcontent} userinfo={this.props.userinfo}/>
    );
  }
  render() {
    return (
      <div id="header">
        <div>
          {this.props.length} {this.props.left}
          {this.props.view&&<div> {this.props.view+" "}{this.props.view=== 1 ? "View" : "Views"}</div>}
        </div>
        <div>{this.props.mid}</div>
        {this.props.userinfo&&<div className="button" onClick={this.askclick}>
          Ask A Question{" "}
        </div>}
        
      </div>
    );
  }
}

