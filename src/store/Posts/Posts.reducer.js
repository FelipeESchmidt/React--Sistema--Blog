import { FILTER, LOAD_API } from "./Posts.types";

const defaultObject = {
    allPosts: [],
    visiblePosts: []
}

export default function reducer(state = defaultObject, action) {
    switch (action.type) {
        case FILTER:
            return { ...state, visiblePosts: state.allPosts.filter(post => post['category'] === action.payload) }

        case LOAD_API:
            return { ...state, allPosts: action.payload, visiblePosts: action.payload };

        default:
            return state;
    }
}