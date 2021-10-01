const defaultObject = {
    allPosts: [],
    visiblePosts: []
}

export default function reducer(state = defaultObject, action) {
    switch (action.type) {
        case 'FILTER':
            return { ...state, visiblePosts: state.allPosts.filter(post => post['category'] === action.payload) }

        case 'REMOVE_FILTER':
            return { ...state, visiblePosts: state.allPosts };

        case 'LOAD/API':
            return { ...state, allPosts: action.payload };

        default:
            return state;
    }
}