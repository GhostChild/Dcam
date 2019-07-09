const NodeMediaServer = require('node-media-server')
// const fs = require('fs')
//
// var f = fs.readFileSync('./config/config.json')
// var config = JSON.parse(f)
//
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 6000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    mediaroot: './stream',
    allow_origin: '*'
  },
  relay: {
    ffmpeg: './ffmpeg/ffmpeg.exe',
    tasks: [
      // {
      //   app: 'mv',
      //   mode: 'static',
      //   edge: './src/assets/haku0.mp4',
      //   name: 'haku0',
      // },
      // {
      //   app: 'mv',
      //   mode: 'static',
      //   edge: './src/assets/haku1.mp4',
      //   name: 'haku1'
      // },
      // {
      //   app: 'mv',
      //   mode: 'static',
      //   edge: './src/assets/haku2.mp4',
      //   name: 'haku2'
      // },
      // {
      //   app: 'mv',
      //   mode: 'static',
      //   edge: './src/assets/haku3.mp4',
      //   name: 'haku3'
      // },
      // {
      //   app: 'mv',
      //   mode: 'static',
      //   edge: './src/assets/haku4.mp4',
      //   name: 'haku4'
      // },
      // {
      //   app: 'mv',
      //   mode: 'static',
      //   edge: './src/assets/haku5.mp4',
      //   name: 'haku5'
      // },
      // {
      //   app: 'mv',
      //   mode: 'static',
      //   edge: './src/assets/haku6.mp4',
      //   name: 'haku6'
      // },
      // {
      //   app: 'mv',
      //   mode: 'static',
      //   edge: './src/assets/haku7.mp4',
      //   name: 'haku7'
      // },
      // {
      //   app: 'mv',
      //   mode: 'static',
      //   edge: './src/assets/haku8.mp4',
      //   name: 'haku8'
      // },
      // {
      //   app: 'mv',
      //   mode: 'static',
      //   edge: './src/assets/haku9.mp4',
      //   name: 'haku9'
      // },
      // {
      //   app: 'mv',
      //   mode: 'static',
      //   edge: './src/assets/haku10.mp4',
      //   name: 'haku10'
      // },{
      //   app: 'mv',
      //   mode: 'static',
      //   edge: './src/assets/haku11.mp4',
      //   name: 'haku11'
      // },{
      //   app: 'mv',
      //   mode: 'static',
      //   edge: './src/assets/haku12.mp4',
      //   name: 'haku12'
      // },{
      //   app: 'mv',
      //   mode: 'static',
      //   edge: './src/assets/haku13.mp4',
      //   name: 'haku13'
      // },{
      //   app: 'mv',
      //   mode: 'static',
      //   edge: './src/assets/haku14.mp4',
      //   name: 'haku14'
      // },{
      //   app: 'mv',
      //   mode: 'static',
      //   edge: './src/assets/haku15.mp4',
      //   name: 'haku15'
      // },
{
        app: 'mv',
        mode: 'static',
        edge: './src/assets/hatsuyuki.mp4',
        name: 'hatsuyuki'
      },
    ]
  }
}

var nms = new NodeMediaServer(config)
console.log("serverstart")
nms.run()






