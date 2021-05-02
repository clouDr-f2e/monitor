const automator = require('miniprogram-automator');

automator
  .launch({
    projectPath: '../gayLen-wxmp' // 项目文件地址
  })
  .then(async (miniProgram) => {
    const page = await miniProgram.reLaunch('/pages/automator/automator');
    await page.waitFor(500);

    let e1 = await miniProgram.exposeFunction('interceptRequest', (params) => {
      console.log('interceptRequest params = ', params);
      return params;
    });

    let e2 = await miniProgram.mockWxMethod(
      'request',
      (obj, a1) => {
        console.log('obj = ', obj);
        console.log('a1 = ', a1);
        return Promise.resolve('11');
      },
      (a) => console.log('a = ', a)
    );

    const element = await page.$('#click-request-btn');
    // console.log('element = ', element);
    const res = await element.tap();
    console.log('tap res = ', res);

    // let e2 = await miniProgram.callWxMethod('request', {
    //   url: 'https://www.baidu.com',
    //   data: {
    //     a: 1,
    //     b: 2
    //   }
    // });

    // await miniProgram.close();
  })
  .catch((err) => {
    console.log('automator err = ', err);
  });
