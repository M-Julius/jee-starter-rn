const yargs = require("yargs");

// template
const TEMPLATE_LIST = ["react-native (typescript)", "expo (typescript)"];

const REACT_DEFAULT_DEPEDENCY = [
  "@react-native-community/netinfo", 
  "@react-navigation/native", 
  "@react-navigation/stack", 
  "apisauce",
  "async-mutex",
  "formik",
  "i18n-js",
  "mobx",
  "mobx-react-lite",
  "mobx-state-tree",
  "react-native-gesture-handler",
  "react-native-mmkv",
  "react-native-reanimated",
  "react-native-root-toast",
  "react-native-safe-area-context",
  "react-native-screens",
  "react-native-use-modal@https://github.com/M-Julius/react-native-use-modal.git",
  "react-native-vector-icons",
  "yup"
].join(" ");

const EXPO_DEFAULT_DEPEDENCY = [
  "@react-native-community/netinfo",
  "@react-navigation/native",
  "@react-navigation/stack",
  "apisauce",
  "async-mutex",
  "expo-font",
  "expo-status-bar",
  "formik",
  "i18n-js",
  "mobx",
  "mobx-react-lite",
  "mobx-state-tree",
  "react-native-gesture-handler",
  "react-native-logs",
  "react-native-mmkv",
  "react-native-reanimated",
  "react-native-root-toast",
  "react-native-safe-area-context",
  "react-native-screens",
  "react-native-use-modal@https://github.com/M-Julius/react-native-use-modal.git",
  "yup",
].join(" ");

const DEV_DEFAULT_DEPEDENCY = [
  "reactotron-mst",
  "reactotron-react-native",
  "babel-plugin-root-import",
  "babel-plugin-inline-dotenv",
  "@types/react-native-vector-icons",
  "dotenv",
].join(" ");


const DEV_EXPO_DEFAULT_DEPEDENCY = [
  "dotenv",
  "babel-plugin-root-import",
  "babel-plugin-inline-dotenv",
  "eslint-plugin-react-hooks",
  "eslint-plugin-unused-imports",
  "eslint-plugin-jsx-a11y",
  "eslint-plugin-import",
  "eslint-config-airbnb-typescript",
  "eslint",
  "@typescript-eslint/parser",
  "@typescript-eslint/eslint-plugin",
].join(" ");

/** List of questions to be asked to the person who is trying to use this boilerplate
 * Question asked is projectName, bundle identifier, templateList
 */
const QUESTIONS = [
  {
    name: "name",
    type: "input",
    message: "Project name:",
    prefix: ">",
    when: () => !yargs.argv["name"],
    validate: (input) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
  },
  {
    name: "templateList",
    type: "list",
    message: "Choices template setup project",
    choices: TEMPLATE_LIST,
    when: () => !yargs.argv["templateList"],
  },
];

const JSON_SCRIPT = {
  "clean:android": "cd android && ./gradlew clean && cd ../",
  "build:android": "cd android && ./gradlew clean && ./gradlew assembleRelease",
  "pods:update": "cd ios && pod install --repo-update && cd ..",
  "gradle:clean": "cd android && ./gradlew clean && cd ..",
  "lint": "eslint --fix --ext .js,.jsx,.ts,.tsx .",
  "lint:test": "eslint --ext .js,.jsx,.ts,.tsx ."
};

const EXPO_JSON_SCRIPT = {
  "eject": "expo eject",
  "lint": "eslint --fix --ext .js,.jsx,.ts,.tsx .",
  "lint:test": "eslint --ext .js,.jsx,.ts,.tsx ."
};

module.exports = {
  REACT_DEFAULT_DEPEDENCY,
  DEV_DEFAULT_DEPEDENCY,
  QUESTIONS,
  TEMPLATE_LIST,
  JSON_SCRIPT,
  EXPO_DEFAULT_DEPEDENCY,
  DEV_EXPO_DEFAULT_DEPEDENCY,
  EXPO_JSON_SCRIPT,
};
