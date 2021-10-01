import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import navigationReducer from './Navigation/Navigation.reducer';
import postsReducer from './Posts/Posts.reducer';

const composedEnhancer = applyMiddleware(thunkMiddleware);

const rootReducer = combineReducers({
    navigation: navigationReducer,
    posts: postsReducer
});

export const store = createStore(rootReducer, composedEnhancer);