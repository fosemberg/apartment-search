const fs = require('fs');

fileName = 'addresses';

const inputFile = `./${fileName}.txt`;
const outFile = `../docs/data/${fileName}.js`;

fs.readFile(inputFile, 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);

    const arr = data.split('\n');

    const addresses = [];

    for (let i = 0; i < arr.length; i += 3) {
        let address = arr[i];
        let point = arr[i + 1];
        // let point = pointStr.split(', ');
        addresses.push({address, point});
        console.log(addresses);
    }

    const outData = `addresses = ${JSON.stringify(addresses, undefined, 2)}`;

    fs.writeFile(outFile, outData, function (err) {
        if (err) return console.log(err);
    });
});



