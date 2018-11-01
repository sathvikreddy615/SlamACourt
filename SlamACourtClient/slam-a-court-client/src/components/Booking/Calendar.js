import React, { Component } from "react";
import moment from 'moment';
import ReactTimeslotCalendar from 'react-timeslot-calendar';
import APIManager from "../APIManager";
import BookButton from "./BookButton";
import BackToTopButton from "./BackToTopButton";

export default class Calendar extends Component {
  state = {
    startDate: "",
    endDate: ""
  };
 
  bookTimeSlot = () => {
    let startDateClone = "";
    let endDateClone = "";

    let selectedStartDateInput = document.getElementsByName("tsc-startDate");

    for (let i = 0; i < selectedStartDateInput.length; i++) {
      let selectedStartDate = selectedStartDateInput[i].value;
      let sliceSelectedStartDate = selectedStartDate.slice(0, 19);
      let fullStartDate = sliceSelectedStartDate.slice(0, 10);
      let fullStartTime = sliceSelectedStartDate.slice(11, 19);

      startDateClone = `${fullStartDate} ${fullStartTime}`;
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
      UserId: 1,
      TennisCourtId: this.props.tennisCourtId,
      StartTime: startDateClone,
      EndTime: endDateClone
    }

    console.log(bookedTennisCourtTable);

    APIManager.bookTennisCourt(bookedTennisCourtTable).then();
  }

  render() {
    return (

      <React.Fragment>
        <br />
        <br />
        <br />

        <BookButton bookTimeSlot={this.bookTimeSlot} />

        <BackToTopButton />

        <ReactTimeslotCalendar timeslots={[
          // ['9', '10'], // 09:00 AM - 10:00 AM
          ['10', '11'], // 10:00 AM - 11:00 AM
          ['11', '12'], // 11:00 AM - 12:00 AM
          ['12', '13'], // 12:00 AM - 1:00 PM
          ['13', '14'], // 1:00 PM - 2:00 PM
          ['14', '15'], // 2:00 PM - 3:00 PM
          ['15', '16'] // 3:00 PM - 4:00 PM
        ]} disabledTimeslots={this.props.timeSlot} maxTimeslots={1}
          initialDate={moment().format()}
        />

      </React.Fragment>
    );
  }
}