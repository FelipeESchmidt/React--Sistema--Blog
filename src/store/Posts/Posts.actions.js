import { getPosts } from "../../api/blog";

export function filterPosts(filter) {
    return {
        type: 'FILTER',
        payload: filter
    }
}

export function removeFilters() {
    return {
        type: 'REMOVE_FILTER',
        payload: ''
    }
}

export async function fetchPosts(dispatch, getState) {
    const response = await getPosts();
    dispatch({ type: 'LOAD/API', payload: response });
}