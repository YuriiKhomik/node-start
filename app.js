// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");
const { program } = require("commander");

const movies = require("./movies");

// console.log("dirname for app from root: ", __dirname);

const invokeAction = async ({ action, id, title, director }) => {
  switch (action) {
    case "read":
      const allMovies = await movies.getAll();
      return console.log(allMovies);
    case "getById":
      const oneMovie = await movies.getById(id);
      return console.log(oneMovie);
    case "add":
      const newMovie = await movies.add({ title, director });
      return console.log(newMovie);
    case "updateById":
      const updateMovie = await movies.updateById(id, { title, director });
      return console.log(updateMovie);
    case "deleteById":
      const deleteMovie = await movies.deleteById(id);
      return console.log(deleteMovie);
    default:
      return console.log("Unknown action, dude");
  }
};

program
  .option("-a, --action, <type>")
  .option("-i, --id, <type>")
  .option("-t, --title, <type>")
  .option("-dr, --director, <type>");

program.parse();
const options = program.opts();
console.log(options);

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
// invokeAction(argv);

// invokeAction({ action: "show" });
// invokeAction({ action: "getById", id: "YxhM4QDxPeA3SmPHcEZPJ" });
// invokeAction({ action: "add", title: "Dune", director: "Denis Villeneuve" });
// invokeAction({
//   action: "updateById",
//   id: "Q1LE4P22Fnc_m3yamcGct",
//   title: "DuuuuneZZZ",
//   director: "Denis Villeneuve",
// });
// invokeAction({ action: "deleteById", id: "Q1LE4P22Fnc_m3yamcGct" });

// const actionIndex = process.argv.indexOf("--action");
// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   invokeAction({ action });
// }
