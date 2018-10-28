import React, { Component } from "react";
import moment from 'moment';
import ReactTimeslotCalendar from 'react-timeslot-calendar';
import SurfaceFilter from "./SurfaceFilter";
import DateFilter from "./DateFilter";
import Calendar from "./Calendar";
// import APIManager from "../APIManager";
 
export default class Booking extends Component {
  state = {
    tennisCourtNames: []
  };

  // componentDidMount = () => {
  //   APIManager.getAllData("tenniscourt").then(arrOfTennisCourts => {
  //       let tennisCourtNamesArr = [];

  //       arrOfTennisCourts.forEach(tennisCourt => {
  //         if (tennisCourt.surface === "Hard") {
  //           tennisCourtNamesArr.push(tennisCourt.name);
  //           console.log(tennisCourt.name);
  //           console.log(tennisCourt.surface);
  //         } else if (tennisCourt.surface === "Clay") {
  //           tennisCourtNamesArr.push(tennisCourt.name);
  //           console.log(tennisCourt.name);
  //         } else if (tennisCourt.surface === "Grass") {
  //           tennisCourtNamesArr.push(tennisCourt.name);
  //           console.log(tennisCourt.name)
  //         } else {
  //           alert("Please select a surface!");
  //         }
  //       });
  //       this.setState({
  //         tennisCourtNames: tennisCourtNamesArr
  //       })
  //   })
  // };

  render() {
    return (
      <React.Fragment>
        <br />
        <br />
        <br />
      <SurfaceFilter courtNames={this.state.tennisCourtNames} />

      <Calendar />

      </React.Fragment>
    );
  }
}