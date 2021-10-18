import { getPosts } from "../../api/blog";
import { FILTER, REMOVE_FILTER, LOAD_API, REQUEST, ORDER, DISORDER, CHANGE_DIRECTION, ADD } from "./Posts.types";

export function filterPosts(filter) {
    return {
        type: FILTER,
        payload: filter
    }
}

export function unfilterPosts() {
    return {
        type: REMOVE_FILTER,
        payload: ""
    }
}

export function orderPostsBy(order) {
    return {
        type: ORDER,
        payload: order
    }
}

export function disorderPosts(order) {
    return {
        type: DISORDER,
        payload: ""
    }
}

export function changeOrderDirection() {
    return {
        type: CHANGE_DIRECTION,
        payload: ""
    }
}

export function addPost(post){
    return {
        type: ADD,
        payload: post
    }
}

function loadAPI(response) {
    return {
        type: LOAD_API,
        payload: response
    }
}

function startRequest() {
    return {
        type: REQUEST,
        payload: ''
    }
}

export async function fetchPosts(dispatch) {
    dispatch(startRequest());
    const response = await getPosts();
    dispatch(loadAPI(response));
}

export async function refreshPosts(dispatch) {
    const response = await getPosts();
    dispatch(loadAPI(response));
}