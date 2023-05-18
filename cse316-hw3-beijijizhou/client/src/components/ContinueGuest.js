import React, { Component } from 'react'
import FakeStackOverflow from './fakestackoverflow';
export default class ContinueGuest extends Component {
    constructor(props) {
      super(props)
      this.continueClick = this.continueClick.bind(this);
    }
    continueClick() {
        this.props.setwholepage(<FakeStackOverflow />);
      }
  render() {
    return (
        <div className="signup" id="continue" onClick={this.continueClick}>
        Continue as guest
      </div>
    )
  }
}


