const clone = require('clone');

const db = {};

const defaultData = {
  categories: [
    {
      name: 'React',
      path: 'react',
    },
    {
      name: 'Redux',
      path: 'redux',
    },
    {
      name: 'Compasso',
      path: 'compasso',
    },
  ],
};

function getData(token) {
  let data = db[token];

  if (!data) {
    data = db[token] = clone(defaultData);
  }
  return data;
}

function getAll(token) {
  return new Promise((res) => {
    res(getData(token));
  });
}

function add(token, categoria) {
  return new Promise((res) => {
    const categoriasData = getData(token);
    const categorias = categoriasData.categories;

    categorias.push(categoria);

    res("added");
  });
}

module.exports = {
  getAll,
  add,
};
