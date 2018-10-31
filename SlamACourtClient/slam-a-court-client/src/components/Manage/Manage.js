import React, { Component } from "react";
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import CourtTable from "./CourtTable";
import APIManager from "../APIManager";
import moment from 'moment';

export default class Manage extends Component {

    state = {
        id: [],
        date: [],
        court: [],
        surface: [],
        courtsDetails: []
    };

    getBookedCourtsByUser = () => {
        APIManager.getBookedTennisCourtsByUserId(1).then(bookedCourtsArr => {
            let idClone = [];
            let dateClone = [];
            let courtClone = [];
            let surfaceClone = [];

            let courtsDetailsClone = this.state.courtsDetails;

            bookedCourtsArr.forEach(bookedCourt => {
                let extractStartTime = bookedCourt.startTime.slice(11, 19);
                let extractEndTime = bookedCourt.endTime.slice(11, 19);

                let extractStartDate = bookedCourt.startTime.slice(0, 10);
                let extractEndDate = bookedCourt.endTime.slice(0, 10);

                let extractStartMonth = extractStartDate.slice(5, 7);
                let extractEndMonth = extractEndDate.slice(5, 7);

                let extractStartDay = extractStartDate.slice(8, 10);
                let extractEndDay = extractEndDate.slice(8, 10);

                let extractStartYear = extractStartDate.slice(0, 4);
                let extractEndYear = extractEndDate.slice(0, 4);

                let reformatStartDate = `${extractStartYear}-${extractStartMonth}-${extractStartDay}, ${extractStartTime}`
                let reformatEndDate = `${extractEndYear}-${extractEndMonth}-${extractEndDay}, ${extractEndTime}`

                let startFullDate = moment(reformatStartDate).format('MMMM Do YYYY, h:mm:ss a');
                let endFullDate = moment(reformatEndDate).format('MMMM Do YYYY, h:mm:ss a');
                
                let courtInfo = {};
                courtInfo['bookedTennisCourtId'] = bookedCourt.id;
                courtInfo['date'] = startFullDate;
                courtInfo['court'] = bookedCourt.tennisCourt.name;
                courtInfo['surface'] = bookedCourt.tennisCourt.surface;
                courtsDetailsClone.push(courtInfo);

                idClone.push(bookedCourt.id);
                dateClone.push(startFullDate);
                courtClone.push(bookedCourt.tennisCourt.name);
                surfaceClone.push(bookedCourt.tennisCourt.surface);
            });
            this.setState({
                courtsDetails: courtsDetailsClone,
                id: idClone,
                date: dateClone,
                court: courtClone,
                surface: surfaceClone
            })
        });
    }

    componentDidMount = () => {
        this.getBookedCourtsByUser();
    }

    deleteBookedCourt = () => {
        APIManager.deleteBookedTennisCourt(1016).then();
    }


    render() {
        return (
            <React.Fragment>
                <br />
                <br />
                <br />
                {/* <button onClick={this.getBookedCourtsByUser}>GET</button> */}
                <button onClick={this.deleteBookedCourt}>DELETE</button>
                <CourtTable courtsDetails={this.state.courtsDetails} />
            </React.Fragment>
        )
    }
}

// exports to ApplicationViews
