import React, { Component } from "react";
import moment from 'moment';
import ReactTimeslotCalendar from 'react-timeslot-calendar';
import APIManager from "../APIManager";
 
export default class Calendar extends Component {
  state = {

  };

  // queryRequestedCourtData = () => {
  //   APIManager.getBookedTennisCourts(this.props.courtId).then(bookedCourt => {
  //     console.log(bookedCourt);
  //   })
  // };

  // componentDidMount = () => {
  //   this.renderCalendar();
  // }
  
  render() {
    let timeslots = [
      ['10', '11'], // 10:00 AM - 11:00 AM
      ['11', '12'], // 11:00 AM - 12:00 AM
      ['12', '13'], // 12:00 AM - 1:00 PM
      ['13', '14'], // 1:00 PM - 2:00 PM
      ['14', '15'], // 2:00 PM - 3:00 PM
      ['15', '16'] // 3:00 PM - 4:00 PM
  ];

  let maxTimeslots = 2;

//   const ignoreWeekends = {
//     'saturdays': false,
//     'sundays': false,
//   };

    return (
      <ReactTimeslotCalendar timeslots={timeslots} maxTimeslots={maxTimeslots}
        initialDate={moment().format()}
      />
    );
  }
}