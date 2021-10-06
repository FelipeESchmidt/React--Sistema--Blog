import React from 'react';

import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { ArrowUpward as IconUP, ArrowDownward as IconDown, Comment as CommentIcon, Edit as EditIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        width: "350px",
        height: "250px",
        boxSizing: "border-box"
    },
    votes: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: "0 5px",
        height: "100%",
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
    },
    post: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    texts: {
        padding: "1em",
    },
    title: {
        minHeight: "3.8em",
        maxHeight: "3.8em",
        overflow: "hidden",
        marginBottom: "0.5em",
        color: "black",
        fontWeight: "bold",
    },
    body: {
        minHeight: "4.3em",
        maxHeight: "4.3em",
        overflow: "hidden",
        marginBottom: "0.5em",
        color: "black",
    },
    basic: {
        color: "#888",
        fontWeight: "300"
    },
    bottom: {
        display: "flex",
        justifyContent: "space-between"
    },
    comments: {
        display: "flex",
        width: "50%",
        alignItems: "center",
        justifyContent: "center"
    },
    edit: {
        width: "35%"
    },
    icon: {
        fontSize: "1.2em",
        marginRight: "0.4em"
    }
}));

function Post({ post }) {

    const classes = useStyles();

    function dateHelper(info, size) {
        let infoBetter = "0" + info;
        return infoBetter.substr(size * -1);
    }

    function dateTransform(timestamp) {
        const date = new Date(timestamp);
        const day = dateHelper(date.getDay(), 2);
        const month = dateHelper(date.getMonth(), 2);
        const year = dateHelper(date.getFullYear(), 4);
        const hours = dateHelper(date.getHours(), 2);
        const minutes = dateHelper(date.getMinutes(), 2);
        const seconds = dateHelper(date.getSeconds(), 2);
        const formatedDate = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
        return formatedDate;
    }

    function limitText(text, limiter) {
        return text.slice(0, limiter) + (text.length > limiter ? "..." : "");
    }
    console.log(post);
    return (
        <Grid item>
            <Paper className={classes.paper}>
                <div className={classes.votes}>
                    <IconUP className={`${classes.voteButton} ${classes.voteUP}`} />
                    <Typography className={classes.voteValue} variant="subtitle2">{post.voteScore}</Typography>
                    <IconDown className={`${classes.voteButton} ${classes.voteDOWN}`} />
                </div>
                <div className={classes.post}>
                    <div className={classes.texts}>
                        <Typography className={classes.title} variant="subtitle1">{post.title}</Typography>
                        <Typography className={classes.body} variant="subtitle2">{limitText(post.body, 100)}</Typography>
                        <Typography className={classes.basic} variant="subtitle2">Posted By {post.author}</Typography>
                        <Typography className={classes.basic} variant="subtitle2">{dateTransform(post.timestamp)}</Typography>
                    </div>
                    <div className={classes.bottom}>
                        <Typography className={classes.comments} variant="subtitle1" >
                            <CommentIcon className={classes.icon} />
                            {post.commentCount} {(post.commentCount < 1) ? 'comment' : 'comments'}
                        </Typography>
                        <Button startIcon={<EditIcon />} className={classes.edit}>Edit</Button>
                    </div>
                </div>
            </Paper>
        </Grid>
    );
}

export default Post;