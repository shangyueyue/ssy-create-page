#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');
const inquirer = require('inquirer');
const colors = require('colors/safe');
const pkg = require('../package.json');
const createTemplate = require('./utils/helper');

program
  .version(pkg.version, '-v, --version')
  .option('-d --dirname <value>')
  .parse(process.argv);

if (!program.dirname) {
  console.log(colors.red('请通过 -d 指定输出文件目录'));
  process.exit();
}

const questions = [
  {
    type: 'input',
    name: 'pageName',
    message: 'pageName:',
  },
];
inquirer
  .prompt(questions)
  .then(answers => {
    if (!answers.pageName) {
      throw new Error('没有输入pageName');
    }
    // 判断dirname是否存在;
    process.env.CLASS_NAME = answers.pageName.replace(/pages?/i, '');
    const OUTPUT_PATH = path.join(process.cwd(), program.dirname, process.env.CLASS_NAME);
    process.env.OUTPUT_PATH = OUTPUT_PATH; // 将输出目录绑定到process.env
    if (fs.existsSync(OUTPUT_PATH)) {
      throw new Error('目录应经存在');
    }
    return answers.pageName;
  })
  .then(() => {
    main();
  })
  .catch(err => {
    console.log(colors.red(err.message));
    process.exit();
  });

function main() {
  const templateDirname = path.resolve(__dirname, './template');
  const templateFiles = fs.readdirSync(templateDirname);
  templateFiles.forEach(file => {
    const templateFile = path.join(templateDirname, file);
    const outputFile = path.join(process.env.OUTPUT_PATH, file.replace(/\.ejs/, '.js'));
    console.log(templateFile, outputFile);
    createTemplate(templateFile, outputFile);
  });
}
