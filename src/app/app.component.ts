import { Component, OnInit } from '@angular/core';
import { TransferState } from '../modules/transfer-state/transfer-state';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Http } from '@angular/http';
import { Router } from "@angular/router";

@Component({
  selector: 'demo-app',
  template: `
    <header>
        <div class="header-container">
            <!-- menu mobile  -->
            <button class="show-menu-button" (click)="showMenu()">
                <!-- <img src="images/icons/menu.svg" alt=""> -->
                <i class="material-icons" style="color: #fff">menu</i>
            </button>

            <!-- <img class="logo" [src]="logo" alt="Vglobal"> -->
            <div class="lang-container">
                <div class="login">
                    <a href="#!"><span>Login</span> <i class="material-icons" style="color: #fff; font-size: 16px">person_outline</i></a>
                </div>
                <button style="color: #fff" (click)="showDropBox()"><span>Languages</span> <i class="material-icons" style="color: #fff">arrow_drop_down</i></button>
                <div id="lang-drop-box">
                    <a *ngFor="let lang of langList" (click)="_setLang(lang.id, lang.slug)"><img [src]="lang.description" alt=""></a>
                </div>
            </div>
            <div>
                <ul style="margin-left: 120px;">
                    <li *ngFor="let menu of listMenu"><a routerLinkActive="menu-active" routerLink="/p/{{lang.langId}}/{{menu.id}}/{{menu.slug}}">{{menu.title.rendered}}</a></li>
                </ul>
            </div>
        </div>
    </header>
    <div id="side-bar">
        <button class="hide-menu-button" (click)="hideMenu()">
            <!-- <img src="images/icons/close.svg" alt=""> -->
            <i class="material-icons" style="color: #fff">close</i>
        </button>
        <ul>
            <li *ngFor="let menu of listMenu"><a (click)="hideMenu()" routerLinkActive="menu-active" routerLink="/p/{{lang.langId}}/{{menu.id}}/{{menu.slug}}">{{menu.title.rendered}}</a></li>
        </ul>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [
    `h1 {
      color: green;
    }`
  ]
})
export class AppComponent implements OnInit {
  public lang:any = {
    langText: "en",
    langId: 5
  };
  public langList:any = [];
  public listMenu:any = [];
  constructor(
    private _http: Http,
    private _router: Router,
  ) { }

  ngOnInit() {
    if(localStorage.getItem('lang')==null){
      localStorage.setItem('lang', JSON.stringify(this.lang));
    }
    else{
      this.lang = JSON.parse(localStorage.getItem('lang'));
    }
    this._getLangListData();
    this._getListMenu();
  }
  _getLangListData(){
    if(localStorage.getItem('langList')!=null)
      this.langList = JSON.parse(localStorage.getItem('langList'));
    this._http.get('http://www.vglobal.asia/adminpanel/wp-json/wp/v2/categories').subscribe(data => {
        this.langList = data.json();
        localStorage.setItem('langList', JSON.stringify(data.json()));
        this._getListMenu();
    });
  }

  _getListMenu(){
    if(localStorage.getItem('listMenu'+this.lang.langId)!=null)
      this.listMenu = JSON.parse(localStorage.getItem('listMenu'+this.lang.langId));
    this._http.get('http://www.vglobal.asia/adminpanel/wp-json/wp/v2/posts?per_page=100&categories='+this.lang.langId+'&order=asc').subscribe(data => {
        this.listMenu = data.json();
        localStorage.setItem('listMenu'+this.lang.langId, JSON.stringify(data.json()));
    });
    for(let i=0; i<this.langList.length;i++){
      this._http.get('http://www.vglobal.asia/adminpanel/wp-json/wp/v2/posts?per_page=100&categories='+this.langList[i].id+'&order=asc').subscribe(data => {
        localStorage.setItem('listMenu'+this.langList[i].id, JSON.stringify(data.json()));
      });
    }
  }

  _setLang(id, slug){
    this.lang = {
      langText: slug,
      langId: id
    }
    localStorage.setItem('lang', JSON.stringify(this.lang));
    this.showDropBox();
    this._getListMenu();
    this._router.navigate(['/p/'+this.lang.langId+'/'+this.listMenu[0].id+'/'+this.listMenu[0].slug]);
  }

  showMenu(){
    let sideBar = document.getElementById('side-bar');
    sideBar.style.left = '0';
  }
  hideMenu() {
    let sideBar = document.getElementById('side-bar');
    sideBar.style.left = '-260px';
  }
  showDropBox() {
    let lang = document.getElementById('lang-drop-box');
    if(lang.clientHeight == 0){
        lang.style.height = '250px';
        lang.style.border = '1px solid #616161';
    }
    else {
        lang.style.height = '0';
        lang.style.border = '0px transparent';
    }
  }
}
