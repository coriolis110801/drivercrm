1, 先把node_modules 清空
2， npm install
3, npm start


缺index图片就去autosqueak文件夹找


//  在codesandbox运行的话要pacakge.json里面把这句话删掉，  "proxy": "http://127.0.0.1:8000",
// 而且在terminal 先输入：
// export NODE_OPTIONS=--openssl-legacy-provider
//然后再输入：
//npm start

rm -rf node_modules package-lock.json


git checkout master

git fetch origin

git reset --hard origin/master