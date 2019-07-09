// import * as Koa from 'koa';
// import * as Router from 'koa-router';
// import * as ffmpeg from 'fluent-ffmpeg';
// import * as fs from 'fs';
//
//
// var server = new Koa();
// var r = new Router();
//
// var outStream = fs.createWriteStream('./stream/outstream.mp4');
//
// ffmpeg().outputFormat('mp4').videoCodec('copy').pipe(outStream);
//
// r.get('/api', ctx => {
//   ctx.body = 'apitest';
// });
//
//
// server.use(r.routes());
//
// console.log('beforstart');
//
// server.listen(2333);
