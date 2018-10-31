import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import APIManager from "../APIManager";
import Calendar from "./Calendar";
import moment from 'moment';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  }
});

class CourtFilters extends React.Component {
  state = {
    userSelectedSurface: "",
    tennisCourtNames: [],
    userSelectedCourt: "",
    tennisCourtId: 0,
    timeSlot: []
    // userSelectedCourtData: []
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
    let userSelectedSurfaceClone = "";

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
      APIManager.getBookedTennisCourts(courtId).then(bookedCourtData => {
        bookedCourtData.forEach(courts => {
          // let extractStartHour = courts.startTime.slice(11, 13);
          // let extractEndHour = courts.endTime.slice(11, 13);

          // let extractStartDate = courts.startTime.slice(0, 10);

          // startHoursClone.push(extractStartHour);
          // endHoursClone.push(extractEndHour);

          // MMMM Do YYYY, h:mm:ss a
          let extractStartTime = courts.startTime.slice(11,19);
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

          // let endDate = {};
          // endDate["endDate"] = endFullDate;
          // endDate["format"] = 'MMMM Do YYYY, h:mm:ss a';
          // timeSlotClone.push(endDate);
        })
        this.setState({
          timeSlot: timeSlotClone
        })
      })
    }) 
  };

  render() {
    const styles = theme => ({
      button: {
        margin: theme.spacing.unit,
      },
    });

    const { classes } = this.props;

    return (

      <React.Fragment>
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="court-surface">Surface</InputLabel>
            <Select
              value={this.props.courtNames}
              onChange={this.handleSurfaceChange}
              className="surfaceSelection"
              inputProps={{
                name: 'surfaceSelection',
                id: 'surfaceSelection',
              }}
            >
              <MenuItem value={"Hard"}>Hard</MenuItem>
              <MenuItem value={"Clay"}>Clay</MenuItem>
              <MenuItem value={"Grass"}>Grass</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="date">Court</InputLabel>
            <Select
              value={this.props.courtNames}
              onChange={this.handleCourtChange}
              className="courtSelection"
              inputProps={{
                name: 'courtSelection',
                id: 'courtSelection',
              }}
            >
              {this.state.tennisCourtNames.map((courtName, index) => (
                <MenuItem key={index} id={courtName} value={courtName}>{courtName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>

        <Button onClick={this.handleSubmission} variant="contained" color="primary" className={this.button}>
          Show Availability
        </Button>

        <Calendar tennisCourtId={this.state.tennisCourtId} timeSlot={this.state.timeSlot} />
      </React.Fragment>
    );
  }
}

CourtFilters.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourtFilters);
