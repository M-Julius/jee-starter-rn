#!/usr/bin/env node

// Import statements, these are the one which is used to setup the boilerplate*/
const inquirer = require("inquirer");
const path = require("path");
const shell = require("shelljs");
const chalk = require("chalk");
const yargs = require("yargs");
const fs = require("fs");
const {Listr} = require('listr2')


// local importing module
const { runGenerator } = require("./src/generator");
const {
  REACT_DEFAULT_DEPEDENCY,
  DEV_DEFAULT_DEPEDENCY,
  QUESTIONS,
  TEMPLATE_LIST,
  JSON_SCRIPT,
  EXPO_DEFAULT_DEPEDENCY,
  DEV_EXPO_DEFAULT_DEPEDENCY,
  EXPO_JSON_SCRIPT,
} = require("./src/constants");

// argument from other function
const args = process.argv.slice(2);

// get current directory
const CURR_DIR = process.cwd();

// get the root app path
const ROOT_APP = path.resolve(__dirname);

// startup when called this index
function main() {
  if (args.length !== 0) {
    runGenerator();
  } else {
    promptQuestion();
  }
}

// prompt all questions
async function promptQuestion() {
  console.log(chalk.red("** Starter Project React Native **"));
  inquirer.prompt(QUESTIONS).then(async (answers) => {
    // assigning the object answer
    answers = Object.assign({}, answers, yargs.argv);

    // get all answers
    const projectName = answers["name"];
    const choicesTemplate = answers["templateList"];

    console.log(chalk.cyan("\n\nProject is cooking...\n"));

    /**
     * Start the process of creating a react native project using given project name.
     */
    const tasks = new Listr([
      {
        title: `Create ${choicesTemplate.includes('expo') ? 'Expo' : 'React Native'} App`,
        options: {showTimer: true},
        task: async (ctx, task) => await createNativeApp({ projectName, choicesTemplate, ctx, task }),
      },
      {
        title: 'Add Dependency',
        enabled: ctx => ctx.rnAvailable,
        skip: ctx => !ctx.rnAvailable,
        options: {showTimer: true},
        task: async (ctx, task) => await addDependencyPackage({ projectName, choicesTemplate, ctx, task }),
      },
      {
        title: 'Copy Template Project',
        enabled: ctx => ctx.rnAvailable,
        skip: ctx => !ctx.rnAvailable,
        options: {showTimer: true},
        task: async () => await copyStarterKit({ projectName, choicesTemplate }),
      },
      {
        title: 'Setup Project',
        enabled: ctx => ctx.rnAvailable,
        skip: ctx => !ctx.rnAvailable,
        options: {showTimer: true},
        task: async () => await writeScriptsJson({ choicesTemplate }),
      }
    ])

    tasks.run().catch(err => {
      console.error(err);
    });    
  });
}

/**
 * This function is used to create the native app using the projectName given from the user.
 * This function will execute the react native cli to create the project.
 * @param {project name from the user} projectName
 */
function createNativeApp({ projectName, choicesTemplate, task, ctx }) {
  // initialize the commant object to execute
  let cmd = "";

  /**
   * switch the templates list
   * if it use typescript, set the init command for setup with typescript mode, else setup with default mode javascript
   */
  switch (choicesTemplate) {
    case TEMPLATE_LIST[1]:
    cmd = `npx create-expo-app ${projectName} -t expo-template-blank-typescript`;
      break;
    default:
      cmd = `npx react-native init ${projectName} --template react-native-template-typescript --skip-install`;
      break;
  }

  /**
   * if command is set, need to execute the command using shell
   * check the status of executed code and return it to the user.
   */
  if (cmd) {
    // execuate the command using shell
    const result = shell.exec(cmd, {silent: true});

    // check resultant of executed command
    if (result.code !== 0) {
      console.log(chalk.red("React native app cannot be created"));
      task.skip()
      ctx.rnAvailable = false;
    }
    console.log(chalk.green("React native app successfully created"));
    ctx.rnAvailable = true;
  }
  ctx.rnAvailable = true;
}

/**
 * This function is used to add the dependency given from user input
 * Package is added based on user input
 * @param {projectName} options
 */
function addDependencyPackage(options) {
  // the target path
  const tartgetPath = path.join(CURR_DIR, options.projectName);

  // set the targetpath
  shell.cd(tartgetPath);

  // set the command
  let cmd = "";

  let appDepedency;
  let devDepedency;
  switch (options.choicesTemplate) {
    case TEMPLATE_LIST[1]:
      appDepedency = EXPO_DEFAULT_DEPEDENCY;
      devDepedency = DEV_EXPO_DEFAULT_DEPEDENCY;
      break;
    default:
      appDepedency = REACT_DEFAULT_DEPEDENCY;
      devDepedency = DEV_DEFAULT_DEPEDENCY;
      break;
  }

  /**
   * check the system contains yarn
   * if not install with npm, else add the packages using yarn
   */
  if (shell.which("yarn")) {
    /**
     * this is for yarn
     * create a command for adding the pacakges
     * check with user given parameter and add them in package list
     */
    cmd = `yarn && yarn add ${appDepedency} && yarn add --dev ${devDepedency}`;
  } else if (shell.which("npm")) {
    /**
     * this is for npm
     * create a command for adding the pacakges
     * check with user given parameter and add them in package list
     */
    cmd = `npm install && npm install --save ${appDepedency} && npm install --save-dev ${devDepedency}`;
  }
  /**
   * Execute the shell command
   */
  const dependency = shell.exec(cmd, {silent: true});
  /**
   * Check the resultant of dependency added
   */
  if (dependency.code !== 0) {
    console.log(chalk.red("Dependency packages not installed "));
    return false;
  }

  return true;
}

/**
 * This function is used to copy template to root project
 * @param {projectName, choicesTemplate} options
 */
function copyStarterKit(options) {
  // switch directory path template
  let template;
  switch (options.choicesTemplate) {
    case TEMPLATE_LIST[1]:
      template = "expo-starter/ts/*";
      break;
    default:
      template = "react-native-starter/ts/*";
      break;
  }

  // the target path
  const tartgetPath = path.join(CURR_DIR, options.projectName);

  // copy all folder templates to root project
  shell.cp("-rf", `${ROOT_APP}/src/templates/${template}`, tartgetPath);

  // in the templates folder there is no dot file, you can change the name, via the command below
  shell.mv("_eslintrc.js", ".eslintrc.js");
  shell.mv("_eslintignore", ".eslintignore");
  shell.mv("_env.example", ".env.example");
  shell.mv("_gitignore", ".gitignore");
  shell.mv("_prettierrc.js", ".prettierrc.js")
  console.log(chalk.green("Starterkit project is copied!"));
}

/**
 * This function is used to write scripts to package.json file.
 */
function writeScriptsJson(options) {
  // read package json
  let packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const scriptsJson = options.choicesTemplate.includes('expo') ? EXPO_JSON_SCRIPT : JSON_SCRIPT

  // every script from configuration is rewritten to packageJson
  Object.keys(scriptsJson).forEach((key) => {
    // append scripts
    packageJson.scripts[key] = scriptsJson[key];
  });

  // rewrite file package.json
  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
}


main();
