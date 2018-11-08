import React, { Component } from "react";
import moment from 'moment';
import ReactTimeslotCalendar from 'react-timeslot-calendar';
import APIManager from "../APIManager";
import BookButton from "./BookButton";
import ScrollToTop from "react-scroll-up";
import Button from '@material-ui/core/Button';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import CourtModal from "./CourtModal";
import Grid from '@material-ui/core/Grid';

export default class Calendar extends Component {
  state = {
    startDate: "",
    endDate: "",
    openModal: false,
    bookedTennisCourtId: 0,
    userName: ""
    // timeClicked: false
  };

  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  // timeSlotClicked = () => {
  //   let startDateClone = "";

  //   let selectedStartDateInput = document.getElementsByName("tsc-startDate");

  //   for (let i = 0; i < selectedStartDateInput.length; i++) {
  //     let selectedStartDate = selectedStartDateInput[i].value;
  //     let sliceSelectedStartDate = selectedStartDate.slice(0, 19);
  //     let fullStartDate = sliceSelectedStartDate.slice(0, 10);
  //     let fullStartTime = sliceSelectedStartDate.slice(11, 19);

  //     startDateClone = `${fullStartDate} ${fullStartTime}`; // 2018-11-02 14:00:00

  //     if (startDateClone) {
  //       console.log("hello");
  //       this.setState({
  //         timeClicked: true
  //       })
  //     }
  //   }
  // }

  // componentDidUpdate = () => {
  //   this.timeSlotClicked();
  // }

  bookTimeSlot = event => {
  
    let localUser = JSON.parse(localStorage.getItem("credentials"));
    let startDateClone = "";
    let endDateClone = "";

    let selectedStartDateInput = document.getElementsByName("tsc-startDate");

    for (let i = 0; i < selectedStartDateInput.length; i++) {
      let selectedStartDate = selectedStartDateInput[i].value;
      let sliceSelectedStartDate = selectedStartDate.slice(0, 19);
      let fullStartDate = sliceSelectedStartDate.slice(0, 10);
      let fullStartTime = sliceSelectedStartDate.slice(11, 19);

      startDateClone = `${fullStartDate} ${fullStartTime}`; // 2018-11-02 14:00:00
    }

    let selectedEndDateInput = document.getElementsByName("tsc-endDate");

    for (let i = 0; i < selectedEndDateInput.length; i++) {
      let selectedEndDate = selectedEndDateInput[i].value;
      let sliceSelectedEndDate = selectedEndDate.slice(0, 19);
      let fullEndDate = sliceSelectedEndDate.slice(0, 10);
      let fullEndTime = sliceSelectedEndDate.slice(11, 19);

      endDateClone = `${fullEndDate} ${fullEndTime}`;
    }

    let bookedTennisCourtTable = {
      UserId: localUser.userId,
      TennisCourtId: this.props.tennisCourtId,
      StartTime: startDateClone,
      EndTime: endDateClone,
      Partners: ""
    }

    let bookedTennisCourtIdClone = 0;

    if (startDateClone) {
      let alertCourtDate = moment(startDateClone).format('llll');

      this.setState({
        startDate: alertCourtDate
      })

      APIManager.bookTennisCourt(bookedTennisCourtTable).then(court => {
        bookedTennisCourtIdClone = court.id;
        this.setState({
          bookedTennisCourtId: bookedTennisCourtIdClone
        })
      });
    }

    let userNameClone = "";

    APIManager.getUserById(localUser.userId).then(user => {
      userNameClone = user.name
      this.setState({
        userName: userNameClone
      })
    });
  }

  render() {
    const upStyle = {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    };

    if (this.state.openModal === true) {
      return (
        <React.Fragment>
          <CourtModal
            userName={this.state.userName}
            startDate={this.state.startDate}
            userSelectedCourt={this.props.userSelectedCourt}
            userSelectedSurface={this.props.userSelectedSurface}
            bookedTennisCourtId={this.state.bookedTennisCourtId}
            names={this.props.names}
            openModal={this.state.openModal}
            handleOpen={this.handleOpen}
          />
          <Grid
            container
            style={{ 'margin-top': '45px' }}
          >
            <ReactTimeslotCalendar timeslots={[
              ['10', '11'], // 10:00 AM - 11:00 AM
              ['11', '12'], // 11:00 AM - 12:00 AM
              ['12', '13'], // 12:00 AM - 1:00 PM
              ['13', '14'], // 1:00 PM - 2:00 PM
              ['14', '15'], // 2:00 PM - 3:00 PM
              ['15', '16'] // 3:00 PM - 4:00 PM
            ]} disabledTimeslots={this.props.timeSlot} maxTimeslots={1}
              initialDate={moment().format()}
            />
          </Grid>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <BookButton bookTimeSlot={this.bookTimeSlot} handleOpen={this.handleOpen} />

          <ScrollToTop showUnder={160}>
            <Button style={upStyle} mini variant="fab" color="secondary" aria-label="Add">
              <UpIcon />
            </Button>
          </ScrollToTop>

          <Grid
            container
            style={{ 'margin-top': '45px' }}
          >

            <ReactTimeslotCalendar timeslots={[
              ['10', '11'], // 10:00 AM - 11:00 AM
              ['11', '12'], // 11:00 AM - 12:00 AM
              ['12', '13'], // 12:00 AM - 1:00 PM
              ['13', '14'], // 1:00 PM - 2:00 PM
              ['14', '15'], // 2:00 PM - 3:00 PM
              ['15', '16'] // 3:00 PM - 4:00 PM
            ]} disabledTimeslots={this.props.timeSlot} maxTimeslots={1}
              initialDate={moment().format()}
            />
          </Grid>
        </React.Fragment>
      )
    }
  }
}