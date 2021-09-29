import React from 'react';

import { Button } from '@material-ui/core';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import { AddBox as Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    criarCategoria: {
        width: "100%",
        marginTop: "0.5em",
        padding: "0.5rem"
    }
}));

const theme = createTheme({
    palette: {
        primary: {
            500: "#66bb6a",
        },
    },
});

function BtnNewCategoria() {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Button className={classes.criarCategoria}
                variant="outlined"
                color="primary"
                startIcon={<Add />}
            >
                Nova Categoria
            </Button>
        </ThemeProvider>
    );
}

export default BtnNewCategoria;