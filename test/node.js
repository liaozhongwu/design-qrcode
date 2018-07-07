const { toDataURL, toImage } = require('../dist');
const fs = require("fs");

async function f() {
    // const image = await toImage('https://npmjs.com/package/design-qrcode');
    // const image = await toImage({
    //   content: 'https://npmjs.com/package/design-qrcode',
    //   background: {
    //     image: './test/bg.png',
    //   },
    // });
    // const image = await toImage({
    //   content: 'https://npmjs.com/package/design-qrcode',
    //   width: 320,
    //   background: {
    //     image: './test/bg.png',
    //     width: 320,
    //     height: 320,
    //   },
    // });
    // const image = await toImage({
    //   content: 'https://npmjs.com/package/design-qrcode',
    //   width: 320,
    //   background: {
    //     image: './test/bg.png',
    //     width: 480,
    //     height: 480,
    //     x: 80,
    //     y: 80,
    //   },
    // });
    // const image = await toImage({
    //   content: 'https://npmjs.com/package/design-qrcode',
    //   width: 320,
    //   type: './test/bg.png',
    //   background: {
    //     image: 'path_to_your_image',
    //     width: 480,
    //     height: 480,
    //     x: 80,
    //     y: 80,
    //   },
    // });
    // const image = await toImage({
    //   content: 'https://npmjs.com/package/design-qrcode',
    //   width: 320,
    //   background: {
    //     image: './test/bg.png',
    //     height: 320,
    //     width: 320,
    //     x: 0,
    //     y: 0
    //   },
    // });
    // fs.writeFile('./test/t2.png', image, (err) => {});

    // const data = await toDataURL('https://npmjs.com/package/design-qrcode');
    // const data = await toDataURL({
    //   content: 'https://npmjs.com/package/design-qrcode',
    //   background: {
    //     image: './test/bg.png',
    //   },
    // });
    // const data = await toDataURL({
    //   content: 'https://npmjs.com/package/design-qrcode',
    //   width: 320,
    //   background: {
    //     image: './test/bg.png',
    //     width: 320,
    //     height: 320,
    //   },
    // });
    // const data = await toDataURL({
    //   content: 'https://npmjs.com/package/design-qrcode',
    //   width: 320,
    //   background: {
    //     image: './test/bg.png',
    //     width: 480,
    //     height: 480,
    //     x: 80,
    //     y: 80,
    //   },
    // });

    const data = await toDataURL({
      content: 'https://npmjs.com/package/design-qrcode',
      width: 320,
      type: 'image/jpeg',
      background: {
        image: './test/bg.png',
        width: 480,
        height: 480,
        x: 80,
        y: 80,
      },
    });

    console.log(data);
}

f();