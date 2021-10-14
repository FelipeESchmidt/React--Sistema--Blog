import React, { useContext } from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { ArrowUpward as IconUP, ArrowDownward as IconDown } from '@material-ui/icons';

import CommentContext from '../../../../../contexts/CommentContext';
import { useDispatch } from 'react-redux';
import { voteInComment } from '../../../../../api/blog';
import { newMessage } from '../../../../../store/Alert/Alert.actions';
import { fetchPost } from '../../../../../store/SinglePost/SinglePost.actions';

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
    const dispatch = useDispatch();
    const comment = useContext(CommentContext);

    function handleVote(direction){
        voteInComment(direction, comment.id);
        const alert = {
            message: `Sucessfuly voted in comment!`,
            type: "success"
        }
        dispatch(newMessage(alert));
        setTimeout(() => {
            dispatch(fetchPost);
        }, 200);
    }

    return (
        <div className={classes.votes}>
            <IconUP className={`${classes.voteButton} ${classes.voteUP}`} onClick={() => handleVote("upVote")} />
            <Typography className={classes.voteValue} variant="subtitle2">{comment.voteScore}</Typography>
            <IconDown className={`${classes.voteButton} ${classes.voteDOWN}`} onClick={() => handleVote("downVote")} />
        </div>
    );
}

export default CommentVotes;