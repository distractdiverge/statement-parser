import { strict as assert } from 'assert';
import pdfjs from 'pdfjs-dist';
import Canvas from 'canvas';
import fs from 'fs';
import { PDFDocumentLoadingTask, getDocument } from 'pdfjs-dist/types/src/display/api';

type CanvasAndContext = {
    canvas: Canvas.Canvas | null | undefined;
    context: Canvas.CanvasRenderingContext2D | null | undefined;
}

class NodeCanvasFactory {
    create(width: number, height: number) {
        assert(width > 0 && height > 0, "Invalid canvas height or width");
        const canvas = Canvas.createCanvas(width, height);
        const context = canvas.getContext('2d');
        return {
            canvas,
            context
        }
    }
    
    reset(canvasAndContext: CanvasAndContext, width: number, height: number) {
        assert(canvasAndContext.canvas, 'Canvas is not specified');
        assert(width > 0 && height > 0, 'Invalid canvas size');

        canvasAndContext.canvas.width = width;
        canvasAndContext.canvas.height = height;
    }

    destroy(canvasAndContext: CanvasAndContext) {
        assert(canvasAndContext.canvas, 'Canvas is not specified');

        canvasAndContext.canvas.width = 0;
        canvasAndContext.canvas.height = 0;
        canvasAndContext.canvas = null;
        canvasAndContext.context = null;
    }
}

const pagesToImages = async function (pdfFilePath: string) : Promise<string[]> {
    const imagePaths: string[] = [];

    const canvasFactory = new NodeCanvasFactory();

    const data = new Uint8Array(fs.readFileSync(pdfFilePath));

    const loadingTask = getDocument({
        data,
        // cMapUrl: CMAP_URL,
        // cMapPacked: CMAP_PACKED,
        // standardFontDataUrl: STANDARD_FONT_DATA_URL,
        canvasFactory
    })

    const pdfDocument = await loadingTask.promise;



    return imagePaths;
}

export default {
    pagesToImages,
};
