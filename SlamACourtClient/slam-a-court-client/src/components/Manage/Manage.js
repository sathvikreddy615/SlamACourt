import React, { Component } from "react";
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import APIManager from "../APIManager";
import moment from 'moment';
import Modal from "./Modal";
import CourtTable from "./CourtTable";

export default class Manage extends Component {
    state = {
        courtsDetails: [],
        courtToBeDeletedId: 0
    };

    getBookedCourtsByUser = () => {
        let localUser = JSON.parse(localStorage.getItem("credentials"));

        APIManager.getBookedTennisCourtsByUserId(localUser.userId).then(bookedCourtsArr => {
            let courtsDetailsClone = this.state.courtsDetails;

            bookedCourtsArr.forEach(bookedCourt => {
                let extractStartTime = bookedCourt.startTime.slice(11, 19);
                let extractStartDate = bookedCourt.startTime.slice(0, 10);
                let extractStartMonth = extractStartDate.slice(5, 7);
                let extractStartDay = extractStartDate.slice(8, 10);
                let extractStartYear = extractStartDate.slice(0, 4);

                let reformatStartDate = `${extractStartYear}-${extractStartMonth}-${extractStartDay}, ${extractStartTime}`;

                let displayStartDate = moment(reformatStartDate).format('llll');
                let currentDate = moment().format();

                if (currentDate < bookedCourt.startTime) {
                    let courtInfo = {};
                    courtInfo['bookedTennisCourtId'] = bookedCourt.id;
                    courtInfo['date'] = displayStartDate;
                    courtInfo['court'] = bookedCourt.tennisCourt.name;
                    courtInfo['surface'] = bookedCourt.tennisCourt.surface;
                    courtsDetailsClone.push(courtInfo);
                } else {
                    APIManager.deleteBookedTennisCourt(bookedCourt.id).then();
                }
            });
            this.setState({
                courtsDetails: courtsDetailsClone,
            })
        });
    }

    componentDidMount = () => {
        this.getBookedCourtsByUser();
    }

    deleteBookedCourt = e => {
        let eventTargetIdString = e.currentTarget.id;
        let eventTargetIdInt = parseInt(eventTargetIdString);
        this.setState({
            courtToBeDeletedId: eventTargetIdInt
        })

        APIManager.deleteBookedTennisCourt(eventTargetIdInt).then();

        alert("Your tennis court has been cancelled!");

        window.location.reload(true);
    }

    render() {
        return (
            <React.Fragment>
                <br />
                {/* <br /> */}
                {/* <br /> */}
                {/* <Modal deleteBookedCourt={this.deleteBookedCourt} /> */}
                <CourtTable
                    deleteBookedCourt={this.deleteBookedCourt}
                    courtsDetails={this.state.courtsDetails}
                />
            </React.Fragment>
        )
    }
}

// exports to ApplicationViews
