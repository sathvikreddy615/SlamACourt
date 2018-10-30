import React, { Component } from "react";
import moment from 'moment';
import ReactTimeslotCalendar from 'react-timeslot-calendar';
import APIManager from "../APIManager";
 
export default class Calendar extends Component {
  state = {

  };

  // componentDidMount = () => {
  //   this.queryRequestedCourtData();
  // }

  onSelectTimeslot = (allTimeslots, lastSelectedTimeslot) => {
    /**
     * All timeslot objects include `startDate` and `endDate`.
   
     * It is important to note that if timelots provided contain a single
     * value (e.g: timeslots = [['8'], ['9', '10']) then only `startDate` is filled up with
     * the desired information.
     */

    console.log(allTimeslots);
    console.log(lastSelectedTimeslot.startDate); // MomentJS object.
   
  }

  clickMe = () => {
    this.onSelectTimeslot(this.props.timeSlot, this.props.timeSlot);
  }

  render() {
    let timeslots = [
      ['9', '10'], // 09:00 AM - 10:00 AM
      ['10', '11'], // 10:00 AM - 11:00 AM
      ['11', '12'], // 11:00 AM - 12:00 AM
      ['12', '13'], // 12:00 AM - 1:00 PM
      ['13', '14'], // 1:00 PM - 2:00 PM
      ['14', '15'], // 2:00 PM - 3:00 PM
      ['15', '16'] // 3:00 PM - 4:00 PM
  ];

  let maxTimeslots = 2;

  let disabledTimeslots = this.props.timeSlot;

//   const ignoreWeekends = {
//     'saturdays': false,
//     'sundays': false,
//   };

    return (

      <React.Fragment>

        <button onClick={this.clickMe}>Hello1</button>

      <ReactTimeslotCalendar disabledTimeslots={disabledTimeslots} timeslots={timeslots} maxTimeslots={maxTimeslots}
        initialDate={moment().format()}
      />

      </React.Fragment>
    );
  }
}