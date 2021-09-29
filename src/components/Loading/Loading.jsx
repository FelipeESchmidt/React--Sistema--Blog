import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    middle: {
        display: 'flex',
        justifyContent: 'center'
    },
    p1:{padding: '1em'},
    p2:{padding: '2em'},
    p3:{padding: '3em'},
    p4:{padding: '4em'},
}));

function Loading({position, padding}) {

    const classes = useStyles();

    return (
        <div className={classes[position] + ' ' + classes["p"+padding]}>
            <CircularProgress></CircularProgress>
        </div>
    );
}

export default Loading;