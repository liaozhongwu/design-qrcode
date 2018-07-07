export class QRCodeMaker {
  constructor(options: QRCodeMakerOptions);
  toDataURL(): Promise<string>;
  toImage(): Promise<HTMLImageElement | Buffer>;
  toCanvas(): Promise<HTMLCanvasElement | Buffer>;
}

export function toDataURL(options: QRCodeMakerOptions): Promise<string>;
export function toImage<T = HTMLImageElement | Buffer>(options: QRCodeMakerOptions): Promise<T>;
export function toCanvas<T = HTMLCanvasElement | Buffer>(options: QRCodeMakerOptions): Promise<T>;

export type QRCodeMakerOptions = string | QRCodeOptions;

export interface QRCodeOptions {
  content: string;
  margin?: number;
  width?: number;
  background?: string | QRCodeBackgroundOptions;
  comment?: string | QRCodeTextOptions;
  type?: "image/png" | "image/jpeg" | "image/webp";
  quality?: number;
}

export interface ImageElementOptions {
  image: string | HTMLImageElement;
  width?: number;
  height?: number;
}

export interface ImageDataOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface QRCodeBackgroundOptions extends ImageElementOptions {
  x?: number;
  y?: number;
}

export interface QRCodeTextOptions {
  text: string;
  color?: string;
  font?: string;
  align?: string;
  x?: number;
  y?: number;
}