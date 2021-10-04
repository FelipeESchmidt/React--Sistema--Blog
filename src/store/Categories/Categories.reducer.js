import { LOAD_API } from "./Categories.types";

export default function reducer(state = [], action) {
    switch (action.type) {
        case LOAD_API:
            return action.payload.categories;

        default:
            return state;
    }
}