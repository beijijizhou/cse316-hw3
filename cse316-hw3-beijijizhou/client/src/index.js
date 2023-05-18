import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Register from './components/Register';
import FakeStackOverflow from './components/fakestackoverflow.js';
import UserProfile from'./components/UserProfile.js';
import Login from './components/Login.js';
import Main from'./components/Main.js';
import axios from "axios";
axios.defaults.withCredentials=true;
ReactDOM.render(
//   <Router >
//   <Route  component = {Main}>
//      {/* <IndexRoute component = {Home} />
//      <Route path = "home" component = {Home} />
//      <Route path = "about" component = {About} />
//      <Route path = "contact" component = {Contact} /> */}
//   </Route>
// </Router>,
 <Main />,
  document.getElementById('root')
);
