const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const moviesPath = path.join(__dirname, "movies.json");

const getAll = async () => {
  const data = await fs.readFile(moviesPath);
  return JSON.parse(data);
};

const getById = async (id) => {
  const movieId = String(id);
  const movies = await getAll();
  const result = movies.find((item) => item.id === movieId);
  return result || null;
};

const add = async (data) => {
  const movies = await getAll();
  const newMovie = {
    id: nanoid(),
    ...data,
  };
  movies.push(newMovie);
  await fs.writeFile(moviesPath, JSON.stringify(movies, null, 2));
  return newMovie;
};

const updateById = async (id, data) => {
  const movieId = String(id);
  const movies = await getAll();
  const index = movies.findIndex((item) => item.id === movieId);
  if (index === -1) {
    return null;
  }
  movies[index] = { id, ...data };
  await fs.writeFile(moviesPath, JSON.stringify(movies, null, 2));
  return movies[index];
};

const deleteById = async (id) => {
  const movieId = String(id);
  const movies = await getAll();
  const index = movies.findIndex((item) => item.id === movieId);
  if (index === -1) {
    return null;
  }
  const [result] = movies.splice(index, 1);
  await fs.writeFile(moviesPath, JSON.stringify(movies, null, 2));
  return result;
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};
