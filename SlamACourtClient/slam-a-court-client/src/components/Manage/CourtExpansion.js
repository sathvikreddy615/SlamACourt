import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});

class ControlledExpansionPanels extends React.Component {
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <div className={classes.root}>
                {this.props.courtsDetails.map(row => {
                    return (
                        <ExpansionPanel expanded={expanded === row.bookedTennisCourtId} onChange={this.handleChange(row.bookedTennisCourtId)}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>{row.court}</Typography>
                                <Typography className={classes.secondaryHeading}>{row.date}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    Court: {row.court}
                                </Typography>
                                <Typography>
                                    Surface: {row.surface}
                                </Typography>
                                <Typography>
                                    Partners: {row.partners}
                                </Typography>
                                <Typography>
                                    <IconButton
                                        value={row.bookedTennisCourtId}
                                        id={row.bookedTennisCourtId}
                                        onClick={this.props.deleteBookedCourt}
                                        aria-label="Delete"
                                        className={classes.button}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })}
            </div>
        );
    }
}

ControlledExpansionPanels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);