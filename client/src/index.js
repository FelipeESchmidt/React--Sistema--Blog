import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';

import { store } from './store/store';
import { fetchPosts } from './store/Posts/Posts.actions';
import { fetchCategories } from './store/Categories/Categories.actions';

store.dispatch(fetchPosts);
store.dispatch(fetchCategories);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);