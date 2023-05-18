import React, { Component } from "react";
import CommentButton from "./CommentButton";
import ThreeComment from "./ThreeComment";
import axios from "axios";
export default class NewComment extends Component {
  constructor(props) {
    super(props);
    this.postCommentClick = this.postCommentClick.bind(this);
    this.state = {
      comment: "",
    };
  }
  postCommentClick() {
    var newcomment = this.state.comment;
    var req = {
      comment: newcomment,
      id: this.props.item._id,
      userinfo: this.props.userinfo,
      qadd: this.props.item.views !== undefined,
    };
    axios.post("http://localhost:8000/addComment", req).then((res) => {
    
      this.props.setcomment(
        <div>
          <ThreeComment comments={res.data.comments} />
          <CommentButton
            setcomment={this.props.setcomment}
            userinfo={this.props.userinfo}
            item={this.props.item}
          />
        </div>
      );
    });
  }
  render() {
    return (
      <div className="commentSection">
        <textarea
          onChange={(e) => {
            this.setState({ comment: e.target.value });
          }}
        />
        <div>
          <div className="button" onClick={this.postCommentClick}>
            Add comment
          </div>
        </div>
      </div>
    );
  }
}
