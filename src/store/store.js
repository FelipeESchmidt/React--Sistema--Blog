import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import navigationReducer from './Navigation/Navigation.reducer';
import postsReducer from './Posts/Posts.reducer';
import singlePostsReducer from './SinglePost/SinglePost.reducer';
import categoriesReducer from './Categories/Categories.reducer';

const composedEnhancer = applyMiddleware(thunkMiddleware);

const rootReducer = combineReducers({
    navigation: navigationReducer,
    posts: postsReducer,
    singlePost: singlePostsReducer,
    categories: categoriesReducer
});

export const store = createStore(rootReducer, composedEnhancer);