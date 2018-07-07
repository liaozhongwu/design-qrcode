# Design QRCode

design your qrcode, works in browser and node.

## Install

```
npm install design-qrcode
```

### script

```
<!-- copy node_modules/design-qrcode/dist/broswer.bundle.js to your_path -->
<script type="text/javascript" src=`${your_path_to_broswer.bundle.js}`></script>
```

## Usage

### Class: QRCodeMaker

```js
import { QRCodeMaker } from 'design-qrcode'

const qrcode = QRCodeMaker('https://npmjs.com/package/design-qrcode');
  
const qrcode_bg = QRCodeMaker({
  content: 'https://npmjs.com/package/design-qrcode',
  background: 'path_to_your_image' || your_image_element,
});

const qrcode_size = new QRCodeMaker({
  content: 'https://npmjs.com/package/design-qrcode',
  width: 320,
  background: {
    image: 'path_to_your_image',
    width: 320,
    height: 320,
  },
});

const qrcode_type = new QRCodeMaker({
  content: 'https://npmjs.com/package/design-qrcode',
  width: 320,
  type: 'image/jpeg',
  background: {
    image: 'path_to_your_image',
    width: 480,
    height: 480,
    x: 80,
    y: 80,
  },
});

const qrcode_comment = new QRCodeMaker({
  content: 'https://npmjs.com/package/design-qrcode',
  width: 320,
  type: 'image/jpeg',
  background: {
    image: 'path_to_your_image',
    width: 480,
    height: 480,
    x: 80,
    y: 80,
  },
  comment: {
    text: 'abcdef',
    font: '28px Arial',
    color: 'red',
    align: 'center',
    x: 240,
    y: 420,
  },
});
```

### toImage

```js
import { QRCodeMaker, toImage } from 'design-qrcode';

const options = your_qrcode_options;

async () => {
  const image = await toImage(options);
  // same as
  const qrcode = new QRCodeMaker(options);
  const image = await qrcode.toImage();
  
  // Broswer TEST
  // instanceof HTMLImageElement
  document.body.appendChild(image);

  // Node TEST
  // instanceof Buffer
  const fs = require('fs');
  fs.writeFileSync('./qrcode.png', image);
}
```

### toDataURL

```js
import { QRCodeMaker, toDataURL } from 'design-qrcode';

const options = your_qrcode_options;

async () => {
  const dataURL = await toDataURL(options);
  // same as
  const qrcode = new QRCodeMaker(options);
  const dataURL = await qrcode.toDataURL();
  
  // Broswer TEST
  const img = document.createElement('img');
  img.src = data;
  document.body.appendChild(img);

  // Node TEST
  resp.send(dataURL);
}
```


## API

| Param                       | Type                                     | Default      | Description |
| --------------------------- | ---------------------------------------- | ------------ | ----------- |
| options                     | string \| object                         |              |             |
| options.content             | string                                   |              |             |
| [options.width]             | number                                   |              |             |
| [options.type]              | "image/png" \| "image/jpeg" \| "image/webp" | "image/png"  |             |
| [options.quality]           | number                                   |              |             |
| [options.background]        | string \| object                         |              |             |
| options.background.image    | string \|  HTMLImageElement              |              |             |
| [options.background.width]  | number                                   |              |             |
| [options.background.height] | number                                   |              |             |
| [options.background.x]      | number                                   |              |             |
| [options.background.y]      | number                                   |              |             |
| [options.comment]           | string \| object                         |              |             |
| options.comment.text        | string                                   |              |             |
| [options.comment.color]     | string                                   | '#000000'    |             |
| [options.comment.font]      | string                                   | '16px Arial' |             |
| [options.comment.align]     | string                                   | 'center'     |             |
| [options.comment.x]         | number                                   |              |             |
| [options.comment.y]         | number                                   |              |             |
