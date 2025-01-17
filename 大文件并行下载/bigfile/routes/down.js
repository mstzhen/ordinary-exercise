var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')
/* GET users listing. */
router.head('/', function(req, res, next) {
    fs.stat(path.join(__dirname, '../file/java.zip'), (error, stats)=>{
      if(error) {
        next(error)
      }
      res.set({
        'Content-Length': stats.size
      })
      res.send()
    })
});
router.get('/', function(req, res, next) {
  res.set('Content-Type', 'application/octet-stream')

    const startEnd = req.get('Range')
    const start = Number(startEnd.split('=')[1].split('-')[0])
    const end = Number(startEnd.split('=')[1].split('-')[1])
    console.log( start, end, '333333333333')

    // fs.readFile(path.resolve(__dirname, '../file/java.zip'), (error, data)=>{
    //   if(error) {
    //     next(error)
    //   }
    //   console.log(data, 'datav')
    //   const bfile = Buffer.from(data)
    //   res.end(bfile.slice(start, end));
    // })
    // ctx.response.status = 206;
    const { size } = fs.statSync(path.join(__dirname, '../file/java.zip'));

    if (start >= size || end >= size) {
      res.status(416).end()

      return;
  }
    console.log(size, 999999999)
    res.status(206)
    res.set('Accept-Ranges', 'bytes');
    res.set('Content-Range', `bytes ${start}-${end ? end : size - 1}/${size}`);
    // const read = fs.createReadStream(path.resolve(__dirname, '../file/java.zip'), { start, end })
    // read.on('data', (data)=>{
    //   res.end(data)

    // })
    const filePath = path.join(__dirname, '../file/java.zip')
    fs.createReadStream(filePath, {start, end}).pipe(res);

    // console.log(fs.createReadStream(path.join(__dirname, '../file/java.zip'), { start, end }), 909090)

});
module.exports = router;
