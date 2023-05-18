import React, { Component } from "react";
import FakeStackOverflow from "./fakestackoverflow";
import Login from "./Login";
import ContinueGuest from "./ContinueGuest";
import axios from "axios";
export default class Register extends Component {
  constructor() {
    super();
    this.clickSign = this.clickSign.bind(this);
    this.logClick = this.logClick.bind(this);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirm: "",
      alert: "",
    };
  }
  emailchecking(email) {
    var check = /\S+@\S+\.\S+/;
    return check.test(email);
  }
  clickSign() {
    var f = false;
    var alertmessage = "";
    if (
      this.state.password === "" ||
      this.state.password !== this.state.confirm
    ) {
      alertmessage = "Invalid Password";
      f = true;
    }
    if (!this.emailchecking(this.state.email)) {
      alertmessage += "\nInvalid email formatting ";
      f = true;
    }
    if (!f) {
      var userinfo = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      };
      // window.localStorage.setItem("info", JSON.stringify(userinfo));
      axios.post("http://localhost:8000/signup", userinfo).then((res) => {
       
        if (!res.data) {
          this.setState({
            alert: "Email is already registered",
          });
          this.props.setwholepage(
            <Register
              setwholepage={this.props.setwholepage}
            />
          );
        } else {
          this.props.setwholepage(
            <FakeStackOverflow
              userinfo={res.data}
              setwholepage={this.props.setwholepage}
            />
          );
        }
      });
    } else {
      this.setState({
        alert: alertmessage,
      });
    }
  }
  logClick() {
    this.props.setwholepage(<Login setwholepage={this.props.setwholepage} />);
  }
  render() {
    return (
      <div className="wholepage">
        
        <div className="loginpage">
          <div className="loginColumnDiv">
          <div className="alertbox">{this.state.alert}</div>
            <h3>Username</h3>
            <input
              className="loginbox"
              onChange={(e) => {
                this.setState({ username: e.target.value });
              }}
            ></input>
            <h3>Email</h3>
            <input
              className="loginbox"
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            ></input>
            <h3>Password</h3>
            <h6>Password should not contain the username or the email</h6>
            <input
             type="password"
              className="loginbox"
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
            ></input>
            <h3>Confirm password</h3>
            <input
             type="password"
              className="loginbox"
              onChange={(e) => {
                this.setState({ confirm: e.target.value });
              }}
            ></input>
            <div className="button" id="loginbutton" onClick={this.clickSign}>
              Sign up
            </div>
          </div>
          <div className="loginbottom">
            Already have an account?
            <span className="signup" onClick={this.logClick}>
              Log in
            </span>
          </div>
          <ContinueGuest setwholepage={this.props.setwholepage} />
        </div>
      </div>
    );
  }
}
