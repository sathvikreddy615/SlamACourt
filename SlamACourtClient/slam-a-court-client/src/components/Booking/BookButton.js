import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

function FloatingActionButtons(props) {
    const { classes } = props;

    const addStyle = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 75,
        left: 'auto',
        position: 'fixed',
    };

    return (
        <div>
            {/* <Button onClick={props.bookTimeSlot} style={addStyle} mini variant="fab" color="primary" aria-label="Add" className={classes.button}>
                <AddIcon />
            </Button> */}
            <Button onClick={function(event){ props.bookTimeSlot(); props.handleOpen()}} style={addStyle} mini variant="fab" color="primary" aria-label="Add" className={classes.button}>
                <AddIcon />
            </Button>
        </div>
    );
}

FloatingActionButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);
