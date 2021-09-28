import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "300px",
        height: "100%",
        backgroundColor: theme.palette.primary
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

function Aside() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
        </div>
    );
}

export default Aside;