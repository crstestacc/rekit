/*
  Add test file for page, component, action or reducer.
  Usage:
  node add_test.js -[a|c|p|s] feature-name/target-name
*/
const path = require('path');
const _ = require('lodash');
const shell = require('shelljs');
const helpers = require('./helpers');

const testPath = path.join(__dirname, '../test/app');

let testType = (process.argv[2] || '').replace('-', '').toLowerCase();
const arr = (process.argv[3] || '').split('/');
let featureName = _.kebabCase(arr[0]);
let targetName = arr[1];

if (!targetName) {
  targetName = featureName;
  featureName = '';
}

if (!targetName) {
  throw new Error('Please specify the target name');
}

const context = {
};


let targetPath;
let template;
switch (testType) {
  case 'c':
  case 'p': {
    targetName = helpers.pascalCase(targetName);
    targetPath = path.join(testPath, featureName ? `features/${featureName}/${targetName}.test.js`
      : `components/${targetName}.test.js`);
    template = helpers.readTemplate(testType === 'p' ? 'page_test.js' : 'component_test.js');
    shell.ShellString(helpers.processTemplate(template, context)).to(targetPath);
    break;
  }
  case 'a':
    targetName = _.camelCase(targetName);
    targetPath = path.join(testPath, `features/${featureName}/actions.test.js`);
    break;
  case 'aa':
    break;
  default:
    throw new Error('Unknown target type: ', testType);
}
