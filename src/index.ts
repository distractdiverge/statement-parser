import * as fs from 'fs';
import * as path from 'path';
import pdf from 'pdf-parse';
//import * as Tesseract from 'tesseract.js';
import pdftools from './pdftools.js';


async function convertPDFToImages(filepath: string): Promise<string[]> {
    const options: any = {
        outputType: 'jpg',
    };

    console.info(`converting file ${filepath}`);

    // TODO
    const imagePaths = pdftools.pagesToImages(filepath)

    // TODO

    return imagePaths;
}

async function extractTextFromImage(imagePath:string){}




async function main() {
    const filepath = path.join('.', 'data', 'sample.pdf');

    let imagePaths;
    
    try {
        imagePaths = await convertPDFToImages(filepath);
    } catch (err) {
        console.error(err);
    }

    console.log('success!');
    console.log(imagePaths);

    //let dataBuffer = fs.readFileSync(filepath);
    //const data = await pdf(dataBuffer)
    
    //console.log(`NumPages: ${data.numpages}`);

    //console.log(`Text: ${data.text}`);
}


try {
    main();
} catch( err ) {
    console.error(err);
}
