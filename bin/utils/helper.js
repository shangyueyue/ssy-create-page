const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const colors = require('colors/safe');

// 递归创建目录 同步方法
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
}

function renderFile(templateFile) {
  const p = new Promise((resolve, reject) => {
    const cName = process.env.CLASS_NAME[0].toUpperCase() + process.env.CLASS_NAME.slice(1);
    const namespace = process.env.CLASS_NAME;
    ejs.renderFile(templateFile, { cName, namespace }, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  return p;
}
async function createTemplate(templateFile, outputFile) {
  try {
    const datas = await renderFile(templateFile);
    const dirname = path.dirname(outputFile);
    // 创建目录
    mkdirsSync(dirname);
    fs.writeFile(outputFile, datas, err => {
      if (err) {
        console.log(colors.red(err));
      } else {
        console.log(colors.green(`${path.basename(outputFile)} create success!`));
      }
    });
  } catch (error) {
    console.log(colors.red(error));
  }
}

module.exports = createTemplate;
