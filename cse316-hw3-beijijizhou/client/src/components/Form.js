import React, { Component } from "react";
import axios from "axios";
import Data from "./Data";
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.handlePostClick = this.handlePostClick.bind(this);
    this.state = {
      title: this.props.title||"",
      text:this.props.text|| "",
      tags:this.props.tags|| "",
      error: "",
    };
  }
  add(q) {
   
    axios.post("http://localhost:8000/addQuestion", q).then((res) => {
      this.props.setcontent(
        <Data
          data={res.data}
          handleTitleClick={this.handleTitleClick}
          setcontent={this.props.setcontent}
          userinfo={this.props.userinfo}
        />
      );
    });
  }
  handlePostClick() {
    var alertmessage = "";
    var title = this.state.title;
    var text = this.state.text;
    var tags = this.state.tags;
    var userinfo=this.props.userinfo;

    tags = tags.trim().split(" ");
    var tagset = new Set();
    var upset = new Set();
    for (let i of tags) {
      if (i !== " " && i !== "" && !upset.has(i.toUpperCase())) {
        upset.add(i.toUpperCase());
        tagset.add(i);
      }
    }
    var f = false;
    if (title.length > 100) {
      alertmessage += "Title shoud not be more than 100 characters";
      f = true;
    } else if (title.length === 0) {
      alertmessage += "Title shoud not be empty";
      f = true;
    }
    if (text.length === 0) {
      alertmessage += "\nText shoud not be empty";
      f = true;
    }
    // if(userinfo.reputation<100){
    //   alertmessage += "\n A new tag name can only be created with reputation 100 or more.";
    //   f = true;
    // }
    if (tagset.size === 0) {
      alertmessage += "\nTags shoud not be empty";
      f = true;
    }
    this.setState({
      error: alertmessage,
    });
    if (!f) {
      var hours = "" + new Date().getHours() + ":" + new Date().getMinutes();
      var tagarray = [];
      for (let tag of tagset) {
        tagarray.push(tag);
      }
      var q = {
        title: this.state.title,
        text: this.state.text,
        tags: tagarray,
        askedBy: userinfo,
        askedOn: "",
        askedAt: hours,
        answers: [],
        views: 0,
        edit:this.props.edit,
        item:this.props.item,
      };
      console.log(q)
      this.add(q);
    }
  }
  render() {

    
    return (
      <div>
        <div className="alertbox">{this.state.error}</div>
        <h2>Question Title</h2>
        <p>Title shoud not be more than 100 characters.</p>
        <textarea
          id="titlebox"
          className="box"
          placeholder="Come up with a good click bait"
          defaultValue={this.props.title}
          onChange={(e) => {
            this.setState({ title: e.target.value });
          }}
        >{}</textarea>
        <h2>Question Text</h2>
        <p>Add details</p>
        <textarea
          id="textbox"
          className="box"
          placeholder="Text should be as detail as possible"
          defaultValue={this.props.text}
          onChange={(e) => {
            this.setState({ text: e.target.value });
          }}
        ></textarea>
        <h2>Tags</h2>
        <p>Add Keywords separated by whitespace.</p>
        <textarea
          id="tagbox"
          className="box"
          placeholder="Add Keywords separated by whitespace."
          onChange={(e) => {
            this.setState({ tags: e.target.value });
          }}
          defaultValue={this.props.tags}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              this.handlePostClick()
            }
          }}
        ></textarea>
        <div className="button" id="postbutton" onClick={this.handlePostClick}>
          Post Questions
        </div>
      </div>
    );
  }
}
