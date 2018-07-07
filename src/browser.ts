import * as QRCode from 'qrcode';
import {
  QRCodeMakerOptions,
  QRCodeOptions,
  ImageElementOptions,
  ImageDataOptions,
  QRCodeTextOptions,
} from '../types';

const defaultOptions = {
  content: 'From QRCodeMaker',
  margin: 1,
  type: 'image/png',
};

const defaultBackgroundOptions = {
  x: 0,
  y: 0,
};

const defaultExplainOptions = {
  x: 0,
  y: 0,
  color: '#000000',
  font: '16px Arial',
  align: 'center',
};

export class QRCodeMaker {
  public generated: boolean;
  public options: QRCodeOptions;
  public canvas: HTMLCanvasElement;

  constructor(options: QRCodeMakerOptions) {
    if (!(this instanceof QRCodeMaker)) {
      return new QRCodeMaker(options);
    }
    this.generated = false;
    this.options = Object.assign({}, defaultOptions,
      typeof options === 'string' ? {
        content: options,
      } : options);
    this.canvas = document.createElement('canvas');
  }

  async generate() {
    const { content, width, background, comment } = this.options;
    const dataUrl = await QRCode.toDataURL(content, this.options);
    const qrcodeImageElement = await this.createImageElement({
      image: dataUrl,
      width,
      height: width,
    });
    const qrcodeImageData = await this.createImageData(qrcodeImageElement, {
      x: 0,
      y: 0,
      width,
      height: width, 
    }, this.canvas);

    // if background existed
    if (background) {
      const bg = Object.assign({}, defaultBackgroundOptions,
        typeof background === 'string' ? { image: background } : background);
      const bgImageData = await this.createImageData(bg, {
        x: bg.x,
        y: bg.y,
        width: qrcodeImageElement.width,
        height: qrcodeImageElement.height,
      }, this.canvas);
      // merge qrcode ImageData and background ImageData
      for (let i = 0; i < bgImageData.data.length; i += 4) {
        for (let j = 0; j < 3; ++j) {
          bgImageData.data[i + j] =
            bgImageData.data[i + j] | qrcodeImageData.data[i + j];
        }
      }
      this.putImageData(bgImageData, bg.x, bg.y);
    }

    if (comment) {
      const text = Object.assign({}, defaultExplainOptions,
        typeof comment === 'string' ? { text: comment } : comment);
      this.fillText(text);
    }

    this.generated = true;
  }

  createImageElement(options: ImageElementOptions) {
    // get image element 
    return new Promise<HTMLImageElement>((resolve, reject) => {
      if (options.image instanceof HTMLImageElement) {
        resolve(options.image);
      } else {
        const element = new Image();
        // dataurl set crossOrigin cause error in safari
        if (!options.image.startsWith('data:image')) {
          element.crossOrigin = 'anonymous';
        }
        element.src = options.image;
        if (options.width) {
          element.width = options.width;
        }
        if (options.height) {
          element.height = options.height;
        }
        element.onload = () => resolve(element);
        element.onerror = reject;
      }
    });
  }

  async createImageData(
    image: HTMLImageElement | ImageElementOptions,
    options: ImageDataOptions,
    canvas?: HTMLCanvasElement,
  ) {
    const element: HTMLImageElement = image instanceof HTMLImageElement ?
      image : (await this.createImageElement(image));
    const width = image.width || element.width;
    const height = image.height || element.height;
    // create canvas and get ImageData
    canvas = canvas || document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    // draw image
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('get 2d context failed');
    }
    context.drawImage(element, 0, 0, width, height);
    return context.getImageData(
      options.x || 0,
      options.y || 0,
      options.width || width,
      options.height || height
    );
  }

  putImageData(imageData: ImageData, x?: number, y?: number) {
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('get 2d context failed');
    }
    context.putImageData(imageData, x || 0, y || 0);
  }

  fillText(options: QRCodeTextOptions) {
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('get 2d context failed');
    }
    context.font = options.font || '';
    context.textAlign = options.align || '';
    context.fillStyle = options.color || '';
    context.fillText(options.text, options.x || 0, options.y || 0);
  }

  async toDataURL() {
    if (!this.generated) {
      await this.generate();
    }
    return this.canvas.toDataURL(this.options.type, this.options.quality);
  }

  async toImage() {
    const dataUrl = await this.toDataURL();
    const img = document.createElement('img');
    img.src = dataUrl;
    return img;
  }

  async toCanvas() {
    if (!this.generated) {
      await this.generate();
    }
    return this.canvas;
  }
}

export async function toDataURL(options: QRCodeMakerOptions) {
  return await (new QRCodeMaker(options)).toDataURL();
}

export async function toImage(options: QRCodeMakerOptions) {
  return await (new QRCodeMaker(options)).toImage();
}

export async function toCanvas(options: QRCodeMakerOptions) {
  return await (new QRCodeMaker(options)).toCanvas();
}
