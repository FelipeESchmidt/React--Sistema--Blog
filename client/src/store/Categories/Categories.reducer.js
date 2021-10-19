import { LOAD_API, REQUEST } from "./Categories.types";

const defaultObject = {
    categories: [],
    loading: false
}

export default function reducer(state = defaultObject, action) {
    switch (action.type) {
        case LOAD_API:
            return { ...state, categories: action.payload.categories, loading: false  }

        case REQUEST:
            return { ...state, loading: true };

        default:
            return state;
    }
}