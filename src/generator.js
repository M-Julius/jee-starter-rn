// import module
const ejs = require("ejs");
const fs = require("fs");
const chalk = require("chalk");
const shell = require('shelljs');

const { toDashize, toPascalCase } = require("./utils");

// get parameter
const [options, type, name] = process.argv.slice(2);

// get current directory
const CURR_DIR = process.cwd();

/**
 * get App.tsx current root project when use typescript returning tsx/ts
 * is index with default when file use jsx/tsx in components/screens
 * @param {isIndex} param
 */
function getExtensionsFile(isIndex) {
  // if project use typescript detect App.tsx, else return js extension
  if (fs.existsSync(`${CURR_DIR}/App.tsx`)) {
    if (isIndex) {
      return "tsx";
    } else {
      return "ts";
    }
  } else {
    return "js";
  }
}

// make main function
function runGenerator() {
  console.log("OPTIONS : ", {options, type, name})
  if (options == undefined) {
    console.log(chalk.red("Please select options"));
    return 0;
  } else if (name == undefined) {
    console.log(chalk.red("Please insert name of module!"));
  }

  const isGenerate = options == "-generate" || options == "generate" || options === "-g";

  // more options handle with arguments parameter
  if (isGenerate) {
    if (type === "model" || type === "-m" && name) {
      generateModel();
    } else if (type === "features" || type === 'feature' || type === "-f" && name) {
      generateFeature();
    } else {
      console.log(
        chalk.red(
          "Please select option type generator screens (-s), components (-c), redux (-r)"
        )
      );
    }
  }
}

/**
 * read the templates and write to destination output project
 * @param {fromFile, outFile} param
 */
function writeFile({ fromFile, outFile }) {
  fs.readFile(fromFile, "utf-8", function (err, buf) {
    if (err != null) {
      console.log(err);
      return false;
    }
    fs.writeFile(
      outFile,
      ejs.render(buf, { name: toPascalCase(name) }),
      (err) => {
        if (err != null) {
          console.log(err);
          return false;
        }

        return true;
      }
    );
  });
}

/**
 * get output dir, when file not exist make dir output
 * @param {namePath} param
 */
function getOutputDir(namePath) {
  const outputDir = `${CURR_DIR}/app/${namePath}`;
  if (!fs.existsSync(outputDir)) {
    // fs.mkdirSync(outputDir);
    shell.mkdir('-p', outputDir);
  }

  return outputDir;
}

function generateModel() {
  const outputDirModel = getOutputDir(`core/model/${toDashize(name)}`);

  const outputModel = `${outputDirModel}/${toDashize(name)}.ts`;

  writeFile({
    fromFile: `template/model/NAME.ts.ejs`,
    outFile: outputModel,
  });

  messageSuccesGenerated("Model");
}

function generateFeature() {
  // dir
  const dirScreens = getOutputDir(`features/${toDashize(name)}/screens`);
  const dirConfig = getOutputDir(`features/${toDashize(name)}/config`);

  // output file
  const outputFeatureScreen = `${dirScreens}/${toPascalCase(name)}.tsx`;
  const outputConfigNavigation = `${dirConfig}/Navigation.tsx`;
  const outputConfigScreenProps = `${dirConfig}/ScreenProps.ts`;
  const outputConfigScreens = `${dirConfig}/Screens.ts`;

  // screen generate
  writeFile({
    fromFile: `template/features/NAME.tsx.ejs`,
    outFile: outputFeatureScreen,
  });

  // config generate
  writeFile({
    fromFile: `template/features/Navigation.tsx.ejs`,
    outFile: outputConfigNavigation,
  });
  writeFile({
    fromFile: `template/features/ScreenProps.ts.ejs`,
    outFile: outputConfigScreenProps,
  });
  writeFile({
    fromFile: `template/features/Screens.ts.ejs`,
    outFile: outputConfigScreens,
  });

  messageSuccesGenerated("Feature");
}

// print success
function messageSuccesGenerated(module) {
  console.log(
    chalk.green(`${module} ${toPascalCase(name)} success generated!`)
  );
}

module.exports = {
  runGenerator
}
