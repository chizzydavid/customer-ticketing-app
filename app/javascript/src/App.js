import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
// import './stylesheets/application.scss';

export default () => (
  <Router>
    <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/sign-up" component={SignUp} />
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </Router>
);
