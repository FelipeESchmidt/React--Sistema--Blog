import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Title from './Title';
import Navigation from './Navigation';
import BtnNewCategoria from './BtnNewCategoria';
import Footer from './Footer';


const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "300px",
        height: "100%",
        backgroundColor: theme.palette.grey[200],
        textAlign: "center"
    }
}));

function Aside() {

    const classes = useStyles();

    return (
        <aside className={classes.root}>
            <Title />
            <Navigation />
            <BtnNewCategoria />
            <Footer />
        </aside>
    );
}

export default Aside;