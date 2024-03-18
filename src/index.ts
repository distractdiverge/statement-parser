import * as fs from 'fs';
import * as path from 'path';
import pdf from 'pdf-parse';

function main() {
    const filepath = path.join('data', 'sample.pdf');

    let dataBuffer = fs.readFileSync(filepath);
    pdf(dataBuffer).then(function(data) {
        console.log(`NumPages: ${data.numpages}`);

        console.log(`Text: ${data.text}`);
    });
}


main();
