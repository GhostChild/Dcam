import {
  AfterViewChecked,
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  QueryList, SimpleChanges,
  ViewChildren
} from '@angular/core';
import {ipcRenderer, remote} from 'electron';
import DPlayer from 'dplayer';
import {MenuItem} from 'primeng/api';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges {

  constructor(private cdf: ChangeDetectorRef) {
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
  rownum = 3;
  colnum = 3;
  // row = [...Array(2)];
  // col = [...Array(2)];
  // get total() {
  //   return [...Array(this.rownum * this.colnum)];
  // }
  total = new BehaviorSubject([]);
  tasks576p = [];

  @ViewChildren('palyer')
  dplayer: QueryList<ElementRef>;

  dp: DPlayer[] = [];

  baseurl = 'ws://localhost:8000/';
  win = remote.BrowserWindow;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
    // throw new Error('Method not implemented.');
  }

  ngOnInit() {

    ipcRenderer.on('setplayerconfig', (eveng, arg) => {
      // console.log(arg);
      this.rownum = arg.row;
      this.colnum = arg.col;
      // this.row = [...Array(arg.row)];
      // this.col = [...Array(arg.col)];
      this.setLayout();
      this.initPlayer();
      this.cdf.detectChanges();
    });
    ipcRenderer.on('setvideoconfig', (eveng, arg) => {
      arg.relay.tasks.forEach((task) => {
        // console.log(task);
        if (task.app === '576p') {
          this.tasks576p.push(task);
        }
      });
      // console.log(this.tasks);
      this.initPlayer();
      this.cdf.detectChanges();
    });
    ipcRenderer.send('getplayerconfig');
    ipcRenderer.send('getvideoconfig');
  }

  customTB(index, song) {
    console.log('tb', `${index}-${song}`);
    return `${index}-${song}`;
  }

  setLayout() {
    console.log('setLayout');
    console.log('this.rownum', this.rownum);
    console.log('this.colnum', this.colnum);
    const num = this.rownum * this.colnum;
    this.total.next(Array.from({length: num}, (_, i) => i));
    // console.log('this.total', this.total.length);
    document.documentElement.style.setProperty('--rowNum', `${this.rownum}`);
    document.documentElement.style.setProperty('--colNum', `${this.colnum}`);
    this.dialogshow = false;
  }

  initPlayer() {
    this.dp = [];
    this.dplayer.forEach((el: ElementRef, index) => {
      if (index < this.tasks576p.length) {
        console.log(this.tasks576p[index].name);
        const player = new DPlayer({
            container: el.nativeElement,
            live: true,
            autoplay: true,
            mutex: false,
            video: {
              // url: 'https://api.dogecloud.com/player/get.flv?vcode=5ac682e6f8231991&userId=17&ext=.flv',
              // url: 'ws://localhost:8000/mv/hatsuyuki.flv',
              // url: '/assets/test.mp4',
              // url: this.baseurl + this.tasks[index].app + '/' + this.tasks[index].name + '.flv',
              url: `${this.baseurl}576p/${this.tasks576p[index].name}.flv`,
              type: 'flv',
              quality: [{
                name: '576p',
                url: `${this.baseurl}576p/${this.tasks576p[index].name}.flv`,
                // url: '/assets/test.mp4',
                type: 'flv'
              }, {
                name: '1080p',
                // url: '/assets/test.mp4',
                url: `${this.baseurl}1080p/${this.tasks576p[index].name}.flv`,
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
    // this.setLayout();
    // if (this.dplayer.length !== this.total.length) {
    //   this.initPlayer();
    // this.layoutcache = this.dplayer.length;
    // }
  }
}
