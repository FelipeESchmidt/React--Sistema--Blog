import { getPosts } from "../../api/blog";
import { FILTER, REMOVE_FILTER, LOAD_API } from "./Posts.types";

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

function loadAPI(response) {
    return {
        type: LOAD_API,
        payload: response
    }
}

export async function fetchPosts(dispatch) {
    const response = await getPosts();
    dispatch(loadAPI(response));
}