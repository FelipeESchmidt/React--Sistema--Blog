import React from 'react';

import { useHistory } from 'react-router';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddBox as Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    criarCategoria: {
        width: "100%",
        marginTop: "0.5em",
        padding: "0.5rem",
        borderColor: "#66bb6a",
        color: "#66bb6a",
        "&:hover":{
            backgroundColor: "#beffc0"
        }
    }
}));


function BtnNewCategoria() {

    const classes = useStyles();
    const history = useHistory();

    function handleClick(){
        history.push("/createCategory");
    }

    return (
        <Button
            onClick={handleClick}
            className={classes.criarCategoria}
            variant="outlined"
            startIcon={<Add />}
        >
            Nova Categoria
        </Button>
    );
}

export default BtnNewCategoria;