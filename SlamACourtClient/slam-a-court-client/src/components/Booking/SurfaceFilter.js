import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

class SimpleSelect extends React.Component {
  state = {
    age: '',
    name: 'hai',
    labelWidth: 0,
  };

//   componentDidMount() {
//     this.setState({
//       labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
//     });
//   }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="court-surface">Surface</InputLabel>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Hard"}>Hard</MenuItem>
            <MenuItem value={"Clay"}>Clay</MenuItem>
            <MenuItem value={"Grass"}>Grass</MenuItem>
          </Select>
        </FormControl>

        {/* <FormControl className={classes.formControl}>
        <InputLabel htmlFor="date">Date</InputLabel>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Hard"}>Hard</MenuItem>
            <MenuItem value={"Clay"}>Clay</MenuItem>
            <MenuItem value={"Grass"}>Grass</MenuItem>
          </Select>
        </FormControl> */}
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
