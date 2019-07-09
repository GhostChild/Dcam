import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ipcRenderer} from 'electron';
import DPlayer from 'dplayer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, AfterViewChecked {

  constructor() {
  }

  rownum = 4;
  colnum = 4;
  layoutcache = 16;
  row = [...Array(4)];
  col = [...Array(4)];

  tasks = [];

  // @ViewChild('dplayer', {static: true}) dplayer: ElementRef;
  // @ViewChild('dplayer2', {static: true}) dplayer2: ElementRef;
  // @ViewChild('dplayer3', {static: true}) dplayer3: ElementRef;
  // @ViewChild('dplayer4', {static: true}) dplayer4: ElementRef;
  @ViewChildren('palyer') dplayer: QueryList<ElementRef>;

  // dp: DPlayer;
  // dp2: DPlayer;
  // dp3: DPlayer;
  // dp4: DPlayer;
  dp: DPlayer[] = [];

  ngOnInit() {
    ipcRenderer.send('getplayerconfig');
    ipcRenderer.send('getvideoconfig');

    ipcRenderer.on('setplayerconfig', (eveng, arg) => {
      // console.log(arg);
      this.row = [...Array(arg.row)];
      this.col = [...Array(arg.col)];
    });
    ipcRenderer.on('setvideoconfig', (eveng, arg) => {
      this.tasks = arg.relay.tasks;
      console.log(this.tasks);
      this.initPlayer();
    });
    // this.dp = new DPlayer({
    //   container: this.dplayer.nativeElement,
    //   // live: true,
    //   // autoplay: true,
    //   mutex: false,
    //   video: {
    //     // url: 'http://localhost:8000/mv/haku.flv',
    //     url: '/assets/haku.mp4',
    //     // type: 'flv'
    //   }
    // });
    // this.dp2 = new DPlayer({
    //   container: this.dplayer2.nativeElement,
    //   // live: true,
    //   // autoplay: true,
    //   mutex: false,
    //   video: {
    //     // url: 'http://localhost:8000/mv/haku.flv',
    //     url: '/assets/haku.mp4',
    //     // type: 'flv'
    //   }
    // });
    // this.dp3 = new DPlayer({
    //   container: this.dplayer3.nativeElement,
    //   // live: true,
    //   // autoplay: true,
    //   mutex: false,
    //   video: {
    //     // url: 'http://localhost:8000/mv/haku.flv',
    //     url: '/assets/haku.mp4',
    //     // type: 'flv'
    //   }
    // });
    // this.dp4 = new DPlayer({
    //   container: this.dplayer4.nativeElement,
    //   // live: true,
    //   // autoplay: true,
    //   mutex: false,
    //   video: {
    //     // url: 'http://localhost:8000/mv/haku.flv',
    //     url: '/assets/haku.mp4',
    //     // type: 'flv'
    //   }
    // });
  }

  baseurl = 'ws://localhost:8000/';

  setLayout() {
    this.row = [...Array(this.rownum)];
    this.col = [...Array(this.colnum)];
    // this.initPlayer();
    // console.log(this.dp);
  }

  initPlayer() {
    this.dp = [];
    this.dplayer.forEach((el: ElementRef, index) => {
      if (index < this.tasks.length) {
      const player = new DPlayer({
          container: el.nativeElement,
          live: true,
          // autoplay: true,
          mutex: false,
          video: {
            // url: 'https://api.dogecloud.com/player/get.flv?vcode=5ac682e6f8231991&userId=17&ext=.flv',
            // url: 'ws://localhost:8000/mv/hatsuyuki.flv',
            // url: '/assets/hatsuyuki.mp4',
            url: this.baseurl + this.tasks[index].app + '/' + this.tasks[index].name + '.flv',
            // type: 'flv'
          }
        }
      );
      // console.log(this.baseurl + this.task[index].app + '/' + this.task[index].name);
      this.dp.push(player);
      }
      // console.log(this.dp);
    });
  }


  ngAfterViewInit() {
    // this.initPlayer();
  }

  ngAfterViewChecked(): void {
    if (this.dplayer.length !== this.layoutcache) {
      this.initPlayer();
      this.layoutcache = this.dplayer.length;
    }
  }
}
