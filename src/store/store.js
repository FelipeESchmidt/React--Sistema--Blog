import { createStore, combineReducers } from 'redux';

import navigationReducer from './Navigation/Navigation.reducer';

const rootReducer = combineReducers({
    navigation: navigationReducer
});

export const store = createStore(rootReducer);