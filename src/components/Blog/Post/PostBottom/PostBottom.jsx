import React, { useContext } from 'react';

import { useHistory } from 'react-router';

import { Button, makeStyles, Typography } from '@material-ui/core';
import { Comment as CommentIcon, Edit as EditIcon } from '@material-ui/icons';

import PostContext from '../../../../contexts/PostContext';

const useStyles = makeStyles((theme) => ({
    bottom: {
        display: "flex",
        justifyContent: "space-between",
        color: theme.palette.grey[800]
    },
    comments: {
        display: "flex",
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        color: "inherit"
    },
    edit: {
        width: "35%",
        color: "inherit"
    },
    icon: {
        marginRight: "0.4em",
        fontSize: "1.2em",
        color: "inherit"
    }
}));

function PostBottom() {

    const classes = useStyles();
    const history = useHistory();
    const post = useContext(PostContext);

    function handleEdit(){
        history.push(`/editPost/${post.id}`);
    }

    return (
        <div className={classes.bottom}>
            <Typography className={classes.comments} variant="subtitle1" >
                <CommentIcon className={classes.icon} />
                {post.commentCount} {(post.commentCount < 1) ? 'comment' : 'comments'}
            </Typography>
            <Button 
                startIcon={<EditIcon />}
                onClick={handleEdit}
                className={classes.edit}
            >
                Edit
            </Button>
        </div>
    );
}

export default PostBottom;