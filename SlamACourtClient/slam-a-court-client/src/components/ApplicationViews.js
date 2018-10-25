// import { Route } from 'react-router-dom';
import React, { Component } from "react";
import Manage from "../components/Manage/Manage";
import Booking from "../components/Booking/Booking";

export default class ApplicationViews extends Component {

    state = {
        
    };

    render() {
        return (
            <React.Fragment>
                <Manage />
                <Booking />
                {/* <Route exact path="manage-courts" component={Manage} /> */}
                {/* <Route exact path="book-a-court" component={Booking} /> */}
            </React.Fragment>
        )
    }
}