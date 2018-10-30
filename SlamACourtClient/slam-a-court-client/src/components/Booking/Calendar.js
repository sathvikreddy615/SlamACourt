import React, { Component } from "react";
import moment from 'moment';
import ReactTimeslotCalendar from 'react-timeslot-calendar';
import APIManager from "../APIManager";

export default class Calendar extends Component {
  state = {

  };



  getDate = () => {
    
    // get user selected time
    let timeClass = document.getElementsByClassName("tsc-timeslot--selected");
    for (let i = 0; i < timeClass.length; i++) {
      let timeValue = timeClass[i].innerText;

      let slicedTimeValue = timeValue.slice(0, 4);
      if (timeValue.length > 17) {
        slicedTimeValue = timeValue.slice(0, 5);
      }
      console.log(slicedTimeValue);
    }

    // get current week based on time selected
    let weekClass = document.getElementsByClassName("tsc-month__action-title");
    for (let i = 0; i < weekClass.length; i++) {
      let weekValue = weekClass[i].innerText;

      let weekBeginMonth = weekValue.slice(0, 3); // extract the first month abbrev
      let weekEndMonth = weekValue.slice(11, 14); // extract the last month abbren

      let weekBeginDate = weekValue.slice(4, 8); // extraact the first day number
      let weekEndDate = weekValue.slice(15, 19); // extract the last day number

      if (weekValue.length == 17) {
        weekEndMonth = weekValue.slice(10, 14);
        weekEndDate = weekValue.slice(14, 18);  
      }

      console.log(weekBeginMonth);
      console.log(weekBeginDate);
      console.log(weekEndMonth);
      console.log(weekEndDate);
    }

    let yearValue = moment().year();
    let currentYear = yearValue.toString();
    console.log(currentYear);
  }

  render() {
    return (

      <React.Fragment>

        <button onClick={this.getDate}>Hello1</button>

        <ReactTimeslotCalendar timeslots={[
          ['9', '10'], // 09:00 AM - 10:00 AM
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