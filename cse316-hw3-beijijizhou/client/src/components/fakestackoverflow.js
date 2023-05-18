import React from "react";
import axios from "axios";
import Nav from "./Nav";
import Data from "./Data";
import Tags from "./Tags";
import UserProfile from "./UserProfile";
export default class FakeStackOverflow extends React.Component {
  constructor(props) {
    super(props);
    this.setcontent = this.setcontent.bind(this);
    this.state = {
      navbar: (
        <Nav
          setcontent={this.setcontent}
          userinfo={this.props.userinfo}
          setwholepage={this.props.setwholepage}
        />
      ),
      content: <div></div>
    };
  }
  setcontent(newcontent) {
    this.setState({ content: newcontent });
  }
  componentDidMount() {
    var page;
    console.log(this.props.page === "tagPage");
    switch (this.props.page) {
      case "tagPage":
        page = {
          page: "tagPage",
        };
        axios.post("http://localhost:8000/loadQuestions", page).then((res) => {
          this.setState({
            content: (
              <Tags
                data={res.data}
                handleTitleClick={this.handleTitleClick}
                setcontent={this.setcontent}
                userinfo={this.props.userinfo}
                setwholepage={this.props.setwholepage}
              />
            ),
          });
        });
        break;
      case "UserQuestion":
       
        axios.post("http://localhost:8000/loadUserQuestion", this.props.userinfo).then((res) => {
          this.setState({
            content: (
              <UserProfile
                userdata={res.data}
                handleTitleClick={this.handleTitleClick}
                setcontent={this.setcontent}
                userinfo={this.props.userinfo}
                setwholepage={this.props.setwholepage}
              />
            ),
          });
        });
        break;
      default: {
        page = {
          page: "questionPage",
        };
        axios.post("http://localhost:8000/loadQuestions", page).then((res) => {
          this.setState({
            content: (
              <Data
                data={res.data}
                handleTitleClick={this.handleTitleClick}
                setcontent={this.setcontent}
                userinfo={this.props.userinfo}
                setwholepage={this.props.setwholepage}
              />
            ),
          });
        });
      }
    }
  }
  render() {
    return (
      <div>
        {this.state.navbar}
        {this.state.content}
      </div>
    );
  }
}
