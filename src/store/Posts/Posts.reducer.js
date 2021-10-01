const defaultObject = {
    allPosts: [],
    visiblePosts: []
}

export default function reducer(state = defaultObject, action) {
    switch (action.type) {
        case 'GET':
            return action.payload;
        
        case 'FILTER':
            return action.payload;

        default:
            return state;
    }
}