import React, { Component } from "react";
import Comment from "./CommentController";
import axios from "axios";
import EditAndDetele from "./EditAndDetele";
export default class OneDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: this.props.item.votes,
      alert: "",
    };
    this.DownVote = this.DownVote.bind(this);
    this.UpVote = this.UpVote.bind(this);
  }
  vote(qid, counter) {
    var creator_id = this.props.item.creator_id;
    var userid = this.props.userinfo._id;
    var q = {
      qid: qid,
      counter: counter,
      qsearch: this.props.item.views !== undefined,
      creator_id,
      userid,
    };
    if (userid === creator_id) {
      this.setState({
        alert: "You can not vote for yourself",
        
      });
      setTimeout(() => {
        this.setState({
          alert: "",
        });
      }, 2000);
     
    } else {
      axios.post("http://localhost:8000/Qupvote", q).then((res) =>
        this.setState({
          votes: res.data,
        })
      );
    }
  }
  UpVote() {
    this.vote(this.props.id, 1);
  }
  DownVote() {
    this.vote(this.props.id, -1);
  }

  render() {
    var creator = this.props.creator;
    var answers = this.props.item;
    var date = new Date(this.props.time).toString();
    var hr = date.split(" ")[4];
    var day =
      date.split(" ")[1] + " " + date.split(" ")[2] + ", " + date.split(" ")[3];
    hr = hr.split(":")[0] + ":" + hr.split(":")[1];
    var votes = this.state.votes;
    return (
      <div>
        <div key={answers._id} className="dataDiv">
          <div className="leftDiv">
          <span className="alertbox">{this.state.alert}</span>

            <div
              className="triangle"
              id="up"
              onClick={this.UpVote}
              title="This answer is useful"
            ></div>
            {votes} votes
            <div
              className="triangle"
              id="down"
              onClick={this.DownVote}
              title="This answer is not useful"
            ></div>
          </div>
          <div>
            <div className="midDiv">{answers.text} </div>
            <div>
              {this.props.userinfo && (
                <Comment
                  userinfo={this.props.userinfo}
                  item={this.props.item}
                />
              )}
              {this.props.editmode === "answer" && (
                <EditAndDetele
                  item={this.props.item}
                  ans={this.props.item}
                  userinfo={this.props.userinfo}
                  setcontent={this.props.setcontent}
                  setUserContent={this.props.setUserContent}
                  editmode={this.props.editmode}
                />
              )}
            </div>
          </div>

          <div className="rightDiv">
            <li>
              created By <span className="askedBy">{creator}</span>
            </li>
            <div>
              On <span className="askedOn">{day}</span>
            </div>
            <div>
              At <span className="askedAt">{hr}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
