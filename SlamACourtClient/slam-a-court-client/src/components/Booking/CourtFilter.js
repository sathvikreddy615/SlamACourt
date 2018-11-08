import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import "./CourtFilter.css";
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
    age: ''
  }
  render() {
    const styles = theme => ({
      button: {
        margin: theme.spacing.unit,
      }
    });

    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid
          id="courtFilterBackground"
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="court-surface">Surface</InputLabel>
              <Select
                value={this.props.userSelectedSurface}
                onChange={this.props.handleSurfaceChange}
                className="surfaceSelection"
              >
                <MenuItem value="Hard">Hard</MenuItem>
                <MenuItem value="Clay">Clay</MenuItem>
                <MenuItem value="Grass">Grass</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="court">Court</InputLabel>
              <Select
                value={this.props.userSelectedCourt}
                onChange={this.props.handleCourtChange}
                className="courtSelection"
                inputProps={{
                  name: 'userSelectedCourt',
                  id: 'userSelectedCourt',
                }}
              >
                {this.props.tennisCourtNames.map((courtName, index) => (
                  <MenuItem key={index} id={courtName} value={courtName}>{courtName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
          <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Button onClick={this.props.handleSubmission} variant="contained" color="secondary" className={this.button}>
              Show Availability
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

CourtFilters.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourtFilters);
