import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import APIManager from "../APIManager";

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
  },
});

class CourtFilters extends React.Component {
  state = {
    surface: "",
    tennisCourtNames: []
  };

  // renderCourtSelectionBySurface = () => {
  //   APIManager.getAllData("tenniscourt").then(arrOfTennisCourts => {
  //     let tennisCourtNamesArr = [];

  //     arrOfTennisCourts.forEach(tennisCourt => {
  //       if (this.state.surface === tennisCourt.surface) {
  //         tennisCourtNamesArr.push(tennisCourt.name);
  //       } else if (this.state.surface === tennisCourt.surface) {
  //         tennisCourtNamesArr.push(tennisCourt.name);
  //       } else if (this.state.surface === tennisCourt.surface) {
  //         tennisCourtNamesArr.push(tennisCourt.name);
  //       }
  //     });
  //     this.setState({
  //       tennisCourtNames: tennisCourtNamesArr
  //     })
  //   })
  // }

  handleSurfaceChange = e => {
    let userSelectedSurface = "";

    if (e.target.value === "Hard") {
      userSelectedSurface = "Hard";
    } else if (e.target.value === "Clay") {
      userSelectedSurface = "Clay";
    } else if (e.target.value === "Grass") {
      userSelectedSurface = "Grass";
    } else {
      alert("Please select a surface!");
    }
    this.setState({
      surface: userSelectedSurface
    })

    APIManager.getAllData("tenniscourt").then(arrOfTennisCourts => {
      let tennisCourtNamesArr = [];

      arrOfTennisCourts.forEach(tennisCourt => {
        if (this.state.surface === tennisCourt.surface) {
          tennisCourtNamesArr.push(tennisCourt.name);
        } else if (this.state.surface === tennisCourt.surface) {
          tennisCourtNamesArr.push(tennisCourt.name);
        } else if (this.state.surface === tennisCourt.surface) {
          tennisCourtNamesArr.push(tennisCourt.name);
        }
      });
      this.setState({
        tennisCourtNames: tennisCourtNamesArr
      })
    })
  };

  // componentDidMount = () => {
  //   console.log(this.state.surface);
  // }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="court-surface">Surface</InputLabel>
          <Select
            value={this.props.courtNames}
            onChange={this.handleSurfaceChange}
            inputProps={{
              name: 'surface',
              id: 'surface',
            }}
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            <MenuItem value={"Hard"}>Hard</MenuItem>
            <MenuItem value={"Clay"}>Clay</MenuItem>
            <MenuItem value={"Grass"}>Grass</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="date">Court</InputLabel>
          <Select
            value={this.props.courtNames}
            onChange={this.handleChange}
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
    );
  }
}

CourtFilters.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourtFilters);
