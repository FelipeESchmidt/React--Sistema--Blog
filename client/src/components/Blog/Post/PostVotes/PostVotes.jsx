import React, { useContext } from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { ArrowUpward as IconUP, ArrowDownward as IconDown } from '@material-ui/icons';

import PostContext from '../../../../contexts/PostContext';
import { voteInPost } from '../../../../api/blog';
import { useDispatch } from 'react-redux';
import { newMessage } from '../../../../store/Alert/Alert.actions';
import { refreshPosts } from '../../../../store/Posts/Posts.actions';
import { refreshPost } from '../../../../store/SinglePost/SinglePost.actions';

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

function PostVotes({isSmall}) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useContext(PostContext);

    function handleVote(direction){
        voteInPost(direction, post.id);
        const alert = {
            message: `Post ${post.title} sucessfuly voted!`,
            type: "success"
        }
        dispatch(newMessage(alert));
        setTimeout(() => {
            if(!isSmall) dispatch(refreshPost);
            dispatch(refreshPosts);
        }, 200);
    }

    return (
        <div className={classes.votes}>
            <IconUP className={`${classes.voteButton} ${classes.voteUP}`} onClick={() => handleVote("upVote")} />
            <Typography className={classes.voteValue} variant="subtitle2">{post.voteScore}</Typography>
            <IconDown className={`${classes.voteButton} ${classes.voteDOWN}`} onClick={() => handleVote("downVote")} />
        </div>
    );
}

export default PostVotes;