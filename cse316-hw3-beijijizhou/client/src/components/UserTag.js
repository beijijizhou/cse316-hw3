import React, { Component } from "react";
import NoneParticipation from "./NoneParticipation";
import Tags from "./Tags";
export default class UserTag extends Component {
  render() {
    var questionlist = this.props.userdata;
    return (
      <div>
        {questionlist.length > 0 ? (
          <Tags
            data={questionlist}
            handleTitleClick={this.handleTitleClick}
            setcontent={this.props.setcontent}
            userinfo={this.props.userinfo}
            editmode="tag"
          />
        ) : (
          <NoneParticipation para={"creating any tags"} />
        )}
      </div>
    );
  }
}
