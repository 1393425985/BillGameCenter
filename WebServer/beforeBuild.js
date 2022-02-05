const fs = require('fs');
const path = require('path');

function delDir(p){
    let files = [];
    if(fs.existsSync(p)){
        files = fs.readdirSync(p);
        files.forEach((file, index) => {
            let curPath = p + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(p);
    }
}
delDir(path.join(__dirname,'dist'));