import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        paddingBottom: "1.3em",
        fontSize: "2.8em",
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: "Birthstone, cursive",
        color: "#212121",
        borderBottom: `2px solid ${theme.palette.grey[500]}`
    }
}));

function Title() {
    const classes = useStyles();
    return (
        <h1 className={classes.title}>Blog FS</h1>
    );
}

export default Title;