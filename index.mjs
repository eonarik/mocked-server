import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

import handleRequest from './handleRequest';

const PORT = 3001;

const getFiles = function (dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  files_.sort((a, b) => a > b ? -1 : 1);
  return files_;
};

// создаем объект приложения
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const files = getFiles('mock-server/__mocks__/api');

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const matches = file.match(/(api\/.+)\/(GET|POST|DELETE|PATCH|PUT)/i);
  if (matches && matches.length) {
    const [_, url, method] = matches;
    app[method.toLowerCase()](`/${url}`, handleRequest);
  }
}

app.listen(PORT);

app.use("/api/*", handleRequest);

console.log('start mock-server');

process.on("SIGINT", () => {
  process.exit();
});
