import React, { useContext } from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { ArrowUpward as IconUP, ArrowDownward as IconDown } from '@material-ui/icons';

import CommentContext from '../../../../../contexts/CommentContext';

const useStyles = makeStyles((theme) => ({
    votes: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: "0 5px",
        borderRight: `1px solid ${theme.palette.grey[400]}`
    },
    voteButton: {
        borderRadius: "50%",
        cursor: "pointer",
        "&:hover, &:focus": {
            backgroundColor: theme.palette.grey[100]
        }
    },
    voteUP: {
        color: "green",
    },
    voteDOWN: {
        color: "red",
        cursor: "pointer"
    },
    voteValue: {
        fontWeight: "bold",
        fontSize: "1.1em"
    }
}));

function CommentVotes() {

    const classes = useStyles();
    const comment = useContext(CommentContext);

    return (
        <div className={classes.votes}>
            <IconUP className={`${classes.voteButton} ${classes.voteUP}`} />
            <Typography className={classes.voteValue} variant="subtitle2">{comment.voteScore}</Typography>
            <IconDown className={`${classes.voteButton} ${classes.voteDOWN}`} />
        </div>
    );
}

export default CommentVotes;