import React, { Component } from "react";
import NewComment from "./NewComment";
export default class CommentButton extends Component {
  constructor(props) {
    super(props);
    this.newcommentClick = this.newcommentClick.bind(this);
    this.state = {
      comment: "",
    };
  }
  newcommentClick() {
    this.props.setcomment(
      <div>         
       <NewComment
        setcomment={this.props.setcomment}
        userinfo={this.props.userinfo}
        item={this.props.item}
      />
      </div>
    
     
    );
  }
  render() {
    return (
      <div>
        <div>
          <h3
            className="comment"
            onClick={this.newcommentClick}
            title="Use comments to ask for more information or suggest improvements. Avoid answering questions in comments."
          >
            Add a comment
          </h3>
        </div>
      </div>
    );
  }
}
