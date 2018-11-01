import { Route } from 'react-router-dom';
import React, { Component } from "react";
import Manage from "../components/Manage/Manage";
import Booking from "../components/Booking/Booking";
import Calendar from "../components/Booking/Calendar";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

export default class ApplicationViews extends Component {

    state = {

    };

    isAuthenticated = () =>
        localStorage.getItem("credentials") !== null;

    render() {
        return (
            <React.Fragment>
                <Route exact path="/book-a-court" component={Booking} />
                <Route exact path="/manage-courts" component={Manage} />
                <Route exact path="/calendar" component={Calendar} />
            </React.Fragment>
        )
        // if (this.isAuthenticated()) {
        //     return (
        //         <React.Fragment>
        //             <Route exact path="/book-a-court" component={Booking} />
        //             <Route exact path="/manage-courts" component={Manage} />
        //         </React.Fragment>
        //     )
        // } else {
        //     return (
        //         <React.Fragment>
        //             <Route exact path="/" component={Login} />
        //             <Route path="/login" component={Login} />
        //             <Route path="/register" component={Register} />
        //         </React.Fragment>
        //     )
        // }
    }
}