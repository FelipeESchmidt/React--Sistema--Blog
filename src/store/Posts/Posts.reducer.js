import { FILTER, REMOVE_FILTER, LOAD_API, REQUEST, ORDER, DISORDER, CHANGE_DIRECTION, ADD } from "./Posts.types";

const defaultObject = {
    allPosts: [],
    visiblePosts: [],
    order: {
        by: {
            label: "",
            value: ""
        },
        direction: ""
    },
    loading: false
}

export default function reducer(state = defaultObject, action) {
    switch (action.type) {
        case FILTER:
            return {
                ...state,
                visiblePosts: state.allPosts.filter(post => post['category'] === action.payload),
                order: {
                    by: { label: "", value: "" },
                    direction: ""
                }
            };

        case REMOVE_FILTER:
            return {
                ...state,
                visiblePosts: state.allPosts,
                order: {
                    by: { label: "", value: "" },
                    direction: ""
                }
            };

        case REQUEST:
            return { ...state, loading: true };

        case LOAD_API:
            return { ...state, allPosts: action.payload, visiblePosts: action.payload, loading: false };

        case ORDER:
            return {
                ...state,
                visiblePosts: state.visiblePosts.sort((p1, p2) => {
                    return (p1[action.payload.value] > p2[action.payload.value]) ? -1 : 1;
                }),
                order: {
                    by: action.payload,
                    direction: "UP"
                }
            };

        case DISORDER:
            return {
                ...state,
                order: {
                    by: { label: "", value: "" },
                    direction: ""
                }
            };

        case CHANGE_DIRECTION:
            return {
                ...state,
                visiblePosts: state.visiblePosts.reverse(),
                order: { ...state.order, direction: (state.order.direction === "UP") ? "DOWN" : "UP" }
            };

        case ADD:
            state.allPosts.push(action.payload);
            return {
                ...state,
                allPosts: state.allPosts,
                visiblePosts: state.allPosts,
                order: {
                    by: { label: "", value: "" },
                    direction: ""
                }
            };

        default:
            return state;
    }
}