import React, { Component } from "react";
import moment from 'moment';
import CourtFilter from "./CourtFilter";
import Calendar from "./Calendar";
import APIManager from "../APIManager";
import Navbar from "../Navbar/Navbar";

export default class Booking extends Component {
  state = {
    userSelectedSurface: "",
    tennisCourtNames: [],
    userSelectedCourt: "",
    tennisCourtId: 0,
    timeSlot: [],
    names: []
  };

  renderCourtSelectionBySurface = () => {
    APIManager.getAllData("tenniscourt").then(arrOfTennisCourts => {
      let tennisCourtNamesArr = [];

      arrOfTennisCourts.forEach(tennisCourt => {
        if (this.state.userSelectedSurface === tennisCourt.surface) {
          tennisCourtNamesArr.push(tennisCourt.name);
        } else if (this.state.userSelectedSurface === tennisCourt.surface) {
          tennisCourtNamesArr.push(tennisCourt.name);
        } else if (this.state.userSelectedSurface === tennisCourt.surface) {
          tennisCourtNamesArr.push(tennisCourt.name);
        }
      });
      this.setState({
        tennisCourtNames: tennisCourtNamesArr
      })
    })
  };

  handleSurfaceChange = e => {
    let userSelectedSurfaceClone = this.state.userSelectedSurface;

    if (e.target.value === "Hard") {
      userSelectedSurfaceClone = "Hard";
    } else if (e.target.value === "Clay") {
      userSelectedSurfaceClone = "Clay";
    } else if (e.target.value === "Grass") {
      userSelectedSurfaceClone = "Grass";
    } else {
      alert("Please select a surface!");
    }
    this.setState({
      userSelectedSurface: userSelectedSurfaceClone
    })

    this.renderCourtSelectionBySurface();
  };

  handleCourtChange = e => {
    this.setState({
      userSelectedCourt: e.target.value
    })
  };

  handleSubmission = () => {
    let courtId = 0;
    let timeSlotClone = this.state.timeSlot;

    APIManager.getAllData("tenniscourt").then(arrOfTennisCourts => {
      arrOfTennisCourts.forEach(tennisCourt => {
        if (this.state.userSelectedCourt === tennisCourt.name) {
          courtId = tennisCourt.id;
          this.setState({
            tennisCourtId: courtId
          })
        }
      })
      APIManager.getBookedTennisCourtsByTennisCourtId(courtId).then(bookedCourtData => {
        bookedCourtData.forEach(courts => {

          // MMMM Do YYYY, h:mm:ss a
          let extractStartTime = courts.startTime.slice(11, 19);
          let extractEndTime = courts.endTime.slice(11, 19);

          let extractStartDate = courts.startTime.slice(0, 10);
          let extractEndDate = courts.endTime.slice(0, 10);

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

          let startDate = {};
          startDate["startDate"] = startFullDate;
          startDate["format"] = 'MMMM Do YYYY, h:mm:ss a';
          timeSlotClone.push(startDate);
        })
        this.setState({
          timeSlot: timeSlotClone
        })
      });
    })

    let localUser = JSON.parse(localStorage.getItem("credentials"));
    let namesClone = new Array;

    APIManager.getAllData("user").then(arrOfUsers => {
      arrOfUsers.forEach(user => {
        if (user.id != localUser.userId) {
          namesClone.push(user.name);
        }
      });
      this.setState({
        names: namesClone
      })
    })
  };

  renderCalendar = () =>
    this.state.tennisCourtId === 0;

  render() {
    if (this.renderCalendar()) {
      return (
        <React.Fragment>
          <Navbar />
          <CourtFilter
            userSelectedSurface={this.state.userSelectedSurface}
            userSelectedCourt={this.state.userSelectedCourt}
            handleSurfaceChange={this.handleSurfaceChange}
            renderCourtSelectionBySurface={this.renderCourtSelectionBySurface}
            handleCourtChange={this.handleCourtChange}
            handleSubmission={this.handleSubmission}
            tennisCourtNames={this.state.tennisCourtNames}
          />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Navbar />
          <Calendar
            timeSlot={this.state.timeSlot}
            tennisCourtId={this.state.tennisCourtId}
            userSelectedCourt={this.state.userSelectedCourt}
            userSelectedSurface={this.state.userSelectedSurface}
            names={this.state.names}
          />
        </React.Fragment>
      )
    }
  }
}