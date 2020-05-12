const { spawn } = require('child_process');
const testFolder = `${__dirname}//src//components`;
const fs = require('fs');

let bashArgs = [__dirname + '/complierAllScss.sh']

fs.readdirSync(testFolder).forEach(file => {
    bashArgs.push(file)
});

const ls = spawn('bash',bashArgs);
ls.stdout.on('data', (data) => {
  console.log(`complie scss: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`complie Error : ${data}`);
});

ls.on('close', (code) => {
  console.log(`complie scss finished`);
});