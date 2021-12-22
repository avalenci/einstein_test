const fs = require('fs');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const jsonObject = {};
readline.question('Enter file directory: ', dir => {
    fs.readFile(dir, 'utf8' , (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        data.split(/\r?\n/).forEach(line =>  {
            const formattedLine = line.replace(/\s/g, '');
            if (formattedLine[0] !== '#' && formattedLine !== "") {
                const keyValAry = formattedLine.replace(/\s/g, '').toLocaleLowerCase().split('=');
                if (keyValAry.length !== 2) {
                    console.log("Invalid config value: " + line);
                } else if (keyValAry[1] === 'true' || keyValAry[1] === 'on' || keyValAry[1] === 'yes') {
                    jsonObject[keyValAry[0]] = true;
                } else if (keyValAry[1] === 'false' || keyValAry[1] === 'off' || keyValAry[1] === 'no') {
                    jsonObject[keyValAry[0]] = false;
                } else if (!isNaN(Number(keyValAry[1]))) {
                    jsonObject[keyValAry[0]] = Number(keyValAry[1]);
                } else {
                    jsonObject[keyValAry[0]] = keyValAry[1];
                }
            }
        });
        console.log('Object is ready:')
        console.log(jsonObject);
    });
    readline.close();
});
