import { LOAD_API, REQUEST, CHANGE_ID } from "./SinglePost.types";

const defaultObject = {
    id: "",
    content: {},
    comments: [],
    loading: false
}

export default function reducer(state = defaultObject, action) {
    switch (action.type) {
        case CHANGE_ID:
            return { ...state, id: action.payload, loading: true }

        case REQUEST:
            return { ...state, loading: true };

        case LOAD_API:
            return { ...state, content: action.payload.post, comments: action.payload.comments, loading: false };

        default:
            return state;
    }
}