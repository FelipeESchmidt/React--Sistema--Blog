import { getFullPost } from "../../api/blog";
import { LOAD_API, REQUEST, CHANGE_ID } from "./SinglePost.types";

export function changePost(id) {
    return {
        type: CHANGE_ID,
        payload: id
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

export async function fetchPost(dispatch, getState) {
    const id = getState().singlePost.id;
    dispatch(startRequest());
    const response = await getFullPost(id);
    dispatch(loadAPI(response));
}