const api = "https://compasso-blog-api.herokuapp.com";

window.token = localStorage.token;
if (!window.token) {
  // truque sujo pra sair logado
  window.token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
  Accept: 'application/json',
  Authorization: window.token
}

export function getPosts() {
  return new Promise((resolve, reject) => {
    fetch(api + '/posts', { headers })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(reject)
  })
}

export function getCategorias() {
  return new Promise((resolve, reject) => {
    fetch(api + '/categories', { headers })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(reject)
  })
}

export async function getFullPost(id) {
  const post = await getPost(id);
  const postComments = await getPostCommets(id);
  return {
    post: post,
    comments: postComments
  }
}

function getPost(id) {
  return new Promise(function (resolve, reject) {
    fetch(api + `/posts/${id}`, { headers })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(reject)
  })
}
function getPostCommets(id) {
  return new Promise(function (resolve, reject) {
    fetch(api + `/posts/${id}/comments`, { headers })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(reject)
  })
}

export function createPost(post) {
  return new Promise((resolve, reject) => {
    fetch(api + '/posts', {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...post })
    }).then(response => response.json())
      .then(data => resolve(data))
      .catch(reject);
  });
}

export function createCategory(category) {
  return new Promise((resolve, reject) => {
    fetch(api + '/categories', {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...category })
    }).then(response => response.json())
      .then(data => resolve(data))
      .catch(reject);
  });
}

export function searchBooks(query) {
  return new Promise((resolve, reject) => {
    fetch(`${api}/search`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    }).then(response => response.json())
      .then(data => resolve(data))
      .catch(reject)
  })
}