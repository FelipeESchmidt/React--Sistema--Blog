export default function reducer(state = 0, action) {
    switch (action.type) {
        case 'TOGGLE_NAV':            
            return action.payload;

        default:
            return state;
    }
}