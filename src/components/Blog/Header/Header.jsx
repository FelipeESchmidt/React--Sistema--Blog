import React, { useState } from 'react';
import { TextField, IconButton, Button, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { ArrowUpward as IconUP, ArrowDownward as IconDown, AddCircle } from '@material-ui/icons';
import { useHistory } from 'react-router';

const options = ['Evaluation', 'Date'];

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    buttonOrder: {
        marginRight: "8px",
        padding: "8px",
    },
    buttonNewPost: {
        marginLeft: "8px",
    }
}));

function Header() {

    const classes = useStyles();
    const [i, setI] = useState(false);

    const history = useHistory();

    function handleNewPost(e){
        history.push("/createPost");
    }

    return (
        <main className={classes.root}>
            <IconButton
                className={classes.buttonOrder}
                onClick={e => setI(!i)}
            >
                {i ? <IconDown /> : <IconUP />}
            </IconButton>
            <Autocomplete
                // value={value}
                // onChange={(event, newValue) => {
                //     setValue(newValue);
                // }}
                id="orderBy"
                options={options}
                style={{ width: 300 }}
                size="small"
                renderInput={(params) => <TextField {...params} label="Order By" variant="outlined" />}
            />
            <Button
                variant="contained"
                color="default"
                className={classes.buttonNewPost}
                startIcon={<AddCircle />}
                onClick={handleNewPost}
            >
                New Post
            </Button>
        </main>
    );
}

export default Header;