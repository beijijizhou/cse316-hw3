import React, { Component } from "react";
import UserQATController from "./UserQATController";
export default class UserProfile extends Component {
  
  render() {
    var user = this.props.userinfo;
    var startdate = user.create_time.split("T")[0];
    var enddate = new Date().toISOString().split("T")[0];
    var timespan = new Date(enddate) - new Date(startdate);
    const diffInDays = timespan / (1000 * 60 * 60 * 24);
    var reputation = user.reputation;

    return (
      <div>
        <h1 className="icon">
          {user.username.toUpperCase()} Member for: {diffInDays} Days
        </h1>
        <h1>Reputation:{reputation}</h1>
        <UserQATController
      userinfo={this.props.userinfo}
      userdata={this.props.userdata}
      setcontent={this.props.setcontent}
    />,
      </div>
    );
  }
}
