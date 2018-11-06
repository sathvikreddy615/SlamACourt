import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import APIManager from "../APIManager";
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [];

function getStyles(name, that) {
  return {
    fontWeight:
      that.state.name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
  };
}

class MultipleSelect extends React.Component {
  state = {
    name: [],
    names: this.props.names
  };

  handleChange = e => {
    // let userSelectedPartners = document.getElementsByClassName("MuiSelect-select-366");
    // for (let i = 0; i < userSelected)
    // console.log(userSelectedPartners);

    this.setState({
      name: e.target.value
    });
  };

  // componentDidUpdate = () => {
  //   console.log(this.props.bookedTennisCourtId);
  // }

  addPartners = () => {
    APIManager.getBookedTennisCourtById(this.props.bookedTennisCourtId).then(court => {

      // let partners = this.state.name.toString();
      let partnersArr = this.state.name;
      let partners = partnersArr.join(', ');

      let bookedTennisCourtTable = {
        UserId: court.userId,
        TennisCourtId: court.tennisCourtId,
        StartTime: court.startTime,
        EndTime: court.endTime,
        Partners: partners
      }

      console.log(bookedTennisCourtTable);

      APIManager.addPartners(this.props.bookedTennisCourtId, bookedTennisCourtTable).then(() => {
         window.location = "http://localhost:3000/manage-courts";
      });

    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-checkbox">Partners</InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {this.state.names.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={this.state.name.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>

          <Button onClick={this.addPartners} variant="contained" color="primary" className={this.button}>
            Confirm
          </Button>
        </FormControl>
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);
