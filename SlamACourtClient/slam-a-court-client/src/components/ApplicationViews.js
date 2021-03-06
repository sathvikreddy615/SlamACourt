import { Route } from 'react-router-dom';
import React, { Component } from "react";
import Home from "../components/Home/Home";
import Manage from "../components/Manage/Manage";
import Booking from "../components/Booking/Booking";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

export default class ApplicationViews extends Component {
    state = {};

    isAuthenticated = () =>
        localStorage.getItem("credentials") !== null;

    render() {
        if (this.isAuthenticated()) {
            return (
                <React.Fragment>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/book-a-court" component={Booking} />
                    <Route exact path="/manage-courts" component={Manage} />
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Route exact path="/" component={Login} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </React.Fragment>
            )
        }
    }
}