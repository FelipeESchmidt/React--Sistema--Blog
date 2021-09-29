import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: "1.3em 0",
        textAlign: "center",
        borderTop: `2px solid ${theme.palette.grey[500]}`
    },
    footer__text: {
        fontSize: "0.8em",
        fontWeight: theme.typography.fontWeightRegular,
        color: "#636363",
    },
    footer__link: {
        fontSize: "0.8em",
        fontWeight: theme.typography.fontWeightRegular,
        color: theme.palette.primary.dark,
        textDecoration: "none"
    }
}));

function Footer() {

    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <p className={classes.footer__text}>Created by Felipe Schmidt</p>
            <a className={classes.footer__link} target="blank" href="https://www.github.com/FelipeESchmidt">Github</a>
        </footer>
    );
}

export default Footer;