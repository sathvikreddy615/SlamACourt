import React, { Component } from "react";
import moment from 'moment';
import ReactTimeslotCalendar from 'react-timeslot-calendar';
 
export default class Calendar extends Component {
  state = {

  };

  

  render() {
    let timeslots = [
      ['9', '10'], // 9:00 AM - 10:00 AM
      ['10', '11'], // 10:00 AM - 11:00 AM
      ['11', '12'], // 11:00 AM - 12:00 AM
      ['12', '13'], // 12:00 AM - 1:00 PM
      ['13', '14'], // 1:00 PM - 2:00 PM
      ['14', '15'], // 2:00 PM - 3:00 PM
      ['15', '16'], // 3:00 PM - 4:00 PM
      ['16', '17'], // 4:00 PM - 5:00 PM
      ['17', '18'] // 5:00 PM - 6:00 PM
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