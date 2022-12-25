module.exports = (plop) => {
  plop.setGenerator("new class", {
    description: "Create a boiler plate for a react component??",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Type the name of new class based react component",
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: "add",
        path: "./src/components/{{name}}.js",
        templateFile: "./plop_templates/newClass.hbs",
      },
    ], // array of actions
  });
};
