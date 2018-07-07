import JIMP from "jimp";
import * as QRCode from 'qrcode';
import {
  QRCodeMakerOptions,
  QRCodeOptions,
} from '../types';

const Jimp = require('jimp');
const defaultOptions = {
  content: 'From QRCodeMaker',
  margin: 1,
  width: 200,
};

const defaultBackgroundOptions = {
  width: 200,
  height: 200,
  x: 0,
  y: 0,
};

export class QRCodeMaker {
  public options: QRCodeOptions;

  constructor(options: QRCodeMakerOptions) {
    if (!(this instanceof QRCodeMaker)) {
      return new QRCodeMaker(options);
    }
    this.options = Object.assign({}, defaultOptions,
      typeof options === 'string' ? {
        content: options,
      } : options);
  }

  async getBGImage(src: string, width: number, height: number) {
    return new Promise<JIMP>((resolve, reject) => {
      Jimp.read(src, function(err: Error, image: JIMP) {
        if (err) {
          reject(err);
        } else {
          if(width && height) {
            image.resize(width, height, Jimp.RESIZE_NEAREST_NEIGHBOR)
          }
          resolve(image);
        }
      })
    })
  }

  getQrCodeImage(link: string, width: number) {
      const data = QRCode.create(link, {});
      var size =  data.modules.size;
      return new Jimp(size, size, 0x000000FF, function(err: Error, target: JIMP) {
        if (err) return;
        for (var i = 0; i < size; i++) {
          for (var j = 0; j < size; j++) {
            var ind = i * size + j;
            if (!data.modules.data[ind]) {
              target.bitmap.data.writeUInt32BE(0xFFFFFFFF, ind * 4);
            }
          }
        }
      }).resize(width, width, Jimp.RESIZE_NEAREST_NEIGHBOR);
  }

  async mergeImage(
    target: Buffer, 
    origin:Buffer, 
    x: number, 
    y: number, 
    targetWidth: number,
    originWidth: number
  ) {
    for(var i = x;i < x+ originWidth; ++i) {
      for(var j = y; j < y + originWidth; ++j) {
        var ind = ((i - x) * originWidth + (j - y)) * 4;
        if(origin[ind]) {
          target.writeUInt32BE(0xFFFFFFFF, (i * targetWidth + j) * 4)
        }
      }
    }
    return target;
  }

  async getTargetImage() {
    const { background, content, width = 200 } = this.options;
    var qrCodeImage = this.getQrCodeImage(content, width);
    if (!background) {
      return qrCodeImage;
    }
    const bg = Object.assign({}, defaultBackgroundOptions,
      typeof background === 'string' ? { image: background } : background);
    if (typeof bg.image !== 'string') {
      return qrCodeImage;
    }
    var bgImage = await this.getBGImage(bg.image, bg.width || 200, bg.height || 200); 
    this.mergeImage(
      bgImage.bitmap.data,
      qrCodeImage.bitmap.data,
      bg.x || 0, bg.y || 0,
      bg.width || 200, width);
    return bgImage;
  }  

  async toImage() {
    const { type = Jimp.MIME_PNG } = this.options
    const targetImage = await this.getTargetImage();
    return new Promise<Buffer>((resolve, reject) => {
      targetImage.getBuffer(type, function(err: Error, buffer: Buffer) {
        if(err) reject(err);
        else resolve(buffer);
      });
    })
  }
  
  async toDataURL() {
    const { type = Jimp.MIME_PNG } = this.options
    const buffer = await this.toImage();
    return "data:" + type + ";base64," + buffer.toString('base64');
  }
}

export async function toImage(options: QRCodeMakerOptions) {
  return await (new QRCodeMaker(options)).toImage();
}

export async function toDataURL(options: QRCodeMakerOptions) {
  return await (new QRCodeMaker(options)).toDataURL();
}
