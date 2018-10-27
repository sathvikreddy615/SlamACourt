import React, { Component } from "react";
import moment from 'moment';
import ReactTimeslotCalendar from 'react-timeslot-calendar';
import SurfaceFilter from "./SurfaceFilter";
import DateFilter from "./DateFilter";
import Calendar from "./Calendar";
import APIManager from "../APIManager";
 
export default class Booking extends Component {
  state = {
    tennisCourtNames: []
  };

  // handleSelectionChange = e => {
  //   // let userSelectedSurface = "";

  //   if (e.target.value === "Hard") {
  //     console.log("Hard!");
  //     this.setState({
  //       surface: "Hard"
  //     })
  //   } else if (e.target.value === "Clay") {
  //     console.log("Clay!");
  //     this.setState({
  //       surface: "Clay"
  //     })
  //   } else if (e.target.value === "Grass") {
  //     console.log("Grass!");
  //     this.setState({
  //       surface: "Grass"
  //     })
  //   } else {
  //     alert("Please select a surface!");
  //   }
  // }


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
      <SurfaceFilter handleChange={this.handleChange} courtNames={this.state.tennisCourtNames} />
      <DateFilter />

      <Calendar />

      </React.Fragment>
    );
  }
}