import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import navigationReducer from './Navigation/Navigation.reducer';
import postsReducer from './Posts/Posts.reducer';
import categoriesReducer from './Categories/Categories.reducer';

const composedEnhancer = applyMiddleware(thunkMiddleware);

const rootReducer = combineReducers({
    navigation: navigationReducer,
    posts: postsReducer,
    categories: categoriesReducer
});

export const store = createStore(rootReducer, composedEnhancer);