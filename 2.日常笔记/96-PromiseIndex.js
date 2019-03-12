let Promise = require('./96-Promise');
let p1 = new Promise(function (resolve, reject) {
  // reject(10000000);
  //pending
  setTimeout(function () {
    let num = Math.random(); //生成一个随机数
    console.log(num);
    if (num > .5) {
      //如果这个promise 成功了，会调用成功的回调 fulfilled
      resolve('大成功');
    } else {
      //如果这个promise失败了，会调用失败的回调 rejected
      reject('小失败');
    }
  }, 2000);
});
p1.then(function (value) {
  console.log('成功1=', value);
}, function (reason) {
  console.log('失败1=', reason);
});
p1.then(function (value) {
  console.log('成功2=', value);
}, function (reason) {
  console.log('失败2=', reason);
});