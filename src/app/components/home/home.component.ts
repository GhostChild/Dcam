import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ipcRenderer, remote} from 'electron';
import DPlayer from 'dplayer';
import {MenuItem} from 'primeng/api';
import * as url from 'url';
import * as path from 'path';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, AfterViewChecked {

  constructor() {
  }

  menu: MenuItem[] = [
    {
      label: '设置',
      icon: 'pi pi-fw pi-cog',
      items: [
        {
          label: '修改布局',
          icon: 'pi pi-fw pi-pencil',
          command: () => {
            this.dialogshow = true;
          }
        }
      ]
    }, {
      label: '新建窗口',
      command: () => {
        this.openNewWindow();
      }
    }
  ];
  dialogshow = false;
  rownum = 4;
  colnum = 4;
  layoutcache = 0;
  row = [...Array(2)];
  col = [...Array(2)];


  tasks = [];

  @ViewChildren('palyer') dplayer: QueryList<ElementRef>;

  dp: DPlayer[] = [];

  baseurl = 'ws://localhost:8000/';
  layoutClass: {};

  win = remote.BrowserWindow;

  ngOnInit() {
    ipcRenderer.send('getplayerconfig');
    ipcRenderer.send('getvideoconfig');

    ipcRenderer.on('setplayerconfig', (eveng, arg) => {
      // console.log(arg);
      this.rownum = arg.row;
      this.colnum = arg.col;
      // this.row = [...Array(arg.row)];
      // this.col = [...Array(arg.col)];
      this.setLayout();
    });
    ipcRenderer.on('setvideoconfig', (eveng, arg) => {
      this.tasks = arg.relay.tasks;
      // console.log(this.tasks);
      this.initPlayer();
    });
  }

  setLayout() {
    this.row = [...Array(this.rownum)];
    this.col = [...Array(this.colnum)];
    switch (this.rownum) {
      case 2:
        this.layoutClass = {
          'video-h2': true
        };
        break;
      case 3:
        this.layoutClass = {
          'video-h3': true
        };
        break;
      case 4:
        this.layoutClass = {
          'video-h4': true
        };
        break;
      case 5:
        this.layoutClass = {
          'video-h5': true
        };
        break;
      case 6:
        this.layoutClass = {
          'video-h6': true
        };
        break;
    }
    this.dialogshow = false;
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
            autoplay: true,
            mutex: false,
            video: {
              // url: 'https://api.dogecloud.com/player/get.flv?vcode=5ac682e6f8231991&userId=17&ext=.flv',
              // url: 'ws://localhost:8000/mv/hatsuyuki.flv',
              // url: '/assets/hatsuyuki.mp4',
              // url: this.baseurl + this.tasks[index].app + '/' + this.tasks[index].name + '.flv',
              url: `${this.baseurl}576p/${this.tasks[index].name}.flv`,
              type: 'flv',
              quality: [{
                name: '576p',
                url: `${this.baseurl}576p/${this.tasks[index].name}.flv`,
                type: 'flv'
              }, {
                name: '1080p',
                url: `${this.baseurl}1080p/${this.tasks[index].name}.flv`,
                type: 'flv'
              }],
              defaultQuality: 0,
            }
          }
        );
        // console.log(this.baseurl + this.task[index].app + '/' + this.task[index].name);
        this.dp.push(player);
      }
      // console.log(this.dp);
    });
  }

  openNewWindow() {
    const newin = new this.win({
      webPreferences: {
        nodeIntegration: true,
      }
    });
    newin.setMenuBarVisibility(false);
    newin.setFullScreenable(true);
    newin.loadURL('http://localhost:4200');
    // newin.loadURL(url.format({
    //   pathname: path.join(__dirname, 'dist/index.html'),
    //   protocol: 'file:',
    //   slashes: true
    // }));
  }

  ngAfterViewInit() {
    // this.initPlayer();
  }

  ngAfterViewChecked(): void {
    if (this.dplayer.length !== this.layoutcache) {
      this.setLayout();
      this.initPlayer();
      this.layoutcache = this.dplayer.length;
    }
  }
}
