import React, { Component } from "react";
import Login from "./Login";
import FakeStackOverflow from "./fakestackoverflow";
import axios from "axios";
import Tags from "./Tags";
import Answerpage from "./Answerpage";
import UserProfile from "./UserProfile";
import Nav from "./Nav";
import Data from "./Data";
import { Router, Route, Link, browserHistory, Routes } from "react-router";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.setwholepage = this.setwholepage.bind(this);
    this.state = {
      content: <Login setwholepage={this.setwholepage} />,
    };
  }
  componentDidMount() {
    // axios.get("http://localhost:8000/islogged").then((res) => {
    //   if (res.data.userinfo) {
    //     this.setState({
    //       content: (
    //         <FakeStackOverflow
    //           setwholepage={this.setwholepage}
    //           userinfo={res.data.userinfo}
    //           page={res.data.page}
    //         />
    //       ),
    //     });
    //   } else {
    //     this.setState({
    //       content: <Login setwholepage={this.setwholepage} />,
    //     });
    //   }
    // });
    this.setState({
      content: (
        <Router>
          <Nav></Nav>
          <Routes>
            <Route path="questionPage">
              <Data></Data>
            </Route>
          </Routes>
        
        </Router>
      ),
    });
  }
  setwholepage(newpage) {
    this.setState({ content: newpage });
  }
  render() {
    return <div>{this.state.content}</div>;
  }
}
