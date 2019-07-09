import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import DPlayer from 'dplayer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  row = [...Array(4)];
  col = [...Array(4)];

  task = [
    {app: 'mv', name: 'haku0'},
    {app: 'mv', name: 'haku1'},
    {app: 'mv', name: 'haku2'},
    {app: 'mv', name: 'haku3'},
    {app: 'mv', name: 'haku4'},
    {app: 'mv', name: 'haku5'},
    {app: 'mv', name: 'haku6'},
    {app: 'mv', name: 'haku7'},
    {app: 'mv', name: 'haku8'},
    {app: 'mv', name: 'haku9'},
    {app: 'mv', name: 'haku10'},
    {app: 'mv', name: 'haku11'},
    {app: 'mv', name: 'haku12'},
    {app: 'mv', name: 'haku13'},
    {app: 'mv', name: 'haku14'},
    {app: 'mv', name: 'haku15'},
  ];

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

  initPlayer() {
    this.dplayer.forEach((el: ElementRef, index) => {
      const player = new DPlayer({
          container: el.nativeElement,
          live: true,
          autoplay: true,
          mutex: false,
          video: {
            // url: 'https://api.dogecloud.com/player/get.flv?vcode=5ac682e6f8231991&userId=17&ext=.flv',
            url: 'ws://localhost:8000/mv/hatsuyuki.flv',
            // url: this.baseurl + this.task[index].app + '/' + this.task[index].name + '.flv',
            type: 'flv'
          }
        }
      );
      // console.log(this.baseurl + this.task[index].app + '/' + this.task[index].name);
      this.dp.push(player);
      // console.log(this.dp);
    });
  }


  ngAfterViewInit() {
    this.initPlayer();
  }
}
