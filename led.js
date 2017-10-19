var fs = require('fs');

var dir = '/sys/class/gpio';
var gpio2 = dir + '/gpio2';

var count = 0;

fs.writeFileSync(dir + '/export', 2); // 2ピン
fs.writeFileSync(gpio2 + '/direction', 'out'); // 出力に設定

function flash() {
  count++;
  fs.writeFileSync(gpio2 + '/value', count % 2);

  if (count <= 10) {
    setTimeout(flash, 2000);
  } else {
    fs.writeFileSync(dir + '/unexport', 2); // 処理の終了
  }
}

flash();
