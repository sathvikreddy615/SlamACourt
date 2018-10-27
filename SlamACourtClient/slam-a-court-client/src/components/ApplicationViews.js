import { Route } from 'react-router-dom';
import React, { Component } from "react";
import Manage from "../components/Manage/Manage";
import Booking from "../components/Booking/Booking";

export default class ApplicationViews extends Component {

    state = {
        
    };

    render() {
        return (
            <React.Fragment>
                <Route exact path="/book-a-court" component={Booking} />
                <Route exact path="/manage-courts" component={Manage} />
            </React.Fragment>
        )
    }
}