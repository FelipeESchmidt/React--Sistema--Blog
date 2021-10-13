import React, { useContext } from 'react';

import { useHistory } from 'react-router';

import { Button, makeStyles } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

import CommentContext from '../../../../../contexts/CommentContext';

const useStyles = makeStyles((theme) => ({
    bottom: {
        display: "flex",
        justifyContent: "space-between",
        color: theme.palette.grey[800]
    },
    edit: {
        width: "35%",
        color: "inherit"
    },
    delete: {
        width: "35%",
        color: "inherit"
    }
}));

function CommentBottom() {

    const classes = useStyles();
    const history = useHistory();
    const comment = useContext(CommentContext);

    function handleEdit(){
        history.push(`/editComment/${comment.id}`);
    }

    return (
        <div className={classes.bottom}>
            <Button 
                startIcon={<EditIcon />}
                onClick={handleEdit}
                className={classes.edit}
            >
                Edit
            </Button>
            <Button 
                startIcon={<DeleteIcon />}
                onClick={handleEdit}
                className={classes.delete}
            >
                Delete
            </Button>
        </div>
    );
}

export default CommentBottom;