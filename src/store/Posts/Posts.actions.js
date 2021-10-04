import { getPosts } from "../../api/blog";
import { FILTER, LOAD_API } from "./Posts.types";

export function filterPosts(filter) {
    return {
        type: FILTER,
        payload: filter
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